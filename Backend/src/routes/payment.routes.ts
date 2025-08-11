import {Router} from "express";
import {authenticate} from "../middleware/auth";
import {paymentController} from "../controllers/payment.controller";
import {authorize} from "../middleware/authorize";

const paymentRoutes = Router();

//prefix:payment
// paymentRoutes.post("/newPayment", authenticate, authorize(["passenger"]), paymentController.newPayment);
paymentRoutes.post("/payment-sheet", authenticate, paymentController.createPayment);
paymentRoutes.post("/save-payment", authenticate, paymentController.savePayment);
paymentRoutes.get("/total-income", authenticate, paymentController.totalIncome);
// busRoutes.put("/editBus", authenticate, busController.editBus);
// busRoutes.delete("/removeBus", authenticate, busController.removeBus);

// paymentRoutes.post("/newExpense", authenticate, authorize(["operator"]), paymentController.newExpense);
paymentRoutes.post("/newExpense", authenticate, paymentController.newExpense);
paymentRoutes.get("/total-expense", authenticate, paymentController.totalExpense);

export default paymentRoutes;