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
import {dateFilter} from "../utils/dateFilter";
import {Between} from "typeorm";

const paymentRepository = AppDataSource.getRepository(Payment);
const userRepository = AppDataSource.getRepository(User);
const busScheduleRepository = AppDataSource.getRepository(BusSchedule);
const expenseRepository = AppDataSource.getRepository(Expense);
const busRepository = AppDataSource.getRepository(Bus);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-05-28.basil',
});

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// export const createNewPayment = async (data: PaymentSchema) => {
//     //Fetch the user and schedule entities
//     const user = await userRepository.findOne({ where: { id: data.user } });
//     const schedule = await busScheduleRepository.findOne({ where: { id: data.schedule } });
//
//     if (!user || !schedule) {
//         throw new Error("User or Schedule not found");
//     }
//
//     // Create the payment entity and assign full entities
//     const payment = paymentRepository.create({
//         ...data,
//         user,
//         schedule,
//     });
//
//     // Save the payment entity to the database
//     await paymentRepository.save(payment);
//
//     return payment;
// };


//======================================================Expenses=============================================================
export const addNewExpense = async (data: expenseType) => {
    const bus = await busRepository.findOne({ where: { id: data.busId } });
    appAssert(bus, NOT_FOUND, "Bus not found");

    const expense = expenseRepository.create({
        date: data.date,
        description: data.description,
        amount: data.amount,
        proof: data.proof,
        bus: {
            id: data.busId
        }
    });

    await expenseRepository.save(expense);

    return expense;
}


//=========================================== Payments =============================================================
export const createPayment = async (data: any) => {
    const paymentIntent = await stripe.paymentIntents.create({
        metadata: {
            userId: data.user || "guest",
            scheduleId: data.scheduleId,
            date: data.date,
            busId: data.busId,
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
    console.log(stripePaymentIntent);

    // Fetch the user and schedule entities
    const user = await userRepository.findOne({ where: { id: Number(stripePaymentIntent.metadata.userId) } });
    const schedule = await busScheduleRepository.findOne({ where: { id: Number(stripePaymentIntent.metadata.scheduleId) } });
    const bus = await busRepository.findOne({ where: { id: Number(stripePaymentIntent.metadata.busId) } });

    if (!user || !schedule || !bus) {
        throw new Error("User, Bus or Schedule not found");
    }

    // Create the payment entity and assign full entities
    const payment = paymentRepository.create({
        date: stripePaymentIntent.metadata.date,
        amount: Number(stripePaymentIntent.amount)/100,
        user,
        schedule,
        status: stripePaymentIntent.status,
        bus
    });

    // Save the payment entity to the database
    await paymentRepository.save(payment);
    console.log(payment);

    return payment;
}

export const getUserPaymentHistory = async (
    filter: "Today" | "Yesterday" | "This Week" | "Last Week" | "This Month" | "Last Month" | "All" = "All",
    userId: number
) => {
    const { startDate, endDate } = dateFilter(filter);

    const where: any = {
        user: { id: userId },
    };

    if (filter !== "All" && startDate && endDate) {
        where.date = Between(startDate, endDate);
    }

    const payments = await paymentRepository.find({
        where,
        order: { date: "DESC" },
        relations: ["user", "schedule", "schedule.bus"],
    });

    return payments;
};

export const getBusPaymentHistory = async (
    filter: "Today" | "Yesterday" | "This Week" | "Last Week" | "This Month" | "Last Month" | "All" = "All",
    userId: number
) => {
    const { startDate, endDate } = dateFilter(filter);

    const where: any = {
        bus: { id: userId },
    };

    if (filter !== "All" && startDate && endDate) {
        where.date = Between(startDate, endDate);
    }

    const payments = await paymentRepository.find({
        where,
        order: { date: "DESC" },
        relations: ["user", "schedule", "bus"],
    });

    return payments;
};


//=================================================Income =================================================================

export const getIncome = async (busId?: number) => {
    // ================= Total Income =================
    let totalQuery = paymentRepository
        .createQueryBuilder("payment")
        .select("SUM(payment.amount)", "total")
        .innerJoin("payment.schedule", "schedule")
        .innerJoin("schedule.bus", "bus");

    if (busId) {
        totalQuery = totalQuery.where("bus.id = :busId", { busId });
    }

    const totalResult = await totalQuery.getRawOne();
    const totalIncome = Number(totalResult?.total) || 0;

    // ================= Monthly Breakdown =================
    let monthlyQuery = paymentRepository
        .createQueryBuilder("payment")
        .select("EXTRACT(YEAR FROM payment.date)", "year")
        .addSelect("EXTRACT(MONTH FROM payment.date)", "month")
        .addSelect("SUM(payment.amount)", "total")
        .innerJoin("payment.schedule", "schedule")
        .innerJoin("schedule.bus", "bus")
        .groupBy("year")
        .addGroupBy("month")
        .orderBy("year", "ASC")
        .addOrderBy("month", "ASC");

    if (busId) {
        monthlyQuery = monthlyQuery.where("bus.id = :busId", { busId });
    }

    const monthlyResults = await monthlyQuery.getRawMany();

    // ================= Organize Annual Data =================
    const annualIncome: Record<string, Record<string, number>> = {};

    for (const row of monthlyResults) {
        const year = row.year;
        const monthIndex = parseInt(row.month, 10) - 1;
        const monthName = monthNames[monthIndex];
        const amount = Number(row.total);

        if (!annualIncome[year]) {
            annualIncome[year] = {};
            monthNames.forEach((m) => (annualIncome[year][m] = 0));
        }

        annualIncome[year][monthName] = amount;
    }

    return {
        busId: busId ?? "all",
        totalIncome,
        annualIncome,
    };
};


//====================================================Expenses=============================================================
export const getExpenses = async (busId?: number) => {
    // ================= Total Expenses =================
    let totalQuery = expenseRepository
        .createQueryBuilder("expense")
        .select("SUM(expense.amount)", "total")
        .innerJoin("expense.bus", "bus");

    if (busId) {
        totalQuery = totalQuery.where("bus.id = :busId", { busId });
    }

    const totalResult = await totalQuery.getRawOne();
    const totalExpenses = Number(totalResult?.total) || 0;

    // ================= Monthly Breakdown =================
    let monthlyQuery = expenseRepository
        .createQueryBuilder("expense")
        .select("EXTRACT(YEAR FROM expense.date)", "year")
        .addSelect("EXTRACT(MONTH FROM expense.date)", "month")
        .addSelect("SUM(expense.amount)", "total")
        .innerJoin("expense.bus", "bus")
        .groupBy("year")
        .addGroupBy("month")
        .orderBy("year", "ASC")
        .addOrderBy("month", "ASC");

    if (busId) {
        monthlyQuery = monthlyQuery.where("bus.id = :busId", { busId });
    }

    const monthlyResults = await monthlyQuery.getRawMany();

    // ================= Organize Annual Data =================
    const annualExpenses: Record<string, Record<string, number>> = {};

    for (const row of monthlyResults) {
        const year = row.year;
        const monthIndex = parseInt(row.month, 10) - 1;
        const monthName = monthNames[monthIndex];
        const amount = Number(row.total);

        if (!annualExpenses[year]) {
            annualExpenses[year] = {};
            monthNames.forEach((m) => (annualExpenses[year][m] = 0));
        }

        annualExpenses[year][monthName] = amount;
    }

    return {
        busId: busId ?? "all",
        totalExpenses,
        annualExpenses,
    };
};


