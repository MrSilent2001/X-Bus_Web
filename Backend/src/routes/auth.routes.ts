import {Router} from "express";
import {authController} from "../controllers/auth.controller";

const authRoutes = Router();

//prefix:auth
authRoutes.post("/register", authController.signUp);
authRoutes.post("/login", authController.login);

export default authRoutes;