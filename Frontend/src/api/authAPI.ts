import axios from "axios";

const api = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_BASE_URL
    baseURL: "http://localhost:5173"
});



export const userLogin = async (formData: {
    username: string;
    password: string;
}) => {

    try {
        const response = await api.post("/auth/login", {
            username: formData.username,
            password: formData.password
        });

        if (response.status === 200) {

            const token = response.data.token;
            console.log(token);
            localStorage.setItem('accessToken', token);

            // Decode the token
            function parseJwt(token: string) {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(
                    atob(base64)
                        .split('')
                        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                        .join('')
                );
                return JSON.parse(jsonPayload);
            }

            // Get the decoded token
            const decodedToken = parseJwt(token);
            console.log('Decoded Token:', decodedToken);

            // Extract role
            const userRole = decodedToken.role;
            console.log('User Role:', userRole);

            return { token, userRole };

        }
    } catch (error) {
        // setErrors("Invalid username or password.");
        console.error("Login failed:", error);
    }
}


export const userSignUp = async (formData: {
                                     username: string;
                                     email: string;
                                     password: string;
                                     confirmPassword: string
                                 }
) => {
    try {
        const response = await api.post("/auth/signup", {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
        });

        if (response.status === 200) {
            console.log("SignUp Successful:");
            // router.push("/auth/login");
        }
    } catch (error) {
        // setErrors("Invalid username or password.");
        console.error("SignUp failed:", error);
    }
}


// export const forgotPassword = async (formData: { email: string; }) => {
//     try {
//         const response = await api.post(`/forgot-password/verify-mail/${formData.email}`);
//
//         if (response.status === 200) {
//             console.log("SignUp Successful:");
//             alert("OTP Sent Successfully");
//             router.push("/auth/verifyOTP");
//         }
//     } catch (error) {
//         // setErrors("Invalid username or password.");
//         console.error("SignUp failed:", error);
//     }
// }


// export const verifyOTP = async (email: string, otp: string, router: ReturnType<typeof useRouter>) => {
//     try {
//         const response = await api.post(`/forgot-password/verify-otp/${otp}/${email}`);
//
//         const url = `/forgot-password/verify-otp/${otp}/${email}`;
//         console.log("Request URL: ", url);
//
//         if (response.status === 200) {
//             console.log("OTP Verified:");
//             alert(response.data);
//             router.push("/auth/resetPassword");
//         }
//     } catch (error) {
//         console.error("Invalid OTP:", error);
//     }
// }


// export const resetPassword = async (
//     formData: { password: string; confirmPassword: string },
//     email: string,
//     router: ReturnType<typeof useRouter>
// ) => {
//     console.log(email)
//     try {
//         const response = await api.post(`/forgot-password/change-password/${email}`, {
//             password: formData.password,
//             confirmPassword: formData.confirmPassword,
//         });
//
//         if (response.status === 200) {
//             console.log("Password Reset Successful:");
//             router.push("/auth/login");
//         }
//     } catch (error) {
//         // setErrors("Invalid username or password.");
//         console.error("Password Reset failed:", error);
//     }
// }