import express from "express";
import {
    addNewExpense,
    createPayment, getBusPaymentHistory,
    getExpenses,
    getIncome,
    getUserPaymentHistory,
    savePaymentDetails
} from "../services/payment.service";
import {CREATED, OK} from "../constants/http";
import {expenseSchema} from "../schema/expenseSchema";

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

    paymentsByUser: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const filter = req.query.filter as "Today" | "Yesterday" | "This Week" | "Last Week" | "This Month" | "Last Month" | "All" | undefined;
            const userId = req.params.userId;

            const payments = await getUserPaymentHistory(filter ?? "All",Number(userId));
            res.status(OK).json(payments);
        } catch (error) {
            next(error);
        }
    },

    paymentsByBus: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const filter = req.query.filter as "Today" | "Yesterday" | "This Week" | "Last Week" | "This Month" | "Last Month" | "All" | undefined;
            const userId = req.params.userId;

            const payments = await getBusPaymentHistory(filter ?? "All",Number(userId));
            res.status(OK).json(payments);
        } catch (error) {
            next(error);
        }
    },

    totalIncome: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const busId = req.params.busId;
            const income = await getIncome(Number(busId));
            res.status(OK).json(income);
        } catch (error) {
            next(error);
        }
    },

    totalExpense: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try{
            const busId = req.params.busId;
            const expenses = await getExpenses(Number(busId));
            res.status(OK).json(expenses);
        } catch (error){
            next(error);
        }
    },
}