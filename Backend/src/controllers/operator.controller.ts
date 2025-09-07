import {Request, Response, NextFunction} from "express";
import {CREATED, OK} from "../constants/http";
import {getAllOperators, registerOperator} from "../services/operator.service";
import {operatorSchema} from "../schema/operatorSchema";

export const operatorController = {
    addNewOperator: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const operatorData = operatorSchema.parse(req.body);
            const newOperator = await registerOperator(operatorData);
            res.status(CREATED).json(newOperator);
        } catch (error) {
            next(error);
        }
    },

    getAllOperators: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const operators = await getAllOperators();
            res.status(OK).json(operators);
        } catch (error){
            next(error);
        }
    },
}