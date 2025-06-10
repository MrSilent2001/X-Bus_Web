import {Router} from "express";
import {authenticate} from "../middleware/auth";
import {paymentController} from "../controllers/payment.controller";
import {authorize} from "../middleware/authorize";

const paymentRoutes = Router();

//prefix:payment
paymentRoutes.post("/newPayment", authenticate, authorize(["passenger"]), paymentController.newPayment);
paymentRoutes.post("/payment-sheet", authenticate, paymentController.createPayment)
// busRoutes.get("/getAllBuses", authenticate, busController.getAllBuses);
// busRoutes.get("/getBusById", authenticate, busController.getBusById);
// busRoutes.put("/editBus", authenticate, busController.editBus);
// busRoutes.delete("/removeBus", authenticate, busController.removeBus);

paymentRoutes.post("/newExpense", authenticate, authorize(["operator"]), paymentController.newExpense);

export default paymentRoutes;