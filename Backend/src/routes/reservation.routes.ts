import {Router} from "express";
import {busScheduleController} from "../controllers/busSchedule.controller";
import {authenticate} from "../middleware/auth";
import {ReservationController} from "../controllers/reservationController";

const reservationRoutes = Router();

//prefix:reservation
reservationRoutes.post("/newReservation", authenticate, ReservationController.newReservation);
reservationRoutes.get("/getAllReservations", authenticate, ReservationController.allReservations);
reservationRoutes.get("/getReservationsByUserId", authenticate, ReservationController.reservationsByUserId);
// reservationRoutes.delete("/removeScheduleById", authenticate, ReservationController.deleteScheduleById);
// reservationRoutes.delete("/removeBus", authenticate, ReservationController.removeBus);

export default reservationRoutes;