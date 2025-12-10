import {Router} from "express";
import {busController} from "../controllers/bus.controller";
import {authenticate} from "../middleware/auth";
import {authorize} from "../middleware/authorize";
import {userController} from "../controllers/userController";
import userRoutes from "./userRoutes";

const busRoutes = Router();

//prefix:bus
// busRoutes.post("/register", authenticate, authorize(["admin"]), busController.registerNewBus);
busRoutes.post("/register", authenticate, busController.registerNewBus);
busRoutes.get("/getAllBuses", authenticate, busController.getAllBuses);
busRoutes.get("/getBusById", authenticate, busController.getBusById);
busRoutes.get("/getBusScheduleById", authenticate, busController.getBusByScheduleId);
busRoutes.get("/getBusByRegNo", authenticate, busController.getBusByRegNo);
busRoutes.get("/getBusRoutes", authenticate, busController.getBusRoutes);
busRoutes.get("/getBusRegNo", authenticate, busController.getBusRegNo);
busRoutes.put("/editBus", authenticate, busController.editBus);
busRoutes.delete("/removeBus", authenticate, busController.removeBus);
busRoutes.post("/requestBusReg", busController.requestBusRegistration);
busRoutes.patch("/updateBusRegRequestStatus/:busRegNo", authenticate, busController.updateBusReqRequestStatus);
busRoutes.get("/getAllBusRegRequests", authenticate, busController.getAllBusRegistrationRequests);

export default busRoutes;