import {Router} from "express";
import {authController} from "../controllers/auth.controller";

const authRoutes = Router();

//prefix:auth
authRoutes.post("/register", authController.signUp);
authRoutes.post("/login", authController.login);
authRoutes.post("/forgotPassword", authController.forgotPassword);
authRoutes.post("/resetPassword", authController.resetPassword);
authRoutes.post("/logout", authController.logout);

export default authRoutes;