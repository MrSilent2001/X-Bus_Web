import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import InputField from "@/components/InputField/InputField.tsx";
import CustomButton from "@/components/Button/CustomButton.tsx";
import ImageUploader from "@/components/ImageUploader/ImageUpload.tsx";
import {getUserByEmail, updateUser} from "@/api/userAPI.ts";
import {SignupSchema} from "@/schema/auth/SignupSchema.ts";
import {User} from "@/types/user.ts";

const EditAdminProfileForm = () => {
    const email = localStorage.getItem("userEmail");
    const navigate = useNavigate();

    //Initialize react-hook form
    const {register, setValue, handleSubmit, reset} = useForm<User>({
        defaultValues: {
            name: '',
            email: '',
            nic: '',
            contactNo: '',
            password: '',
            confirmPassword: '',
            profilePicture: undefined
        }
    });

    const [errors, setErrors] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [defaultPassword, setDefaultPassword] = useState<string>('');

    useEffect(() => {
        const fetUserDetails = async () =>{
            try {
                if (email) {
                    const response = await getUserByEmail(email);
                    if (response) {
                        Object.entries(response).forEach(([key, value]) => {
                            if (key in response && key !== "password" && key !== "confirmPassword") {
                                setValue(key as keyof User, value as never);
                            }
                        });

                        setProfileImage(response.profilePicture || null);
                        setDefaultPassword(response.password);
                    }
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
                setErrors("Failed to load user details. Please try again.");
            }
        };
        fetUserDetails();
    }, [email, setValue]);


    const handleUpdate = async (data: User ) => {
        if (!data.password) {
            data.password = defaultPassword;
            data.confirmPassword = defaultPassword;
        }
        console.log(data)

        const validation = SignupSchema.safeParse(data);
        console.log(validation);

        if (!validation.success) {
            console.log(validation.error.errors);
            setErrors(validation.error.errors[0]?.message || "Invalid input");
            return;
        }

        setLoading(true);
        try {
            await updateUser(data);
            reset();
            setProfileImage(data.profilePicture || null);
            navigate(`/adminProfile`)
        } catch (error: unknown) {
            console.log(error);
            setErrors("Error occurred while updating the bus details");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleUpdate)}>
            <div className="w-full mt-32 mb-16 flex">
                <div className="w-1/3 rounded-lg bg-white border-r border-gray-300 flex flex-col items-center justify-center">
                    <ImageUploader
                        height="300px"
                        width="300px"
                        borderRadius="50%"
                        borderColor="1px solid gray"
                        initialImage={profileImage || undefined}
                        disabled={loading}
                        onImageUpload={(imageUrl) => {
                            console.log("Image uploaded:", imageUrl);
                            setProfileImage(imageUrl);
                            setValue("profilePicture", imageUrl);
                        }}
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
                                    placeholder="Username"
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

                        <div className="w-full flex justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-carnation-400 mt-2">
                                Password
                            </label>
                            <div className="w-2/3">
                                <InputField
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    {...register("password")}
                                    icon={undefined}
                                    label={false}
                                    labelName="password"
                                />
                            </div>
                        </div>

                        <div className="w-full flex justify-between">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-carnation-400 mt-2">
                                Confirm Password
                            </label>
                            <div className="w-2/3">
                                <InputField
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    {...register("confirmPassword")}
                                    icon={undefined}
                                    label={false}
                                    labelName="confirmPassword"
                                />
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-between gap-4 mt-8 mb-4">
                        <CustomButton
                            type="submit"
                            buttonLabel="Save"
                            buttonClassName={`w-1/2 text-white bg-gray-400 bg-red-200 rounded-lg h-10 text-red-800 hover:bg-red-300 cursor-pointer`}
                            disabled={loading}
                        />
                        <CustomButton
                            type="button"
                            buttonLabel="Cancel"
                            buttonClassName="w-1/2 text-white bg-red-200 rounded-lg h-10 text-red-800 hover:bg-red-300 cursor-pointer"
                            disabled={loading}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default EditAdminProfileForm;
