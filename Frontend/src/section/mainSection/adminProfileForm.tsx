import ImageUploader from "@/components/ImageUploader/ImageUpload.tsx";
import InputField from "@/components/InputField/InputField.tsx";
import CustomButton from "@/components/Button/CustomButton.tsx";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {getUserByEmail} from "@/api/userAPI.ts";
import {useNavigate} from "react-router-dom";
import {User} from "@/types/user.ts";

const AdminProfileForm = () => {
    const email = localStorage.getItem("userEmail");
    const navigate = useNavigate();

    //Initialize react-hook form
    const {register, setValue} = useForm<User>({
        defaultValues: {
            name: '',
            email: '',
            nic: '',
            contactNo: '',
            profilePicture: undefined
        }
    });

    const [errors, setErrors] = useState<string>('');
    const [profileImage, setProfileImage] = useState<string | null>(null);

    useEffect(() => {
        const fetUserDetails = async () =>{
            try {
                if (email) {
                    const response = await getUserByEmail(email);
                    if (response) {
                        Object.entries(response).forEach(([key, value]) => {
                            if (key in response) {
                                setValue(key as keyof User, value as never);
                            }
                        });

                        setProfileImage(response.profilePicture || null);
                    }
                }
            } catch (error) {
                console.error("Error fetching bus details:", error);
                setErrors("Failed to load bus details. Please try again.");
            }
        };
        fetUserDetails();
    }, [email, setValue]);

    const handleSubmit = () =>{
        navigate(`/editAdminProfile`)
    }

    return(
        <>
            <div className="w-full mt-32 mb-16 flex">
                <div
                    className="w-1/3 rounded-lg bg-white border-r border-gray-300 flex flex-col items-center justify-center">

                    <ImageUploader
                        height="300px"
                        width="300px"
                        borderColor="1px solid gray"
                        initialImage={profileImage || undefined}
                        disabled={true}
                    />

                </div>

                <div className="w-2/3 p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
                    {errors && (
                        <div className="text-red-500 text-sm mb-4">
                            {errors}
                        </div>
                    )}

                    <div className="grid gap-4">
                        <div className="w-full flex justify-between">
                            <label htmlFor="name" className="block text-sm font-medium text-carnation-400 mt-2">
                                UserName
                            </label>
                            <div className="w-2/3">
                                <InputField
                                    id="name"
                                    type="text"
                                    placeholder="UserName"
                                    {...register("name")}
                                    icon={undefined}
                                    label={false}
                                    labelName="name"
                                />
                            </div>
                        </div>

                        <div className="w-full flex justify-between">
                            <label htmlFor="email" className="block text-sm font-medium text-carnation-400 mt-2">
                                E-mail
                            </label>
                            <div className="w-2/3">
                                <InputField
                                    id="email"
                                    type="text"
                                    placeholder="E-mail"
                                    {...register("email")}
                                    icon={undefined}
                                    label={false}
                                    labelName="email"
                                />
                            </div>
                        </div>

                        <div className="w-full flex justify-between">
                            <label htmlFor="nic" className="block text-sm font-medium text-carnation-400 mt-2">
                                NIC
                            </label>
                            <div className="w-2/3">
                                <InputField
                                    id="nic"
                                    type="text"
                                    placeholder="NIC"
                                    {...register("nic")}
                                    icon={undefined}
                                    label={false}
                                    labelName="nic"
                                />
                            </div>
                        </div>

                        <div className="w-full flex justify-between">
                            <label htmlFor="route" className="block text-sm font-medium text-carnation-400 mt-2">
                                Contact No.
                            </label>
                            <div className="w-2/3">
                                <InputField
                                    id="contactNo"
                                    type="text"
                                    placeholder="Contact No"
                                    {...register("contactNo")}
                                    icon={undefined}
                                    label={false}
                                    labelName="contactNo"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 mb-4">
                        <CustomButton
                            type="submit"
                            buttonLabel={"Edit Profile"}
                            buttonClassName="w-full text-white bg-gradient-to-r from-red-200 to-red-200 rounded-lg h-10 text-red-800 transition-all duration-300 transform hover:bg-gradient-to-r hover:from-red-300 hover:to-red-300 cursor-pointer"
                            onClick={handleSubmit}
                        />
                    </div>

                </div>
            </div>
        </>
    );
}

export default AdminProfileForm;
