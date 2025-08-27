import {Bus} from "../models/bus.model";
import {BusReg} from "../schema/busSchema";
import appAssert from "../utils/appAssert";
import {CONFLICT, NOT_FOUND} from "../constants/http";
import {hashPassword} from "../utils/bcrypt";
import AppDataSource from "../config/connectDB";
import {BusSchedule} from "../models/schedule.model";

const busRepository = AppDataSource.getRepository(Bus);
const busScheduleRepository = AppDataSource.getRepository(BusSchedule);

export const registerNewBus = async (busData: BusReg) => {
    const existingBus = await busRepository.findOneBy({regNo: busData.regNo});
    appAssert(!existingBus, CONFLICT,"Bus already exists");

    const hashedPassword = await hashPassword(busData.password, 10);
    const bus = busRepository.create({...busData, password: hashedPassword});
    await busRepository.save(bus);

    return bus;
}

export const getAllBuses = async(): Promise<Bus[]>=> {
    const busData = await busRepository.find();

    return busData;
}

export const getBusById = async (identifier: string): Promise<Bus | null> => {
    let bus = await busRepository.findOneBy({ id: Number(identifier) });

    if (!bus) {
        bus = await busRepository.findOneBy({ regNo: identifier });
    }

    return bus;
};

export const getBusScheduleById = async (scheduleId: string): Promise<Bus | null> => {
    const schedule = await busScheduleRepository.findOne({
        where: { id: Number(scheduleId) },
        relations: ["bus"],
    });

    return schedule ? schedule.bus : null;
};

export const findBusByRegNo = async (regNo   : string): Promise<Bus | null> => {
    let bus = await busRepository.findOneBy({ regNo: regNo });

    if (!bus) {
        bus = await busRepository.findOneBy({ regNo: regNo });
    }

    return bus;
};


export const editBus = async (busData: any): Promise<Bus | null> => {
    console.log(busData)
    const bus = await findBusByRegNo(busData.regNo);
    appAssert(bus, NOT_FOUND, "Bus not found");

    bus!.fleetName = busData.fleetName ?? bus!.fleetName;
    bus!.routeNo = busData.routeNo ?? bus!.routeNo;
    bus!.route = busData.route ?? bus!.route;
    bus!.seatingCapacity = busData.seatingCapacity ?? bus!.seatingCapacity;
    bus!.busFare = busData.busFare ?? bus!.busFare;
    bus!.profilePicture = busData.profilePicture ?? bus!.profilePicture;

    if (busData.password) {
        bus!.password = await hashPassword(busData.password, 10);
    }

    await busRepository.save(bus!);
    console.log("Updated bus:", bus!);
    return bus;
};

export const removeBus = async (regNo: string): Promise<Bus | null> => {
    const bus = await getBusById(regNo);
    appAssert(bus, NOT_FOUND, "Bus not found");

    await busRepository.remove(bus!);
    console.log(`Bus with regNo: ${regNo} deleted`);

    return bus;
};

export const getBusRoutes = async() => {
    const routes = await busRepository
        .createQueryBuilder('bus')
        .select('DISTINCT bus.route')
        .getRawMany();

    return routes.map(route => route.route);
};

export const getBusRegNo = async () => {
    const buses = await busRepository
        .createQueryBuilder('bus')
        .select('bus.regNo', 'regNo')
        .getRawMany();

    return buses.map(bus => bus.regNo);
};

