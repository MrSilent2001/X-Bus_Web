import {NextFunction, Request, Response} from "express";
import {lostnFoundSchema} from "../schema/lostnfoundSchema";
import {CREATED} from "../constants/http";
import {createNewRequest, getAllFoundItemsList, getAllLostItemsList} from "../services/lostnfoundService";
import {OK} from "../constants/http";

export const LostnFoundController = {
    create: async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const request = lostnFoundSchema.parse(req.body);
            const newRequest = await createNewRequest(request);
            res.status(CREATED).json(newRequest);
        }catch (error){
            next(error)
        }
    },

    getAllLostItemsList: async(req: Request, res: Response, next: NextFunction) => {
        try{
            const filter = req.query.filter as "Today" | "Yesterday" | "This Week" | "Last Week" | "This Month" | "Last Month" | "All" | undefined;
            const data = await getAllLostItemsList(filter ?? "All");
            res.status(OK).json(data);
        }catch (error){
            next(error);
        }
    },

    getAllFoundItemsList: async(req: Request, res: Response, next: NextFunction) => {
        try{
            const filter = req.query.filter as "Today" | "Yesterday" | "This Week" | "Last Week" | "This Month" | "Last Month" | "All" | undefined;
            const data = await getAllFoundItemsList(filter ?? "All");
            res.status(OK).json(data);
        }catch (error){
            next(error);
        }
    }
}