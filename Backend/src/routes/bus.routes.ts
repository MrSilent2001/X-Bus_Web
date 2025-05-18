import {Router} from "express";
import {busController} from "../controllers/bus.controller";
import {authenticate} from "../middleware/auth";
import {authorize} from "../middleware/authorize";

const busRoutes = Router();

//prefix:bus
busRoutes.post("/register", authenticate, authorize(["admin"]), busController.registerNewBus);
busRoutes.get("/getAllBuses", authenticate, busController.getAllBuses);
busRoutes.get("/getBusById", authenticate, busController.getBusById);
busRoutes.get("/getBusRoutes", authenticate, busController.getBusRoutes);
busRoutes.get("/getBusRegNo", authenticate, busController.getBusRegNo);
busRoutes.put("/editBus", authenticate, busController.editBus);
busRoutes.delete("/removeBus", authenticate, busController.removeBus);

export default busRoutes;