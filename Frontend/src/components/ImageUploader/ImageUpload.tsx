import React, {useEffect, useState} from "react";
import InputField from "@/components/InputField/InputField.tsx";

interface ImageUploaderProps {
    height?: string;
    width?: string;
    borderRadius?: string;
    onImageUpload?: (imageUrl: string) => void;
    reset?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
                                                         height = "350px",
                                                         width = "100%",
                                                         borderRadius = "3%",
                                                         reset = false,
                                                         onImageUpload
}) => {
    const [image, setImage] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                setImage(imageUrl);
                if (onImageUpload) {
                    onImageUpload(imageUrl);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // reset the image when `reset` prop is true
    useEffect(() => {
        if (reset) {
            setImage(null);
        }
    }, [reset]);

    return (
        <div
            className="flex flex-col items-center justify-center mx-auto bg-white rounded-lg"
            style={{ width, height }}
        >
            <label
                className="relative flex items-center justify-center w-full h-full border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
                style={{ borderRadius }}
            >
                {image ? (
                    <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
                ) : (
                    <div className="flex flex-col items-center">
                        <p className="text-gray-500">Click or Drag Image Here</p>
                    </div>
                )}
                <InputField
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                />
            </label>
        </div>
    );
};

export default ImageUploader;
