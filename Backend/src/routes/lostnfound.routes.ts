import {Router} from "express";
import {authenticate} from "../middleware/auth";
import {LostnFoundController} from "../controllers/lostnfoundController";

const lostnfound = Router();

//prefix:lostnfound
lostnfound.post("/create", authenticate, LostnFoundController.create);
lostnfound.get("/getAllLostItems", authenticate, LostnFoundController.getAllLostItemsList);
lostnfound.get("/getAllFoundItems", authenticate, LostnFoundController.getAllFoundItemsList);
// lostnfound.put("/editBus", authenticate, busController.editBus);
// lostnfound.delete("/removeBus", authenticate, busController.removeBus);

export default lostnfound;