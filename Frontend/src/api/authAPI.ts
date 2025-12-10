import axios from "axios";
import {parseJwt} from "@/utils/functions/parseJWT.ts";

const api = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_BASE_URL
    baseURL: "http://localhost:8080"
});


export const userLogin = async (formData: {
    email: string;
    password: string;
}) => {

    try {
        const response = await api.post("/auth/login", {
            identifier: formData.email,
            password: formData.password
        });

        if (response.status === 200) {

            const token = response.data.accessToken;
            localStorage.setItem('accessToken', token);

            const decodedToken = parseJwt(token);
            const userRole = decodedToken.role;

            return { token, userRole };

        }
    } catch (error) {
        // setErrors("Invalid username or password.");
        console.error("Login failed:", error);
    }
}


export const userSignUp = async (formData: {
                                     name: string;
                                     email: string;
                                     nic: string;
                                     password: string;
                                     confirmPassword: string;
                                 }
) => {
    try {
        const response = await api.post("/auth/signup", {
            name: formData.name,
            nic: formData.nic,
            contactNo: '',
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            role: 'admin',
            profilePicture: 'https://th.bing.com/th/id/OIP.cjgNLtmwsA5WxCI1Jr3dqgHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3'
        });

        if (response.status === 200) {
            console.log("SignUp Successful:");
        }
    } catch (error) {
        // setErrors("Invalid username or password.");
        console.error("SignUp failed:", error);
    }
}


export const forgotPassword = async (formData: { email: string; }) => {
    try {
        const response = await api.post(`auth/forgot-password/${formData.email}`);

        if (response.status === 200) {
            console.log("SignUp Successful:");
            alert("OTP Sent Successfully");
        }
    } catch (error) {
        // setErrors("Invalid username or password.");
        console.error("SignUp failed:", error);
    }
}


export const verifyOTP = async (email: string, otp: string) => {
    try {
        const response = await api.post(`auth/verify-otp/${otp}/${email}`);

        if (response.status === 200) {
            console.log("OTP Verified:");
            alert(response.data);
        }
    } catch (error) {
        console.error("Invalid OTP:", error);
    }
}


export const resetPassword = async (
    formData: {
        password: string;
        confirmPassword: string
    },
    email: string,
) => {
    console.log(email)
    try {
        const response = await api.post(`auth/reset-password/${email}`, {
            password: formData.password,
            confirmPassword: formData.confirmPassword,
        });

        if (response.status === 200) {
            console.log("Password Reset Successful:");
        }
    } catch (error) {
        // setErrors("Invalid username or password.");
        console.error("Password Reset failed:", error);
    }
}