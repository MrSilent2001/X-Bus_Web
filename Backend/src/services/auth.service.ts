import AppDataSource from "../config/connectDB";
import {User} from "../models/user.model";
import {UserVerification} from "../models/userVerification.model";
import {UserReg} from "../schema/userSchema";
import {generateAccessToken, generateRefreshToken} from "../utils/jwt.utils";
import {comparePassword, hashPassword} from "../utils/bcrypt";
import {expireVerification, generateVerificationCode} from "../utils/verification";
import appAssert from "../utils/appAssert";
import {CONFLICT} from "../constants/http";
import nodemailer from 'nodemailer';
import {EMAIL_PASSWORD, SENDER_EMAIL} from "../constants/env";

const userRepository = AppDataSource.getRepository(User);
const userVerificationRepository = AppDataSource.getRepository(UserVerification);
export const registerUser = async(userData: UserReg) =>{

    const existingUser = await userRepository.findOneBy({email: userData.email});
    appAssert(!existingUser, CONFLICT,"User already exists");

    const hashedPassword = await hashPassword(userData.password, 10);
    const user = userRepository.create({...userData, password: hashedPassword});
    console.log(user);
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

    //Send verification code via an email to the user

    const transporter = nodemailer.createTransport({
        secure: true,
        host: 'smtp.gmail.com',
        auth: {
            user: SENDER_EMAIL,
            pass: EMAIL_PASSWORD,
        },
    });

    // Send email with OTP
    const mailOptions = {
        from: SENDER_EMAIL,
        to: email,
        subject: 'Your Verification Code',
        text: `Your verification code is: ${verificationCode}. It expires at ${expireAt}.`,
    };


    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification code sent to ${email}`);

        const userVerification = userVerificationRepository.create({
            id: existingUser.id,
            email: existingUser.email,
            verificationCode: verificationCode,
            expiryDate: expireAt
        });

        console.log("verificationCode", verificationCode);

        await userVerificationRepository.save(userVerification);
        return userVerification;
    } catch (error) {
        console.error("Error saving to userVerification table:", error);
        throw new Error("Failed to save verification data");
    }
}

export const verifyOTP = async (email: string, otp: string) => {
    const verification = await userVerificationRepository.findOneBy({email: email});
    if (!verification) {
        throw new Error("No verification record found");
    }

    if (verification.verificationCode !== otp) {
        throw new Error("Invalid Verification Code");
    }

    const currentTime = new Date();
    if (verification.expiryDate < currentTime) {
        throw new Error("Verification code has expired");
    }

    return { message: "OTP verified successfully" };
}

export const resetPassword = async(email: string, newPassword: string) =>{

    const existingUser = await userRepository.findOneBy({ email: email });
    if (!existingUser) {
        throw new Error("User doesn't exist");
    }

    existingUser.password = await hashPassword(newPassword, 10);
    await userRepository.save(existingUser);

    return { message: "Password reset successfully" };
}
