import axios from "axios";
import { BusOperator } from "@/types/user";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

const token = localStorage.getItem("accessToken");

export const getAllOperators = async (): Promise<BusOperator[]> => {
    try {
        const response = await api.get("/operator/getAllOperators", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            return response.data;
        }

        return [];
    } catch (error) {
        console.log("Failed to fetch operators", error);
        return [];
    }
};

export const getOperatorById = async (id: string): Promise<BusOperator | null> => {
    try {
        const response = await api.get(`/operator/getOperatorById/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            return response.data;
        }

        return null;
    } catch (error) {
        console.log("Failed to fetch operator", error);
        return null;
    }
};

export const createOperator = async (operatorData: BusOperator) => {
    try {
        const response = await api.post("/operator/create", {
            name: operatorData.name,
            email: operatorData.email,
            contactNo: operatorData.contactNo,
            nic: operatorData.nic,
            licenseNo: operatorData.licenseNo,
            experience: operatorData.experience,
            profilePicture: operatorData.profilePicture
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            console.log("Operator creation successful");
            return response.data;
        }
    } catch (error) {
        console.error("Operator creation failed:", error);
        throw error;
    }
};

export const assignOperatorToBus = async (operatorId: string, busRegNo: string) => {
    try {
        const response = await api.post("/operator/assign", {
            operatorId: operatorId,
            busRegNo: busRegNo
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            console.log("Operator assignment successful");
            return response.data;
        }
    } catch (error) {
        console.error("Operator assignment failed:", error);
        throw error;
    }
};

export const unassignOperatorFromBus = async (operatorId: string) => {
    try {
        const response = await api.post("/operator/unassign", {
            operatorId: operatorId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            console.log("Operator unassignment successful");
            return response.data;
        }
    } catch (error) {
        console.error("Operator unassignment failed:", error);
        throw error;
    }
};

export const updateOperator = async (operatorData: BusOperator) => {
    try {
        const response = await api.put(`/operator/update/${operatorData.id}`, {
            name: operatorData.name,
            email: operatorData.email,
            contactNo: operatorData.contactNo,
            nic: operatorData.nic,
            licenseNo: operatorData.licenseNo,
            experience: operatorData.experience,
            profilePicture: operatorData.profilePicture
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            console.log("Operator update successful");
            return response.data;
        }
    } catch (error) {
        console.error("Operator update failed:", error);
        throw error;
    }
};

export const deleteOperator = async (operatorId: string) => {
    try {
        const response = await api.delete(`/operator/delete/${operatorId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            console.log("Operator deletion successful");
            return response.data;
        }
    } catch (error) {
        console.error("Operator deletion failed:", error);
        throw error;
    }
}; 