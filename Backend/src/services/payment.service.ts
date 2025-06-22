import AppDataSource from "../config/connectDB";
import { Payment } from "../models/payment.model";
import { PaymentSchema } from "../schema/paymentSchema";
import { User } from "../models/user.model";
import { BusSchedule } from "../models/schedule.model";
import {Expense} from "../models/expense.model";
import {expenseType} from "../schema/expenseSchema";
import {Bus} from "../models/bus.model";
import appAssert from "../utils/appAssert";
import {NOT_FOUND} from "../constants/http";
import {Stripe} from "stripe";

const paymentRepository = AppDataSource.getRepository(Payment);
const userRepository = AppDataSource.getRepository(User);
const busScheduleRepository = AppDataSource.getRepository(BusSchedule);
const expenseRepository = AppDataSource.getRepository(Expense);
const busRepository = AppDataSource.getRepository(Bus);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-05-28.basil',
});

export const createNewPayment = async (data: PaymentSchema) => {
    // Fetch the user and schedule entities
    // const user = await userRepository.findOne({ where: { id: data.user } });
    // const schedule = await busScheduleRepository.findOne({ where: { id: data.schedule } });
    //
    // if (!user || !schedule) {
    //     throw new Error("User or Schedule not found");
    // }
    //
    // // Create the payment entity and assign full entities
    // const payment = paymentRepository.create({
    //     ...data,
    //     user,
    //     schedule,
    // });
    //
    // // Save the payment entity to the database
    // await paymentRepository.save(payment);
    //
    // return payment;
};




//======================================================Expenses=============================================================
export const addNewExpense = async (data: expenseType) => {
    const bus = await busRepository.findOne({ where: { id: data.busId } });
    appAssert(bus, NOT_FOUND, "Bus not found");

    const expense = expenseRepository.create({
        date: data.date,
        description: data.description,
        proof: data.proof,
        bus: {
            id: data.busId
        }
    });

    await expenseRepository.save(expense);

    return expense;
}

export const createPayment = async (data: any) => {
    const paymentIntent = await stripe.paymentIntents.create({
        metadata: {
            userId: data.user || "guest",
            scheduleId: data.scheduleId,
            date: data.date
        },
        amount: data.amount * 100,
        currency: 'LKR',
        automatic_payment_methods: {
            enabled: true,
        },
    });

    console.log(paymentIntent);

    return {
        paymentIntent: paymentIntent.client_secret,
        publishableKey: process.env.PUBLIC_STRIPE_PUBLISHABLE_KEY
    };
}


export const savePaymentDetails = async (data: string) => {
    const paymentIntentId = data.split('_secret')[0];
    const stripePaymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Fetch the user and schedule entities
    const user = await userRepository.findOne({ where: { id: Number(stripePaymentIntent.metadata.userId) } });
    const schedule = await busScheduleRepository.findOne({ where: { id: Number(stripePaymentIntent.metadata.scheduleId) } });

    if (!user || !schedule) {
        throw new Error("User or Schedule not found");
    }

    // Create the payment entity and assign full entities
    const payment = paymentRepository.create({
        date: stripePaymentIntent.metadata.date,
        amount: Number(stripePaymentIntent.amount)/100,
        user,
        schedule,
        status: stripePaymentIntent.status
    });

    // Save the payment entity to the database
    await paymentRepository.save(payment);
    console.log(payment);

    return payment;
}
