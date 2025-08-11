import express from "express";
import {paymentSchema} from "../schema/paymentSchema";
import {addNewExpense, createPayment, getExpenses, getIncome, savePaymentDetails} from "../services/payment.service";
import {CREATED, OK} from "../constants/http";
import {expenseSchema} from "../schema/expenseSchema";
import {getAllBuses} from "../services/bus.service";

export const paymentController = {
    // newPayment: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    //     try{
    //         const request = paymentSchema.parse(req.body);
    //         const newPayment = await createNewPayment(request);
    //         res.status(CREATED).json(newPayment);
    //     }catch(error){
    //         next(error)
    //     }
    // },

    newExpense: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try{
            const request = expenseSchema.parse(req.body);
            const newExpense = await addNewExpense(request);
            res.status(CREATED).json(newExpense);
        }catch(error){
            next(error);
        }
    },

    createPayment: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const request = req.body;
            console.log(request)
            const payment = await createPayment(request);
            res.status(CREATED).json(payment);
        }catch (error){
            next(error);
        }
    },

    savePayment: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const request = req.body.data as string;
            console.log(request);
            const payment = await savePaymentDetails(request);
            res.status(CREATED).json(payment);
        }catch (error){
            next(error);
        }
    },

    totalIncome: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try{
            const income = await getIncome();
            res.status(OK).json(income);
        } catch (error){
            next(error);
        }
    },

    totalExpense: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try{
            const expenses = await getExpenses();
            res.status(OK).json(expenses);
        } catch (error){
            next(error);
        }
    }
}