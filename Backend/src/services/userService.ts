import appAssert from "../utils/appAssert";
import { CONFLICT, FORBIDDEN, NOT_FOUND } from "../constants/http";
import { hashPassword } from "../utils/bcrypt";
import AppDataSource from "../config/connectDB";
import { User } from "../models/user.model";
import { RegistrationRequestDTO } from "../schema/regRequestSchema";
import { RegistrationRequest } from "../models/registerRequest";

const userRepository = AppDataSource.getRepository(User);
const requestRepository = AppDataSource.getRepository(RegistrationRequest);

export const getAllUsers = async (): Promise<User[]> => {
    const userData = await userRepository.find();
    console.log(userData);
    return userData;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
    return await userRepository.findOneBy({ email });
};

export const getUserById = async (id: string): Promise<User | null> => {
    return await userRepository.findOneBy({ id: Number(id) });
};

export const editUser = async (userData: any): Promise<User | null> => {
    const user = await getUserById(userData.id);
    console.log("Found user:", user);
    appAssert(user, NOT_FOUND, "User not found");

    user!.name = userData.name ?? user!.name;
    user!.nic = userData.nic ?? user!.nic;
    user!.contactNo = userData.contactNo ?? user!.contactNo;
    user!.email = userData.email ?? user!.email;
    user!.profilePicture = userData.profilePicture ?? user!.profilePicture;

    if (userData.password && userData.password !== user!.password) {
        user!.password = await hashPassword(userData.password, 10);
    }

    await userRepository.save(user!);
    console.log("Updated user:", user!);
    return user;
};

export const removeUser = async (email: string): Promise<User | null> => {
    const user = await getUserByEmail(email);
    appAssert(user, NOT_FOUND, "User not found");

    await userRepository.remove(user!);
    console.log(`User with email: ${email} deleted`);

    return user;
};

export const requestBusRegistration = async (request: RegistrationRequestDTO) => {

    const existingUser = await userRepository.findOneBy({ email: request.email });
    appAssert(existingUser, NOT_FOUND, "User not found");

    appAssert(
        existingUser!.role === "owner",
        FORBIDDEN,
        "Only users with role owner can request bus registration"
    );

    const existingRequest = await requestRepository.findOneBy({
        busRegNo: request.busRegNo,
    });
    appAssert(!existingRequest, CONFLICT, "Registration request for this bus already exists");

    const newRequest = requestRepository.create(request);

    await requestRepository.save(newRequest);
    return newRequest;
};

export const updateBusRegistrationStatus = async (
    busRegNo: string,
    status: "NOTGRANTED" | "GRANTED" | "TERMINATED"
) => {
    const existingRequest = await requestRepository.findOneBy({ busRegNo });
    appAssert(existingRequest, NOT_FOUND, "Registration request for this bus not found");

    existingRequest!.status = status;
    await requestRepository.save(existingRequest!);

    return existingRequest;
};

export const getBusRegistrationRequests = async (): Promise<RegistrationRequest[]> => {
    const registrationRequests = await requestRepository.find();
    console.log(registrationRequests);
    return registrationRequests;
}
