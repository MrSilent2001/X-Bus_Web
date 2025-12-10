import {lostnfound} from "../schema/lostnfoundSchema";
import AppDataSource from "../config/connectDB";
import {LostnFound} from "../models/lostnfound.model";
import {Between} from "typeorm";
import {date} from "zod";
import {dateFilter} from "../utils/dateFilter";


const lostnfoundRepository = AppDataSource.getRepository(LostnFound);

export const createNewRequest  = async (data: lostnfound) => {
    const request = lostnfoundRepository.create(data);
    await lostnfoundRepository.save(request);

    return request;
}

export const getAllLostItemsList = async(
    filter: "Today" | "Yesterday" | "This Week" | "Last Week" | "This Month" | "Last Month" | "All"  = "All"
): Promise<LostnFound[]> => {
    let lostItemsList: LostnFound[] = [];

    const {startDate, endDate} = dateFilter(filter);

    const whereClause: any = {
        status: "Lost",
    };

    if (startDate && endDate) {
        whereClause.date = Between(startDate, endDate);
    }

    lostItemsList = await lostnfoundRepository.find({
        where: whereClause,
    });

    return lostItemsList;
}


export const getAllFoundItemsList = async(
    filter: "Today" | "Yesterday" | "This Week" | "Last Week" | "This Month" | "Last Month" | "All"  = "All"
): Promise<LostnFound[]> => {
    let foundItemsList: LostnFound[] = [];

    const {startDate, endDate} = dateFilter(filter);

    const whereClause: any = {
        status: "Found",
    };

    if (startDate && endDate) {
        whereClause.date = Between(startDate, endDate);
    }

    foundItemsList = await lostnfoundRepository.find({
        where: whereClause,
    });

    return foundItemsList;
}