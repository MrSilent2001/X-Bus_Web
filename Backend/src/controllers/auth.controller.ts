import {generateVerification, loginUser, registerUser, resetPassword, verifyOTP} from "../services/auth.service";
import {userSchema} from "../schema/userSchema";
import {Request, Response, NextFunction} from "express";
import {CREATED, OK} from "../constants/http";
import {setAuthCookies} from "../utils/cookies";

export const authController = {
    signUp: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData = userSchema.parse(req.body);
            const newUser = await registerUser(userData);
            res.status(CREATED).json(newUser);
        } catch (error) {
            next(error);
        }
    },

    login: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try{
          const {identifier, password} = req.body;
          const {userId, accessToken, refreshToken} = await loginUser(identifier, password);

          setAuthCookies({res, accessToken, refreshToken})
          res.status(OK).json({userId, accessToken, refreshToken});
      }catch(error){
          next(error);
      }
    },

    forgotPassword: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const {email} = req.params;
            console.log(email);
            const response = await generateVerification(email);
            res.status(OK).json({response});
        }catch (error){
            next(error);
        }
    },

    verifyOTP: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {email, otp} = req.params;
            const response = await verifyOTP(email, otp);
            res.status(OK).json({response});
        }catch(error){
            next(error);
        }
    },

    resetPassword: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {email} = req.params;
            const {password} = req.body;

            console.log(email, password);
            const response = await resetPassword(email, password);
            res.status(OK).json({response});
        }catch(error){
            next(error);
        }
    },

    logout: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            res.clearCookie("accessToken", { path: "/" });
            res.clearCookie("refreshToken", { path: "/auth/refresh" });

            res.status(OK).json({ message: "Logged out successfully" });
        }catch (error){
            next(error)
        }
    }
}