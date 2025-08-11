import axios from "axios";

const api = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_BASE_URL
    baseURL: "http://localhost:8080"
});

const token = localStorage.getItem("accessToken");

export const getTotalIncome = async () =>{
    try {
        const response = await api.get("/payment/total-income",{
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
export const getTotalExpenses = async () =>{
    try {
        const response = await api.get("/payment/total-expense",{
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