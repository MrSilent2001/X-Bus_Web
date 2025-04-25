import AppDataSource from "../config/connectDB";
import { Payment } from "../models/payment.model";
import { PaymentSchema } from "../schema/paymentSchema";
import { User } from "../models/user.model";
import { BusSchedule } from "../models/schedule.model";

const paymentRepository = AppDataSource.getRepository(Payment);
const userRepository = AppDataSource.getRepository(User);
const busScheduleRepository = AppDataSource.getRepository(BusSchedule);

export const createNewPayment = async (data: PaymentSchema) => {
    // Fetch the user and schedule entities
    const user = await userRepository.findOne({ where: { id: data.user } });
    const schedule = await busScheduleRepository.findOne({ where: { id: data.schedule } });

    if (!user || !schedule) {
        throw new Error("User or Schedule not found");
    }

    // Create the payment entity and assign full entities
    const payment = paymentRepository.create({
        ...data,
        user,
        schedule,
    });

    // Save the payment entity to the database
    await paymentRepository.save(payment);

    return payment;
};
