import express from "express";
import {paymentSchema} from "../schema/paymentSchema";
import {createNewPayment} from "../services/payment.service";
import {CREATED} from "../constants/http";

export const paymentController = {
    newPayment: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try{
            const request = paymentSchema.parse(req.body);
            const newPayment = await createNewPayment(request);
            res.status(CREATED).json(newPayment);
        }catch(error){
            next(error)
        }
    }
}