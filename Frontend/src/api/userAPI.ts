import axios from "axios";

const api = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_BASE_URL
    baseURL: "http://localhost:8080"
});

export const getUserByEmail = async (email: string, token: string | null) =>{
    try {
        const response = await api.get("/user/getUserByEmail", {
            params: {
                email: email
            },
            headers: {
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
