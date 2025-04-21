import {NextFunction, Request, Response} from "express";
import {reservationSchema} from "../schema/reservationSchema";
import {CREATED, OK} from "../constants/http";
import {addNewReservation, getAllReservations, getReservationsByUser} from "../services/reservation.service";


export const ReservationController = {
    newReservation: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const request = reservationSchema.parse(req.body);
            const reservation = await addNewReservation(request);
            res.status(CREATED).json(reservation);
        }catch(error){
            next(error)
        }
    },

    allReservations: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const reservations = await getAllReservations();
            res.status(OK).json(reservations);
        }catch(error){
            next(error)
        }
    },

    reservationsByUserId: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const reservations = await getReservationsByUser(req.query.userId as string);
            res.status(OK).json(reservations);
        }catch(error){
            next(error)
        }
    }
}