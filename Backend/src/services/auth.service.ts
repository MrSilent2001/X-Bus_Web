import AppDataSource from "../config/connectDB";
import {User} from "../models/user.model";
import {UserVerification} from "../models/userVerification.model";
import {UserReg} from "../schema/registerSchema";
import {generateAccessToken, generateRefreshToken} from "../utils/jwt.utils";
import {comparePassword, hashPassword} from "../utils/bcrypt";
import {expireVerification, generateVerificationCode} from "../utils/verification";
import appAssert from "../utils/appAssert";
import {CONFLICT} from "../constants/http";

const userRepository = AppDataSource.getRepository(User);
const userVerificationRepository = AppDataSource.getRepository(UserVerification);
export const registerUser = async(userData: UserReg) =>{

    const existingUser = await userRepository.findOneBy({email: userData.email});
    appAssert(existingUser, CONFLICT,"User already exists");

    const hashedPassword = await hashPassword(userData.password, 10);
    const user = userRepository.create({...userData, password: hashedPassword});
    await userRepository.save(user);

    return user;
}

export const loginUser = async (email: string, password: string) => {

    const existingUser = await userRepository.findOneBy({ email: email });
    if (!existingUser) {
        throw new Error("Invalid Credentials");
    }

    const isPasswordMatch = await comparePassword(password, existingUser.password);

    if (!isPasswordMatch) {
        throw new Error("Invalid Password");
    }

    const accessToken = generateAccessToken({
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role
    });

    const refreshToken = generateRefreshToken({
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role
    });

    return {
        userId: existingUser.id,
        accessToken: accessToken,
        refreshToken: refreshToken
    };
};



export const generateVerification = async(email: string) =>{
    const existingUser = await userRepository.findOneBy({email: email});
    if (!existingUser) {
        throw new Error("User doesn't exist");
    }

    const verificationCode = generateVerificationCode();
    const expireAt = expireVerification();

    //Send verification code via a n email to the user

    const userVerification = userVerificationRepository.create({
        id: existingUser.id, email: existingUser.email, verificationCode: verificationCode, expiryDate: expireAt
    });

    console.log("verificationCode", verificationCode);
    try {
        await userVerificationRepository.save(userVerification);
        return userVerification;
    } catch (error) {
        console.error("Error saving to userVerification table:", error);
        throw new Error("Failed to save verification data");
    }
}

export const resetPassword = async(email: string, userInput: string, newPassword: string) =>{
    const verification = await userVerificationRepository.findOneBy({email: email});
    if (!verification) {
        throw new Error("No verification record found");
    }

    if (verification.verificationCode !== userInput) {
        throw new Error("Invalid Verification Code");
    }

    const currentTime = new Date();
    if (verification.expiryDate < currentTime) {
        throw new Error("Verification code has expired");
    }

    const existingUser = await userRepository.findOneBy({ email: email });
    if (!existingUser) {
        throw new Error("User doesn't exist");
    }

    existingUser.password = await hashPassword(newPassword, 10);
    await userRepository.save(existingUser);

    return { message: "Password reset successfully" };
}
