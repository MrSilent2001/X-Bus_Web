import express from "express";
import {paymentSchema} from "../schema/paymentSchema";
import {addNewExpense, createNewPayment} from "../services/payment.service";
import {CREATED} from "../constants/http";
import {expenseSchema} from "../schema/expenseSchema";

export const paymentController = {
    newPayment: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try{
            const request = paymentSchema.parse(req.body);
            const newPayment = await createNewPayment(request);
            res.status(CREATED).json(newPayment);
        }catch(error){
            next(error)
        }
    },

    newExpense: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try{
            const request = expenseSchema.parse(req.body);
            const newExpense = await addNewExpense(request);
            res.status(CREATED).json(newExpense);
        }catch(error){
            next(error)
        }
    }
}