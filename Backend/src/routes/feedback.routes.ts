import {Router} from "express";
import {authenticate} from "../middleware/auth";
import {feedbackController} from "../controllers/feedback.controller";

const feedbackRoutes = Router();

//prefix:feedback
feedbackRoutes.post("/addNewFeedback", authenticate, feedbackController.addFeedback);
feedbackRoutes.get("/getAllFeedbacks", authenticate, feedbackController.getAllFeedbacks);

export default feedbackRoutes;