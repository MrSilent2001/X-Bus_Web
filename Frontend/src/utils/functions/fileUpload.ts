// src/utils/functions/uploadToCloudinary.ts
import axios from "axios";

export const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    console.log("cloudName", cloudName);
    console.log("uploadPreset", uploadPreset);
    console.log("file", file);

    const formData = new FormData();
    if(cloudName && uploadPreset){
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
    }

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data.secure_url;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new Error("Image upload failed");
    }
};
