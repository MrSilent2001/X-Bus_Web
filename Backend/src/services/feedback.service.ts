import AppDataSource from "../config/connectDB";
import {Feedback} from "../models/feedback.model";
import {feedbackReg} from "../schema/feedbackSchema";
import {Between, Equal} from "typeorm";
import {dateFilter} from "../utils/dateFilter";

const feedbackRepository = AppDataSource.getRepository(Feedback);

export const addNewFeedback = async (feedbackData: feedbackReg) => {
    const feedback = feedbackRepository.create({...feedbackData});
    await feedbackRepository.save(feedback);

    return feedback;
}

export const getAllFeedbacks = async(
    filter: "Today" | "Yesterday" | "This Week" | "Last Week" | "This Month" | "Last Month" | "All"  = "All",
    busRegNo?: string
): Promise<Feedback[]>=> {
    let feedbackData: Feedback[] = [];

    const {startDate, endDate} = dateFilter(filter);

    const where: any = {};

    if (startDate && endDate) {
        where.createdAt = Between(startDate, new Date(endDate.getTime() - 1));
    }

    if (busRegNo) {
        where.busRegNo = Equal(busRegNo);
    }

    feedbackData = await feedbackRepository.find({ where });

    return feedbackData;
}