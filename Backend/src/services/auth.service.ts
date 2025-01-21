import AppDataSource from "../config/connectDB";
import {User} from "../models/user.model";
import { UserReg } from "../schema/registerSchema";
import bcrypt from "bcrypt";
import {generateToken} from "../utils/jwt.utils";

const userRepository = AppDataSource.getRepository(User);
export const registerUser = async(userData: UserReg) =>{

    const existingUser = await userRepository.findOneBy({email: userData.email});
    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = userRepository.create({...userData, password: hashedPassword});
    console.log("New User", user);
    await userRepository.save(user);

    return user;
}

export const loginUser = async (email: string, password: string) =>{

    const existingUser = await userRepository.findOneBy({email: email});
    if (!existingUser) {
        throw new Error("User already exists");
    }

    const isPasswordMatch = await bcrypt.compare(password,existingUser.password);
    console.log(password,existingUser.password);
    if (!isPasswordMatch) {
        throw new Error("Invalid Password");
    }

    const token = generateToken({id: existingUser.id, email: existingUser.email, role: existingUser.role});

    return {
        userId: existingUser.id,
        token: token
    };
}