import React, { useEffect, useRef, useState } from "react";
import CustomButton from "@/components/Button/CustomButton.tsx";
import InputField from "@/components/InputField/InputField.tsx";

interface ImageUploaderProps {
    height?: string;
    width?: string;
    borderRadius?: string;
    borderColor?: string;
    onImageUpload?: (imageUrl: string) => void;
    initialImage?: string;
    reset?: boolean;
    disabled?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
                                                         height = "350px",
                                                         width = "100%",
                                                         borderRadius = "3%",
                                                         borderColor = "1px solid gray",
                                                         reset = false,
                                                         initialImage = null,
                                                         onImageUpload,
                                                         disabled = false,
                                                     }) => {
    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Handle file upload
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                setImage(imageUrl); // Set the local image state
                if (onImageUpload) {
                    onImageUpload(imageUrl); // Trigger the parent callback with the image URL
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Trigger file input click programmatically
    const triggerFileInput = () => {
        if (fileInputRef.current && !disabled) {
            fileInputRef.current.click();
        }
    };

    // Reset the image when `reset` prop is true
    useEffect(() => {
        if (reset) {
            setImage(null);
        }
    }, [reset]);

    // Update image when `initialImage` changes
    useEffect(() => {
        if (initialImage) {
            setImage(initialImage);
        }
    }, [initialImage]);

    return (
        <>
            <div
                className="flex flex-col items-center justify-center mx-auto bg-white rounded-lg"
                style={{ width, height }}
            >
                <label
                    className={`relative flex items-center justify-center w-full h-full border-2 rounded-lg ${
                        disabled ? "cursor-not-allowed" : "hover:border-blue-500"
                    }`}
                    style={{ borderRadius, borderColor }}
                >
                    {image ? (
                        <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                        <div className="flex flex-col items-center">
                            <p className="text-gray-500">{disabled ? "Image Upload Disabled" : "Click or Drag Image Here"}</p>
                        </div>
                    )}
                </label>
            </div>

            <div>
                <CustomButton
                    type="button"
                    buttonLabel={"Upload Image"}
                    onClick={triggerFileInput}
                    buttonClassName={`mt-4 py-2 px-4 text-white bg-gray-400 bg-gradient-to-r from-red-200 to-red-200 rounded-lg h-10 text-red-800 hover:bg-red-300 cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={disabled}
                />

                <InputField
                    ref={fileInputRef}
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={disabled}
                />
            </div>
        </>
    );
};

export default ImageUploader;
