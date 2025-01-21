import {loginUser, registerUser} from "../services/auth.service";
import {userSchema} from "../schema/registerSchema";
import {Request, Response, NextFunction} from "express";
import {CREATED, OK} from "../constants/http";

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
          const {email, password} = req.body;
          const response = await loginUser(email, password);
          res.status(OK).json({response});
      }catch(error){
          next(error);
      }
    }
}