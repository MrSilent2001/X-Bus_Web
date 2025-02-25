import ImageUploader from "@/components/ImageUploader/ImageUpload.tsx";
import InputField from "@/components/InputField/InputField.tsx";
import CustomButton from "@/components/Button/CustomButton.tsx";
import React, {FormEvent, useState} from "react";
import {BusRegisterSchema} from "@/schema/busSchema.ts";
import {userSignUp} from "@/api/authAPI.ts";

interface BusRegisterFormValues {
    username: string;
    email: string;
    nic: string;
    contactNo: string;
    age: number;
    password: string;
    confirmPassword: string;
}

const AdminProfileForm = () => {
    const [formData, setFormData] = useState<BusRegisterFormValues>({
        username: '',
        email: '',
        nic: '',
        contactNo: '',
        age: 0,
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, value: keyof BusRegisterFormValues) => {
        setFormData({
            ...formData,
            [value]: e.target.value
        });
    }

    const handleCreateBusAccount = async (e: FormEvent) => {
        e.preventDefault();

        const validation = BusRegisterSchema.safeParse(formData);

        if (!validation.success) {
            setErrors(validation.error.errors[0]?.message || "Invalid input");
            return;
        }

        try {
            await userSignUp(formData);
            console.log("Username: ", formData.username, "Password: ", formData.password);
            setFormData({
                username: '',
                email: '',
                nic: '',
                contactNo: '',
                age: 0,
                password: '',
                confirmPassword: ''
            });
        } catch (error: unknown) {
            console.log(error);
            setErrors("Invalid input");
        }
    }

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    }

    const handleSave = () => {
        setIsEditing(!isEditing);
    }

    const handleCancel = () => {
        setIsEditing(!isEditing);
    }

    const handleImageUpload = (image: string) => {
        setProfileImage(image);
    }

    return(
        <>
            <div className="w-full mt-32 mb-16 flex">
                <div
                    className="w-1/3 rounded-lg bg-white border-r border-gray-300 flex flex-col items-center justify-center">
                    {isEditing ? (
                        <ImageUploader
                            height="300px"
                            width="300px"
                            borderRadius="50%"
                            onImageUpload={handleImageUpload}
                        />
                    ) : (

                        profileImage ? (
                            <img
                                src={profileImage}
                                alt="Profile Image"
                                className="w-72 h-72 rounded-full object-cover"
                            />
                        ) : (

                            <div className="w-72 h-72 rounded-full bg-gray-300 flex items-center justify-center text-white">
                                No Image
                            </div>
                        )
                    )}
                </div>

                <div className="w-2/3 p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">

                    <form className="grid gap-4" onSubmit={handleCreateBusAccount}>
                        <div className="w-full flex justify-between">
                            <label htmlFor="username" className="block text-sm font-medium text-carnation-400 mt-2">
                                UserName
                            </label>
                            <div className="w-2/3">
                                <InputField
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                    value={formData.username || ''}
                                    onChange={(e) => handleInputChange(e, 'username')}
                                    icon={undefined}
                                    label={false}
                                    labelName="username"
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
                                    value={formData.email || ''}
                                    onChange={(e) => handleInputChange(e, 'email')}
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
                                    value={formData.nic || ''}
                                    onChange={(e) => handleInputChange(e, 'nic')}
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
                                    value={formData.contactNo || ''}
                                    onChange={(e) => handleInputChange(e, 'contactNo')}
                                    icon={undefined}
                                    label={false}
                                    labelName="contactNo"
                                />
                            </div>
                        </div>

                        <div className="w-full flex justify-between">
                            <label htmlFor="age" className="block text-sm font-medium text-carnation-400 mt-2">
                                Age
                            </label>
                            <div className="w-2/3">
                                <InputField
                                    id="age"
                                    type="number"
                                    placeholder="Age"
                                    value={formData.age.toString()}
                                    onChange={(e) => handleInputChange(e, 'age')}
                                    icon={undefined}
                                    label={false}
                                    labelName="age"
                                    min={0}
                                    max={120}
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
                                    value={formData.password || ''}
                                    onChange={(e) => handleInputChange(e, 'password')}
                                    icon={undefined}
                                    label={false}
                                    labelName="password"
                                />
                            </div>
                        </div>

                        {isEditing && (
                            <>
                                <div className="w-full flex justify-between">
                                    <label htmlFor="confirmPassword"
                                           className="block text-sm font-medium text-carnation-400 mt-2">
                                        Confirm Password
                                    </label>
                                    <div className="w-2/3">
                                        <InputField
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={formData.confirmPassword || ''}
                                            onChange={(e) => handleInputChange(e, 'confirmPassword')}
                                            icon={undefined}
                                            label={false}
                                            labelName="confirmPassword"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between gap-4 mt-8 mb-4">
                                    <CustomButton
                                        onClick={handleSave}
                                        buttonLabel={"Save"}
                                        buttonClassName="w-full text-white bg-gradient-to-r from-red-200 to-red-200 rounded-lg h-10 text-red-800 transition-all duration-300 transform hover:bg-gradient-to-r hover:from-red-300 hover:to-red-300 cursor-pointer"
                                    />
                                    <CustomButton
                                        onClick={handleCancel}
                                        buttonLabel={"Cancel"}
                                        buttonClassName="w-full text-white bg-gradient-to-r from-red-200 to-red-200 rounded-lg h-10 text-red-800 transition-all duration-300 transform hover:bg-gradient-to-r hover:from-red-300 hover:to-red-300 cursor-pointer"
                                    />
                                </div>
                            </>
                        )}
                    </form>

                    {/* Error Message */}
                    {errors && <p className="text-red-500 text-center mt-4">{errors}</p>}

                    {!isEditing && (
                        <div className="mt-8 mb-4">
                            <CustomButton
                                buttonLabel={"Edit Profile"}
                                buttonClassName="w-full text-white bg-gradient-to-r from-red-200 to-red-200 rounded-lg h-10 text-red-800 transition-all duration-300 transform hover:bg-gradient-to-r hover:from-red-300 hover:to-red-300 cursor-pointer"
                                onClick={toggleEditMode}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default AdminProfileForm;
