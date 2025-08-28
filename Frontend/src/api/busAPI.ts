import axios from "axios";
import {Bus} from "@/types/bus.ts";

const api = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_BASE_URL
    baseURL: "http://localhost:8080"
});

const token = localStorage.getItem("accessToken");

export const registerBus = async (formData: Bus) => {
    try {
        const response = await api.post("/bus/register", {
            ownerId: formData.ownerId,
            regNo: formData.regNo,
            fleetName: formData.fleetName,
            routeNo: formData.routeNo,
            route: formData.route,
            seatingCapacity: formData.seatingCapacity,
            busFare: formData.busFare.toString(),
            password: formData.password,
            profilePicture: formData.profilePicture
        }, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            console.log("Registration Successful:");
        }
    } catch (error) {
        console.error("Registration failed:", error);
    }
}

export type BusRegistrationRequestPayload = {
    ownerName: string;
    email: string;
    contact: string;
    age: number;
    gender: string;
    regNo: string;
    busType: string;
    manufactureYear: number;
    chassisNo: string;
    proofLetterUrl: string;
};

export const submitBusRegistrationRequest = async (payload: BusRegistrationRequestPayload) => {
    try {
        const response = await api.post("/bus/registration-request", payload, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined
            }
        });
        return response.data;
    } catch (error) {
        console.error("Submit registration request failed:", error);
        throw error;
    }
}

export type BusRegistrationRequest = BusRegistrationRequestPayload & { id: string; status: "pending" | "approved" | "rejected"; createdAt: string };

export const listBusRegistrationRequests = async (): Promise<BusRegistrationRequest[]> => {
    try {
        const response = await api.get("/bus/registration-requests", {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined
            }
        });
        return response.data;
    } catch (error) {
        console.error("List registration requests failed:", error);
        return [];
    }
}

export const approveBusRegistrationRequest = async (id: string) => {
    try {
        const response = await api.post(`/bus/registration-requests/${id}/approve`, {}, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined
            }
        });
        return response.data;
    } catch (error) {
        console.error("Approve registration request failed:", error);
        throw error;
    }
}

export const rejectBusRegistrationRequest = async (id: string) => {
    try {
        const response = await api.post(`/bus/registration-requests/${id}/reject`, {}, {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined
            }
        });
        return response.data;
    } catch (error) {
        console.error("Reject registration request failed:", error);
        throw error;
    }
}

export const getAllBuses = async (): Promise<Bus[]> =>{
    try {
        const response = await api.get("/bus/getAllBuses",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            return response.data;
        }

        return [];

    } catch (error){
        console.log("Failed to fetch data", error);
        return [];

    }
}

export const getBusByRegNo = async (regNo: string): Promise<Bus | null> =>{
    try {
        const response = await api.get("/bus/getBusByRegNo",{
            params:{
                regNo: regNo
            },
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            if (Array.isArray(response.data) && response.data.length > 0) {
                return response.data[0];
            }

            return response.data;
        }

        return null;

    } catch (error){
        console.log("Failed to fetch data", error);
        return null;

    }
}

export const updateBus = async (formData: Bus) => {
    try {
        const response = await api.put(`/bus/editBus`, {
            regNo: formData.regNo,
            fleetName: formData.fleetName,
            routeNo: formData.routeNo,
            route: formData.route,
            seatingCapacity: formData.seatingCapacity,
            busFare: formData.busFare.toString(),
            //password: formData.password,
            profilePicture: formData.profilePicture
        }, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            console.log("Update Successful:");
        }
    } catch (error) {
        console.error("Registration failed:", error);
    }
}


