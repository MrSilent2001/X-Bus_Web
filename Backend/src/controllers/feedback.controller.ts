import {NextFunction, Request, Response} from "express";
import {CREATED, OK} from "../constants/http";
import {feedbackSchema} from "../schema/feedbackSchema";
import {addNewFeedback, getAllFeedbacks} from "../services/feedback.service";

export const feedbackController = {
    addFeedback: async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
        try {
            const feedbackData = feedbackSchema.parse(req.body);
            const newFeedback = await addNewFeedback(feedbackData);
            res.status(CREATED).json(newFeedback);
        } catch (error) {
            next(error)
        }
    },

    getAllFeedbacks: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const filter = req.query.filter as "Today" | "Yesterday" | "This Week" | "Last Week" | "This Month" | "Last Month" | "All" | undefined;
            const busRegNo = req.query.busRegNo as string;

            const feedbacks = await getAllFeedbacks(filter ?? "All", busRegNo);
            res.status(OK).json(feedbacks);
        } catch (error){
            next(error);
        }
    },
}