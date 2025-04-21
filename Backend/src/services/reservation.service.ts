import {Reserve} from "../schema/reservationSchema";
import AppDataSource from "../config/connectDB";
import {Reservation} from "../models/reservation.model";
import appAssert from "../utils/appAssert";
import {CONFLICT} from "../constants/http";
import {BusSchedule} from "../models/schedule.model";
import {Payment} from "../models/payment.model";

const reservationRepository = AppDataSource.getRepository(Reservation);

export const addNewReservation = async (data: Reserve) => {
    const { userId, scheduleId, date, busFare, seatNo } = data;

    return await AppDataSource.transaction(async (manager) => {
        // Check if reservation already exists
        const isReservationExist = await manager.findOne(Reservation, {
            where: {
                user: { id: userId },
                schedule: { id: scheduleId },
            },
        });
        appAssert(!isReservationExist, CONFLICT, "A reservation already exists for this user and schedule");

        // Get schedule with pessimistic lock
        const schedule = await manager.findOne(BusSchedule, {
            where: { id: scheduleId },
            lock: { mode: "pessimistic_write" },
        });
        appAssert(!schedule, CONFLICT, "Schedule not found");
        appAssert(schedule!.seatingCapacity <= 0, CONFLICT, "No available seats for this schedule");

        // Check for successful payment
        const payment = await manager.findOne(Payment, {
            where: {
                user: { id: userId },
                schedule: { id: scheduleId },
                status: "SUCCESS",
                date,
            },
        });
        appAssert(!payment, CONFLICT, "No successful payment found for this schedule on the selected date");

        // Optional: Seat already taken
        const existingSeat = await manager.findOne(Reservation, {
            where: {
                schedule: { id: scheduleId },
                seatNo,
            }
        });
        appAssert(!existingSeat, CONFLICT, "This seat has already been reserved");

        // Decrement seating and update income
        schedule!.seatingCapacity -= 1;
        schedule!.totalIncome += busFare;
        await manager.save(schedule);

        // Create and save reservation
        const reservation = manager.create(Reservation, {
            date,
            busFare,
            seatNo,
            user: { id: userId },
            schedule: { id: scheduleId },
        });

        await manager.save(reservation);

        return reservation;
    });
};


// export const getAllReservations = async(): Promise<Reservation[]> => {
//     const reservations = await reservationRepository.find({
//         relations: ['user', 'schedule'],
//     });
//
//     return reservations;
// }

export const getAllReservations = async (): Promise<any[]> => {
    const reservations = await reservationRepository.find({
        relations: ['user', 'schedule'],
    });

    return reservations.map(res => ({
        id: res.id,
        date: res.date,
        busFare: res.busFare,
        seatNo: res.seatNo,
        userId: res.user?.id,
        scheduleId: res.schedule?.id,
    }));
};

export const getReservationsByUser = async (userId: string): Promise<any[]> => {
    const id =  Number(userId);

    const reservations = await reservationRepository.find({
        where: {
            user: { id: id },
        },
        relations: ['schedule'],
    });

    return reservations.map(res => ({
        id: res.id,
        date: res.date,
        busFare: res.busFare,
        seatNo: res.seatNo,
        scheduleId: res.schedule?.id,
    }));
};

