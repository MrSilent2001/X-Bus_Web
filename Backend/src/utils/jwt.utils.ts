import jwt, {JwtPayload} from 'jsonwebtoken';
import {JWT_SECRET} from "../constants/env";

export const generateToken = (payload:object): string =>{
    return jwt.sign(payload, JWT_SECRET,{expiresIn: '10m'});
}

export const verifyToken = (token:string): JwtPayload | string | null =>{
    try{
        return jwt.verify(token, JWT_SECRET);
    }catch(e){
        return null;
    }
}