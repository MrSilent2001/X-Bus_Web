import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputField from "@/components/InputField/InputField.tsx";
import CustomButton from "@/components/Button/CustomButton.tsx";
import ImageUploader from "@/components/ImageUploader/ImageUpload.tsx";
import { getUserByEmail, updateUser } from "@/api/userAPI.ts";
import { UpdateUserSchema } from "@/schema/auth/UpdateUserSchema.ts";
import { User } from "@/types/user.ts";
import { FaUser, FaEnvelope, FaIdCard, FaPhone, FaLock, FaEye, FaTimes, FaSave } from "react-icons/fa";
import {useAuth} from "@/context/authContext.tsx";
import {uploadToCloudinary} from "@/utils/functions/fileUpload.ts";

const EditAdminProfileForm = () => {
    const {user} = useAuth();
    const navigate = useNavigate();

    // Initialize react-hook form
    const { register, setValue, handleSubmit, formState: { errors: formErrors } } = useForm<User>({
        defaultValues: {
            name: '',
            email: '',
            nic: '',
            contactNo: '',
            password: '',
            confirmPassword: '',
            profilePicture: ''
        }
    });

    const [errors, setErrors] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [dataLoading, setDataLoading] = useState<boolean>(true);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [defaultPassword, setDefaultPassword] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                setDataLoading(true);
                if (user) {
                    const response = await getUserByEmail(user?.email);
                    console.log("Form received response:", response);
                    
                    if (response && response.data) {
                        // Map backend response to form fields
                        const userData = response.data;
                        console.log("Setting form values with:", userData);
                        
                        setValue("name", userData.username || userData.name || '');
                        setValue("email", userData.email || '');
                        setValue("nic", userData.nic || '');
                        setValue("contactNo", userData.contactNo || '');
                        setValue("profilePicture", userData.profilePicture || '');

                        setProfileImage(userData.profilePicture || null);
                        setDefaultPassword(userData.password || '');
                    } else {
                        console.log("No user data found in response");
                        setErrors("No user data found. Please try again.");
                    }
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
                setErrors("Failed to load user details. Please try again.");
            } finally {
                setDataLoading(false);
            }
        };
        fetchUserDetails();
    }, [user, setValue]);

    const handleUpdate = async (data: User) => {
        // Only set default password if no new password is provided
        if (!data.password || data.password.trim() === '') {
            data.password = defaultPassword;
            data.confirmPassword = defaultPassword;
        }

        const validation = UpdateUserSchema.safeParse(data);

        if (!validation.success) {
            setErrors(validation.error.errors[0]?.message || "Invalid input");
            return;
        }

        setLoading(true);
        setErrors('');
        setSuccessMessage('');
        
        try {
            await updateUser(data);
            setSuccessMessage('Profile updated successfully!');
            setTimeout(() => {
                navigate(`/adminProfile`);
            }, 1500);
        } catch (error: unknown) {
            console.log(error);
            setErrors("Error occurred while updating the profile details");
        } finally {
            setLoading(false);
        }
    };

    if (dataLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading profile data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center space-x-4 mb-6">
                    <button
                        onClick={() => navigate('/adminProfile')}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Profile
                    </button>
                </div>
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Profile</h1>
                    <p className="text-gray-600 text-lg">Update your personal information and profile picture</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <form onSubmit={handleSubmit(handleUpdate)} className="p-6 lg:p-8">
                    {errors && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-800">{errors}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L13 8.586l-1.293 1.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-green-800">{successMessage}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Profile Picture Section */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-50 rounded-xl p-6 text-center">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h3>
                                <ImageUploader
                                    height="250px"
                                    width="250px"
                                    borderColor="2px dashed #d1d5db"
                                    initialImage={profileImage || undefined}
                                    disabled={loading}
                                    onImageUpload={async (file) => {
                                        try {
                                            const imageUrl = await uploadToCloudinary(file);
                                            console.log("Image uploaded:", imageUrl);
                                            setProfileImage(imageUrl);
                                            setValue("profilePicture", imageUrl);
                                        } catch (error) {
                                            console.error("Image upload failed", error);
                                            setErrors("Failed to upload image. Please try again.");
                                        }
                                    }}
                                />
                                <p className="text-sm text-gray-500 mt-3">
                                    Upload a clear photo of yourself
                                </p>
                            </div>
                        </div>

                        {/* Form Fields Section */}
                        <div className="lg:col-span-2">
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Username */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Username *
                                        </label>
                                        <InputField
                                            id="name"
                                            type="text"
                                            placeholder="Enter your username"
                                            {...register("name")}
                                            icon={<FaUser className="text-gray-400" />}
                                            label={false}
                                            labelName="name"
                                            className="w-full"
                                            disabled={dataLoading}
                                        />
                                        {formErrors.name && (
                                            <p className="mt-1 text-sm text-red-600">{formErrors.name.message}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <InputField
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            {...register("email")}
                                            icon={<FaEnvelope className="text-gray-400" />}
                                            label={false}
                                            labelName="email"
                                            className="w-full"
                                            disabled={dataLoading}
                                        />
                                        {formErrors.email && (
                                            <p className="mt-1 text-sm text-red-600">{formErrors.email.message}</p>
                                        )}
                                    </div>

                                    {/* NIC */}
                                    <div>
                                        <label htmlFor="nic" className="block text-sm font-medium text-gray-700 mb-2">
                                            NIC Number *
                                        </label>
                                        <InputField
                                            id="nic"
                                            type="text"
                                            placeholder="Enter your NIC"
                                            {...register("nic")}
                                            icon={<FaIdCard className="text-gray-400" />}
                                            label={false}
                                            labelName="nic"
                                            className="w-full"
                                            disabled={dataLoading}
                                        />
                                        {formErrors.nic && (
                                            <p className="mt-1 text-sm text-red-600">{formErrors.nic.message}</p>
                                        )}
                                    </div>

                                    {/* Contact Number */}
                                    <div>
                                        <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700 mb-2">
                                            Contact Number *
                                        </label>
                                        <InputField
                                            id="contactNo"
                                            type="tel"
                                            placeholder="Enter your contact number"
                                            {...register("contactNo")}
                                            icon={<FaPhone className="text-gray-400" />}
                                            label={false}
                                            labelName="contactNo"
                                            className="w-full"
                                            disabled={dataLoading}
                                        />
                                        {formErrors.contactNo && (
                                            <p className="mt-1 text-sm text-red-600">{formErrors.contactNo.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Password Section */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h4 className="text-md font-semibold text-gray-900 mb-4">Change Password (Optional)</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                                New Password
                                            </label>
                                            <InputField
                                                id="password"
                                                type="password"
                                                placeholder="Enter new password"
                                                {...register("password")}
                                                icon={<FaLock className="text-gray-400" />}
                                                label={false}
                                                labelName="password"
                                                className="w-full"
                                                disabled={dataLoading}
                                            />
                                            {formErrors.password && (
                                                <p className="mt-1 text-sm text-red-600">{formErrors.password.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                                Confirm Password
                                            </label>
                                            <InputField
                                                id="confirmPassword"
                                                type="password"
                                                placeholder="Confirm new password"
                                                {...register("confirmPassword")}
                                                icon={<FaEye className="text-gray-400" />}
                                                label={false}
                                                labelName="confirmPassword"
                                                className="w-full"
                                                disabled={dataLoading}
                                            />
                                            {formErrors.confirmPassword && (
                                                <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword.message}</p>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Leave password fields empty to keep your current password
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
                        <CustomButton
                            type="submit"
                            variant="primary"
                            size="lg"
                            buttonLabel={loading ? "Saving..." : "Save Changes"}
                            showIcon={true}
                            icon={<FaSave />}
                            disabled={loading}
                            fullWidth={true}
                        />
                        <CustomButton
                            type="button"
                            variant="secondary"
                            size="lg"
                            buttonLabel="Cancel"
                            showIcon={true}
                            icon={<FaTimes />}
                            disabled={loading}
                            onClick={() => navigate('/adminProfile')}
                            fullWidth={true}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAdminProfileForm;
