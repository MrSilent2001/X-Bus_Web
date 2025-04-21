import {Reserve} from "../schema/reservationSchema";
import AppDataSource from "../config/connectDB";
import {Reservation} from "../models/reservation.model";
import appAssert from "../utils/appAssert";
import {CONFLICT} from "../constants/http";
import {BusSchedule} from "../models/schedule.model";

const reservationRepository = AppDataSource.getRepository(Reservation);
const scheduleRepository = AppDataSource.getRepository(BusSchedule);

export const addNewReservation = async (data: Reserve) => {
    return await AppDataSource.transaction(async (manager) => {
        // Check if reservation already exists
        const isReservationExist = await manager.findOne(Reservation, {
            where: {
                user: { id: data.userId },
                schedule: { id: data.scheduleId },
            },
        });
        appAssert(!isReservationExist, CONFLICT, "A reservation already exists for this user and schedule");


        const schedule = await manager.findOne(BusSchedule, {
            where: { id: data.scheduleId },
        });
        appAssert(!schedule, CONFLICT, "Schedule not found");

        // Check if seats are available
        appAssert(!(schedule!.seatingCapacity > 0), CONFLICT, "No available seats for this schedule");

        // Decrement seatingCapacity
        schedule!.seatingCapacity -= 1;
        await manager.save(schedule);

        // Create and save reservation
        const reservation = manager.create(Reservation, {
            date: data.date,
            busFare: data.busFare,
            seatNo: data.seatNo,
            user: { id: data.userId },
            schedule: { id: data.scheduleId },
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

