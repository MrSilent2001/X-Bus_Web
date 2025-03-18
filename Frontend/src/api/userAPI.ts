import axios from "axios";

const api = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_BASE_URL
    baseURL: "http://localhost:8080"
});

const token = localStorage.getItem("accessToken");
export const getUserById = async (email: string) =>{
    try {
        const response = await api.get("/user/getUserById", {
            params: {
                email: email
            },
            headers: {
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
