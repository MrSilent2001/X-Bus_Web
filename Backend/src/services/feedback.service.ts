import AppDataSource from "../config/connectDB";
import {Feedback} from "../models/feedback";
import {feedbackReg} from "../schema/feedbackSchema";

const feedbackRepository = AppDataSource.getRepository(Feedback);
export const addNewFeedback = async (feedbackData: feedbackReg) => {
    const feedback = feedbackRepository.create({...feedbackData});
    console.log(feedback);
    await feedbackRepository.save(feedback);

    return feedback;
}

export const getAllFeedbacks = async(): Promise<Feedback[]>=> {
    const feedbackData = await feedbackRepository.find();
    console.log(feedbackData);

    return feedbackData;
}