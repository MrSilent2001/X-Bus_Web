import {Bus} from "../models/bus.model";
import {BusReg} from "../schema/busSchema";
import appAssert from "../utils/appAssert";
import {CONFLICT, NOT_FOUND} from "../constants/http";
import {hashPassword} from "../utils/bcrypt";
import AppDataSource from "../config/connectDB";

const busRepository = AppDataSource.getRepository(Bus);
export const registerNewBus = async (busData: BusReg) => {
    const existingBus = await busRepository.findOneBy({regNo: busData.regNo});
    appAssert(!existingBus, CONFLICT,"Bus already exists");

    const hashedPassword = await hashPassword(busData.password, 10);
    const bus = busRepository.create({...busData, password: hashedPassword});
    console.log(bus);
    await busRepository.save(bus);

    return bus;
}

export const getAllBuses = async(): Promise<Bus[]>=> {
    const busData = await busRepository.find();
    console.log(busData);

    return busData;
}

export const getBusById = async (regNo: string): Promise<Bus | null> => {
    const bus = await busRepository.findOneBy({regNo});
    console.log(bus)

    return bus;
}

export const editBus = async (busData: BusReg): Promise<Bus | null> => {
    const bus = await getBusById(busData.regNo);
    appAssert(bus, NOT_FOUND, "Bus not found");

    bus!.fleetName = busData.fleetName;
    bus!.routeNo = busData.routeNo;
    bus!.route = busData.route;
    bus!.seatingCapacity = busData.seatingCapacity;
    bus!.busFare = busData.busFare;
    bus!.profilePicture = busData.profilePicture;

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