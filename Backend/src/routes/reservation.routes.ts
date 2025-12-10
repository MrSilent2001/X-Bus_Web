import {Router} from "express";
import {busScheduleController} from "../controllers/busSchedule.controller";
import {authenticate} from "../middleware/auth";
import {ReservationController} from "../controllers/reservationController";
import {authorize} from "../middleware/authorize";

const reservationRoutes = Router();

//prefix:reservation
reservationRoutes.post("/newReservation", authenticate, authorize(["passenger"]), ReservationController.newReservation);
reservationRoutes.get("/getAllReservations", authenticate, ReservationController.allReservations);
reservationRoutes.get("/getReservationsByUserId", authenticate, ReservationController.reservationsByUserId);
reservationRoutes.get("/getReservedSeats", authenticate, ReservationController.reservedSeatsPerSchedule);
// reservationRoutes.delete("/removeScheduleById", authenticate, ReservationController.deleteScheduleById);
// reservationRoutes.delete("/removeBus", authenticate, ReservationController.removeBus);

export default reservationRoutes;