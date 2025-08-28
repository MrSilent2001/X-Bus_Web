import axios from "axios";

const api = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_BASE_URL
    baseURL: "http://localhost:8080"
});

const token = localStorage.getItem("accessToken");


export const getUserByEmail = async (email: string) =>{
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
            // Check if the response has a data property or if the data is directly in response
            const userData = response.data?.data || response.data;
            return { data: userData };
        }

        return { data: null };

    } catch (error){
        console.error("Failed to fetch user data:", error);
        throw error;
    }
}

export const updateUser = async (formData: any) => {
    try {
        const response = await api.put(`/user/editUser`, {
            username: formData.name,
            email: formData.email,
            nic: formData.nic,
            contactNo: formData.contactNo,
            password: formData.password,
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
        console.error("Update failed:", error);
    }
}
