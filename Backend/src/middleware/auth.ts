import { NextFunction, Request, Response } from "express";
import appAssert from "../utils/appAssert";
import { UNAUTHORIZED } from "../constants/http";
import {verifyToken} from "../utils/jwt.utils";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader: string | undefined = req.headers.authorization;

        // Ensure the Authorization header exists and starts with "Bearer "
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            appAssert(false, UNAUTHORIZED, "Authorization token missing or invalid");
            return;
        }

        // Extract the token after "Bearer "
        const token = authHeader.split(" ")[1];

        // Verify the token
        const decoded = verifyToken(token);
        appAssert(decoded, UNAUTHORIZED, "Invalid or expired token");

        req.body.user = decoded;
        next();
    } catch (error) {
        appAssert(false, UNAUTHORIZED, "Invalid or expired token");
    }
};
