import {NextFunction, Request, Response} from "express";
import {OK} from "../constants/http";
import {
    editUser,
    getAllUsers,
    getUserByEmail,
    getUserById,
    removeUser,
    requestBusRegistration, updateBusRegistrationStatus
} from "../services/userService";

export const userController = {

    getAllUsers: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const users = await getAllUsers();
            res.status(OK).json(users);
        } catch (error){
            next(error);
        }
    },

    getUserByEmail: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await getUserByEmail(req.query.email as string);
            res.status(OK).json(user);
        } catch (error) {
            next(error);
        }
    },

    getUserById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await getUserById(req.query.id as string);
            res.status(OK).json(user);
        } catch (error) {
            next(error);
        }
    },

    editUser: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const user = await editUser(req.body);
            console.log("user", user)
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
    },

    requestBusRegistration: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const request = await requestBusRegistration(req.body);
            res.status(OK).json(request);
        } catch (error) {
            next(error);
        }
    },

    updateBusStatusController : async (req: Request, res: Response, next: NextFunction) => {
        try{
            const { busRegNo, status } = req.body;
            const updatedRequest = await updateBusRegistrationStatus(busRegNo, status);
            res.status(OK).json(updatedRequest);
        }catch (error) {
            next(error);
        }
    },

    getAllBusRegistrationRequests: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const requests = await getAllUsers();
            res.status(OK).json(requests);
        } catch (error){
            next(error);
        }
    }
}