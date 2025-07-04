import {NextFunction, Request, Response} from "express";
import {CREATED, OK} from "../constants/http";
import {busScheduleSchema} from "../schema/busScheduleSchema";
import {addNewSchedule, deleteScheduleById, getAllSchedules, getSchedulesByBusId} from "../services/schedule.service";

export const busScheduleController = {
    addNewSchedule:async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = busScheduleSchema.parse(req.body);
            const newSchedule = await addNewSchedule(data);
            res.status(CREATED).json(newSchedule);
        } catch (error) {
            next(error);
        }
    },

    getAllSchedules: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data  = await getAllSchedules();
            res.status(OK).json(data);
        }catch (error){
            next(error);
        }
    },

    getSchedulesByBusId: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data  = await getSchedulesByBusId(req.query.id as string);
            res.status(OK).json(data);
        }catch (error){
            next(error);
        }
    },

    deleteScheduleById: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const data = await deleteScheduleById(req.query.id as string);
            res.status(OK).json(data);
        }catch (error){
            next(error);
        }
    }

}