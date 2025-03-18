import {Router} from "express";
import {authController} from "../controllers/auth.controller";

const authRoutes = Router();

//prefix:auth
authRoutes.post("/signup", authController.signUp);
authRoutes.post("/login", authController.login);
authRoutes.post("/forgot-password/:email", authController.forgotPassword);
authRoutes.post("/verify-otp/:otp/:email", authController.verifyOTP);
authRoutes.post("/reset-password/:email", authController.resetPassword);
authRoutes.post("/logout", authController.logout);

export default authRoutes;