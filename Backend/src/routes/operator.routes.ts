import {Router} from "express";
import {authenticate} from "../middleware/auth";
import {operatorController} from "../controllers/operator.controller";

const operatorRoutes = Router();

//prefix:operator
operatorRoutes.post("/newOperator", authenticate, operatorController.addNewOperator);
operatorRoutes.get("/getAllOperators", authenticate, operatorController.getAllOperators);
// operatorRoutes.get("/getUserById", authenticate, userController.getUserById);
// operatorRoutes.patch("/editUser", authenticate, userController.editUser);
// operatorRoutes.delete("/removeUser", authenticate, userController.removeUser);

export default operatorRoutes;