import jwt, {JwtPayload} from 'jsonwebtoken';
import {JWT_SECRET} from "../constants/env";

export const generateAccessToken = (payload:object): string =>{
    return jwt.sign(payload, JWT_SECRET,{expiresIn: '10m'});
}

export const generateRefreshToken = (payload:object): string =>{
    return jwt.sign(payload, JWT_SECRET,{expiresIn: '7d'});
}

export const verifyToken = (token: string): JwtPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (error: any) {
        return error.message;
    }
};