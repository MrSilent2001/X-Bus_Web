import {NextFunction, Request, Response} from "express";
import {CREATED, OK} from "../constants/http";
import {editBus, getAllBuses, getBusById, registerNewBus, removeBus} from "../services/bus.service";
import {busSchema} from "../schema/busSchema";

export const busController = {
    registerNewBus:async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const busData = busSchema.parse(req.body);
            const newBus = await registerNewBus(busData);
            res.status(CREATED).json(newBus);
        } catch (error) {
            next(error);
        }
    },

    getAllBuses: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const buses = await getAllBuses();
            res.status(OK).json(buses);
        } catch (error){
            next(error);
        }
    },

    getBusById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bus = await getBusById(req.body.regNo);
            res.status(OK).json(bus);
        } catch (error) {
            next(error);
        }
    },

    editBus: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const bus = await editBus(req.body.regNo);
            res.status(OK).json(bus);
        } catch (error) {
            next(error);
        }
    },

    removeBus: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const bus = await removeBus(req.body);
            res.status(OK).json(bus);
        } catch (error) {
            next(error);
        }
    }
}