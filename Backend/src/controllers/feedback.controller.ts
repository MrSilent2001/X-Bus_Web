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
            const feedbacks = await getAllFeedbacks();
            res.status(OK).json(feedbacks);
        } catch (error){
            next(error);
        }
    },
}