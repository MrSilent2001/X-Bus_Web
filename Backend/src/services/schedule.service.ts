import {Schedule} from "../schema/busScheduleSchema";
import AppDataSource from "../config/connectDB";
import {BusSchedule} from "../models/schedule.model";
import {Bus} from "../models/bus.model";

const busScheduleRepository = AppDataSource.getRepository(BusSchedule);
const busRepository = AppDataSource.getRepository(Bus)

export const addNewSchedule = async (scheduleData:Schedule) => {
    const bus = await busRepository.findOneBy({ id: scheduleData.busId });

    if (!bus) {
        throw new Error("Bus not found");
    }

    const newSchedule = busScheduleRepository.create({
        date: new Date(scheduleData.date),
        scheduledTime: scheduleData.scheduledTime,
        seatingCapacity: scheduleData.seatingCapacity ?? bus.seatingCapacity,
        bus: bus,
    });

    await busScheduleRepository.save(newSchedule);

    return newSchedule;
}

export const getAllSchedules = async(): Promise<BusSchedule[]> => {
    const schedules = await busScheduleRepository.find({
        relations: ['bus'],
    });

    return schedules;
}

export const getSchedulesByBusId = async (id: string): Promise<BusSchedule[]> => {
    const busId = Number(id);

    const schedules = await busScheduleRepository.find({
        where: {
            bus: { id: busId }
        },
        relations: ['bus'],
    });


    return schedules;
}

export const deleteScheduleById = async (id: string): Promise <BusSchedule> => {
    const scheduleId = Number(id);

    const schedule = await busScheduleRepository.findOne({
        where: { id: scheduleId },
        relations: ['bus'],
    });

    if (!schedule) {
        throw new Error('Schedule not found');
    }

    await busScheduleRepository.remove(schedule);

    return schedule;
}