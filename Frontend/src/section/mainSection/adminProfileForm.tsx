import ImageUploader from "@/components/ImageUploader/ImageUpload.tsx";
import InputField from "@/components/InputField/InputField.tsx";
import CustomButton from "@/components/Button/CustomButton.tsx";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {getUserByEmail} from "@/api/userAPI.ts";
import {useNavigate} from "react-router-dom";
import {User} from "@/types/user.ts";
import { FaUser, FaEnvelope, FaIdCard, FaPhone, FaEdit, FaArrowLeft } from "react-icons/fa";
import {useAuth} from "@/context/authContext.tsx";

const AdminProfileForm = () => {
    const {user} = useAuth();
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
    const [loading, setLoading] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true);
            try {
                if (user) {
                    const response = await getUserByEmail(user?.email || '');
                    
                    if (response && response.data) {
                        const userData = response.data;
                        
                        // Map backend response to form fields
                        setValue("name", userData.username || userData.name || '');
                        setValue("email", userData.email || '');
                        setValue("nic", userData.nic || '');
                        setValue("contactNo", userData.contactNo || '-');
                        setValue("profilePicture", userData.profilePicture || '');

                        setProfileImage(userData.profilePicture || null);
                    } else {
                        console.log("No user data found in AdminProfile response");
                        setErrors("No user data found. Please try again.");
                    }
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
                setErrors("Failed to load user details. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchUserDetails();
    }, [user, setValue]);

    const handleSubmit = () => {
        navigate(`/editAdminProfile`)
    }

    const handleBack = () => {
        navigate(-1);
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex items-center space-x-4 mb-6">
                    <CustomButton
                        type="button"
                        variant="ghost"
                        size="sm"
                        buttonLabel="Back"
                        showIcon={true}
                        icon={<FaArrowLeft className="text-lg" />}
                        onClick={handleBack}
                        buttonClassName="text-gray-600 hover:text-red-600"
                    />
                </div>
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Profile</h1>
                    <p className="text-gray-600 text-lg">View and manage your account information</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    {/* Left Section - Image */}
                    <div className="lg:w-1/3 bg-gradient-to-br from-red-50 to-red-100 p-8 flex flex-col items-center justify-center">
                        <div className="text-center mb-6">
                            <FaUser className="text-6xl text-red-600 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Picture</h2>
                            <p className="text-gray-600">Your account photo</p>
                        </div>
                        
                        <div className="w-full max-w-sm">
                            <ImageUploader
                                height="300px"
                                width="100%"
                                borderRadius="12px"
                                borderColor="2px solid #f3f4f6"
                                initialImage={profileImage || undefined}
                                disabled={true}
                            />
                        </div>

                        {/* Account Info */}
                        <div className="w-full max-w-sm mt-6 space-y-3">
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <FaEnvelope className="text-red-600 text-xl" />
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="text-lg font-semibold text-gray-900">{user?.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <FaUser className="text-red-600 text-xl" />
                                    <div>
                                        <p className="text-sm text-gray-500">Role</p>
                                        <p className="text-lg font-semibold text-gray-900">Administrator</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Form */}
                    <div className="lg:w-2/3 p-8">
                        {errors && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg">⚠</span>
                                    <span>{errors}</span>
                                </div>
                            </div>
                        )}

                        <div className="space-y-6">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                    <FaUser className="text-red-600" />
                                    <span>Full Name</span>
                                </label>
                                <InputField
                                    id="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    {...register("name")}
                                    icon={undefined}
                                    label={false}
                                    labelName="name"
                                    disabled={true}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                    <FaEnvelope className="text-red-600" />
                                    <span>Email Address</span>
                                </label>
                                <InputField
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    {...register("email")}
                                    icon={undefined}
                                    label={false}
                                    labelName="email"
                                    disabled={true}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                />
                            </div>

                            {/* NIC Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                    <FaIdCard className="text-red-600" />
                                    <span>NIC Number</span>
                                </label>
                                <InputField
                                    id="nic"
                                    type="text"
                                    placeholder="Enter your NIC number"
                                    {...register("nic")}
                                    icon={undefined}
                                    label={false}
                                    labelName="nic"
                                    disabled={true}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                />
                            </div>

                            {/* Contact Number Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                    <FaPhone className="text-red-600" />
                                    <span>Contact Number</span>
                                </label>
                                <InputField
                                    id="contactNo"
                                    type="text"
                                    placeholder="Enter your contact number"
                                    {...register("contactNo")}
                                    icon={undefined}
                                    label={false}
                                    labelName="contactNo"
                                    disabled={true}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <CustomButton
                                type="button"
                                variant="primary"
                                size="xl"
                                buttonLabel="Edit Profile"
                                showIcon={true}
                                icon={<FaEdit />}
                                onClick={handleSubmit}
                                fullWidth={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProfileForm;
