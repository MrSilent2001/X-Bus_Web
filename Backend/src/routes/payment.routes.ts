import {Router} from "express";
import {authenticate} from "../middleware/auth";
import {paymentController} from "../controllers/payment.controller";
import {authorize} from "../middleware/authorize";

const paymentRoutes = Router();

//prefix:payment
// paymentRoutes.post("/newPayment", authenticate, authorize(["passenger"]), paymentController.newPayment);
paymentRoutes.post("/payment-sheet", authenticate, paymentController.createPayment);
paymentRoutes.post("/save-payment", authenticate, paymentController.savePayment);
paymentRoutes.get("/total-income/:busId?", authenticate, paymentController.totalIncome);
paymentRoutes.get("/user-payments/:userId", authenticate, paymentController.paymentsByUser);

// paymentRoutes.post("/newExpense", authenticate, authorize(["operator"]), paymentController.newExpense);
paymentRoutes.post("/newExpense", authenticate, paymentController.newExpense);
paymentRoutes.get("/total-expense/:busId?", authenticate, paymentController.totalExpense);

export default paymentRoutes;