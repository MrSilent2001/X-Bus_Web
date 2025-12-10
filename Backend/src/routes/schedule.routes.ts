import {Router} from "express";
import {busScheduleController} from "../controllers/busSchedule.controller";
import {authenticate} from "../middleware/auth";

const scheduleRoutes = Router();

//prefix:bus
scheduleRoutes.post("/newSchedule", authenticate, busScheduleController.addNewSchedule);
scheduleRoutes.get("/getAllSchedules", authenticate, busScheduleController.getAllSchedules);
scheduleRoutes.get("/getSchedulesByBusId", authenticate, busScheduleController.getSchedulesByBusId);
scheduleRoutes.get("/getDailyRouteSchedule", authenticate, busScheduleController.getDailyRouteSchedule);
scheduleRoutes.delete("/removeScheduleById", authenticate, busScheduleController.deleteScheduleById);
// scheduleRoutes.delete("/removeBus", authenticate, busScheduleController.removeBus);

export default scheduleRoutes;