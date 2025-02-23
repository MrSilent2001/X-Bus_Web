import axios from "axios";

const api = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_BASE_URL
    baseURL: "http://localhost:5173"
});

export const registerBus = async (formData: {
    regNo: string;
    fleetName: string;
    routeNo: string;
    route: string;
    seatingCapacity: number;
    busFare: number;
    password: string;
    confirmPassword: string;
                                 }
) => {
    try {
        const response = await api.post("/bus/register", {
            regNo: formData.regNo,
            fleetName: formData.fleetName,
            routeNo: formData.routeNo,
            route: formData.route,
            seatingCapacity: formData.seatingCapacity,
            busFare: formData.busFare,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
        });

        if (response.status === 200) {
            console.log("Registration Successful:");
        }
    } catch (error) {
        console.error("Registration failed:", error);
    }
}