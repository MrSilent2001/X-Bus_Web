import axios from "axios";

const api = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_BASE_URL
    baseURL: "http://localhost:8080"
});

const token = localStorage.getItem("accessToken");

export const getTotalIncome = async (busId?: number) =>{
    try {
        const url = busId ? `/payment/total-income/${busId}` : "/payment/total-income";
        const response = await api.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
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
export const getTotalExpenses = async (busId: undefined | number) =>{
    try {
        console.log(busId)
        const url = busId ? `/payment/total-expense/${busId}` : "/payment/total-expense";
        const response = await api.get(url,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            console.log(response.data)
            return response.data;
        }

        return [];

    } catch (error){
        console.log("Failed to fetch data", error);
        return [];

    }
}