import {NextFunction, Request, Response} from "express";
import {OK} from "../constants/http";
import {editUser, getAllUsers, getUserById, removeUser} from "../services/userService";

export const userController = {

    getAllUsers: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const users = await getAllUsers();
            res.status(OK).json(users);
        } catch (error){
            next(error);
        }
    },

    getUserById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await getUserById(req.body.id);
            res.status(OK).json(user);
        } catch (error) {
            next(error);
        }
    },

    editUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const user = await editUser(req.body);
            res.status(OK).json(user);
        } catch (error) {
            next(error);
        }
    },

    removeUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const user = await removeUser(req.body.email);
            res.status(OK).json(user);
        } catch (error) {
            next(error);
        }
    }
}