import {Router} from "express";
import {authenticate} from "../middleware/auth";
import {userController} from "../controllers/userController";

const userRoutes = Router();

//prefix:user
userRoutes.get("/getAllUsers", authenticate, userController.getAllUsers);
userRoutes.get("/getUserByEmail", authenticate, userController.getUserByEmail);
userRoutes.get("/getUserById", authenticate, userController.getUserById);
userRoutes.put("/editUser", authenticate, userController.editUser);
userRoutes.delete("/removeUser", authenticate, userController.removeUser);

export default userRoutes;