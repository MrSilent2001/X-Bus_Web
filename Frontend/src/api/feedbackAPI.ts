import axios from "axios";
import {Feedback} from "@/types/feedback.ts";

const api = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_BASE_URL
    baseURL: "http://localhost:8080"
});

const token = localStorage.getItem("accessToken");

export const getAllFeedbacks = async (): Promise<Feedback[]> =>{
    try {
        const response = await api.get("/feedback/getAllFeedbacks",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            console.log("Data Fetching Successful:");
            return response.data;
        }

        return [];

    } catch (error){
        console.log("Failed to fetch data", error);
        return [];

    }
}




