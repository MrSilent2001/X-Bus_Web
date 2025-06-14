import {Router} from "express";
import {busController} from "../controllers/bus.controller";
import {authenticate} from "../middleware/auth";

const busRoutes = Router();

//prefix:bus
busRoutes.post("/register", authenticate, busController.registerNewBus);
busRoutes.get("/getAllBuses", authenticate, busController.getAllBuses);
busRoutes.get("/getBusById", authenticate, busController.getBusById);
busRoutes.put("/editBus", authenticate, busController.editBus);
busRoutes.delete("/removeBus", authenticate, busController.removeBus);

export default busRoutes;