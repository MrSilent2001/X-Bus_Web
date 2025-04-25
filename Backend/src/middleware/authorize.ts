import { Request, Response, NextFunction } from "express";
import {FORBIDDEN, UNAUTHORIZED} from "../constants/http";
import appAssert from "../utils/appAssert";

export const authorize = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = (req as any).user;
            appAssert(user, UNAUTHORIZED, "Authorization token missing");


            const authorisedUser = allowedRoles.includes(user.role)
            if (!authorisedUser) {
                appAssert(false, FORBIDDEN, "User is unauthorized");
            }

            next();
        } catch (err) {
            appAssert(false, FORBIDDEN, "User is unauthorized");
        }
    };
};
