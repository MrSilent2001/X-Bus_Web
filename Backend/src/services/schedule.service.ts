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

export const getAllBusSchedules = async (
    date?: string,
    route?: string
): Promise<any[] | null> => {
    const query = busScheduleRepository
        .createQueryBuilder("schedule")
        .leftJoinAndSelect("schedule.bus", "bus");

    if (date && date.trim() !== "") {
        query.andWhere("DATE(schedule.date) = :date", { date });
    }

    if (route && route.trim() !== "") {
        query.andWhere("LOWER(bus.route) = LOWER(:route)", { route });
    }

    const schedules = await query.getMany();

    if (schedules.length === 0) return null;

    const result = schedules.map(schedule => ({
        id: schedule.id,
        date: schedule.date,
        scheduledTime: schedule.scheduledTime,
        regNo: schedule.bus.regNo,
        seatingCapacity: schedule.seatingCapacity,
        route: schedule.bus.route,
        routeNo: schedule.bus.routeNo
    }));

    return result;
};


export const getSchedulesByBusId = async (id: string): Promise<any[]> => {
    const busId = Number(id);
    const schedules = await busScheduleRepository.find({
        where: {
            bus: { id: busId }
        },
        relations: ['bus'],
    });
    const filteredSchedules = schedules.map(schedule => ({
        id: schedule.id,
        date: schedule.date,
        scheduledTime: schedule.scheduledTime,
        seatingCapacity: schedule.seatingCapacity,
        regNo: schedule.bus.regNo,
        routeNo: schedule.bus.routeNo,
        route: schedule.bus.route,
    }));

    return filteredSchedules;
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