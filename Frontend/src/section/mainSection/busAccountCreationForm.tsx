import CustomButton from "@/components/Button/CustomButton.tsx";
import InputField from "@/components/InputField/InputField.tsx";
import React, {FormEvent, useEffect, useState} from "react";
import { registerBus } from "@/api/busAPI.ts";
import { BusRegisterSchema } from "@/schema/busSchema.ts";
import ImageUploader from "@/components/ImageUploader/ImageUpload.tsx";
import {parseJwt} from "@/utils/functions/parseJWT.ts";
import {Bus} from "@/types/bus.ts";
import {uploadToCloudinary} from "@/utils/functions/fileUpload.ts";
import { FaBus, FaRoute, FaUsers, FaMoneyBillWave, FaBuilding, FaMapMarkedAlt, FaCamera, FaCloudUploadAlt, FaShieldAlt, FaCheckCircle } from "react-icons/fa";

const BusAccountCreationForm = () => {
    const [formData, setFormData] = useState<Bus>({
        ownerId: '',
        regNo: '',
        fleetName: '',
        routeNo: '',
        route: '',
        seatingCapacity: 0,
        busFare: 0,
        password: '',
        confirmPassword: '',
        profilePicture: '',
    });

    const [errors, setErrors] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [resetImage, setResetImage] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const decodedToken = parseJwt(token);
                setFormData((prev) => ({
                    ...prev,
                    ownerId: decodedToken.id.toString(),
                }));
            } catch (error) {
                console.error("Error decoding token", error);
            }
        } else {
            console.error("No access token found in localStorage");
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, value: keyof Bus) => {
        setFormData({
            ...formData,
            [value]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
        });
        // Clear errors when user starts typing
        if (errors) setErrors(null);
    };

    const handleImageUpload = async (file: File) => {
        const localUrl = URL.createObjectURL(file);
        setPreviewImage(localUrl);

        try {
            const imageUrl = await uploadToCloudinary(file);
            setFormData((prevData) => ({
                ...prevData,
                profilePicture: imageUrl,
            }));
        } catch (error) {
            setErrors("Image upload failed. Please try again.");
        }
    };

    const handleCreateBusAccount = async (e: FormEvent) => {
        e.preventDefault();

        const validation = BusRegisterSchema.safeParse(formData);

        if (!validation.success) {
            setErrors(validation.error.errors[0]?.message || "Invalid input");
            return;
        }

        setLoading(true);
        setErrors(null);

        try {
            await registerBus(formData);
            
            // Reset form
            setFormData({
                ownerId: formData.ownerId, // Keep ownerId
                regNo: '',
                fleetName: '',
                routeNo: '',
                route: '',
                seatingCapacity: 0,
                busFare: 0,
                password: '',
                confirmPassword: '',
                profilePicture: '',
            });

            setPreviewImage(null);
            setResetImage(true);
            setTimeout(() => setResetImage(false), 100);
            
            // Show success message
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);

        } catch (error: unknown) {
            console.log(error);
            setErrors("An error occurred while creating the account. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Creating bus account...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="mb-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Bus Account</h1>
                    <p className="text-gray-600 text-lg">Register a new bus in the X-Bus network</p>
                </div>
            </div>

            {/* Success Message */}
            {success && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                        <FaCheckCircle className="text-green-600 text-xl" />
                        <div>
                            <h3 className="text-green-800 font-semibold">Account Created Successfully!</h3>
                            <p className="text-green-700 text-sm">Your bus account has been registered in the system.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    {/* Left Section - Image */}
                    <div className="lg:w-1/3 bg-gradient-to-br from-red-50 to-red-100 p-8 flex flex-col items-center justify-center">
                        <div className="text-center mb-6">
                            <div className="relative inline-block">
                                <FaCamera className="text-6xl text-red-600 mx-auto mb-4" />
                                <div className="absolute -top-2 -right-2 bg-green-500 w-6 h-6 rounded-full flex items-center justify-center">
                                    <FaCloudUploadAlt className="text-white text-xs" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Bus Photo</h2>
                            <p className="text-gray-600">Upload a clear photo of your bus</p>
                        </div>
                        
                        <div className="w-full max-w-sm">
                            <ImageUploader
                                height="300px"
                                width="100%"
                                borderRadius="12px"
                                borderColor="2px solid #f3f4f6"
                                onImageUpload={handleImageUpload}
                                initialImage={previewImage}
                                reset={resetImage}
                            />
                        </div>

                        {/* Upload Tips */}
                        <div className="w-full max-w-sm mt-6">
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                                    <FaCloudUploadAlt className="text-red-600" />
                                    <span>Upload Tips</span>
                                </h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Use high-quality images</li>
                                    <li>• Recommended size: 500x500px</li>
                                    <li>• Supported formats: JPG, PNG</li>
                                    <li>• Max file size: 5MB</li>
                                </ul>
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

                        <form onSubmit={handleCreateBusAccount} className="space-y-6">
                            {/* Registration and Fleet */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                        <FaBus className="text-red-600" />
                                        <span>Bus Registration No.</span>
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <InputField
                                        id="regNo"
                                        type="text"
                                        placeholder="Enter bus registration number"
                                        value={formData.regNo || ''}
                                        onChange={(e) => handleInputChange(e, 'regNo')}
                                        label={false}
                                        labelName="regNo"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                        <FaBuilding className="text-red-600" />
                                        <span>Fleet Name</span>
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <InputField
                                        id="fleetName"
                                        type="text"
                                        placeholder="Enter fleet name"
                                        value={formData.fleetName || ''}
                                        onChange={(e) => handleInputChange(e, 'fleetName')}
                                        label={false}
                                        labelName="fleetName"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Route Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                        <FaRoute className="text-red-600" />
                                        <span>Route No</span>
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <InputField
                                        id="routeNo"
                                        type="text"
                                        placeholder="Enter route number"
                                        value={formData.routeNo || ''}
                                        onChange={(e) => handleInputChange(e, 'routeNo')}
                                        label={false}
                                        labelName="routeNo"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                        <FaMapMarkedAlt className="text-red-600" />
                                        <span>Route</span>
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <InputField
                                        id="route"
                                        type="text"
                                        placeholder="Enter route description"
                                        value={formData.route || ''}
                                        onChange={(e) => handleInputChange(e, 'route')}
                                        label={false}
                                        labelName="route"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Capacity and Fare */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                        <FaUsers className="text-red-600" />
                                        <span>Seating Capacity</span>
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <InputField
                                        id="seatingCapacity"
                                        type="number"
                                        placeholder="Enter seating capacity"
                                        value={formData.seatingCapacity.toString()}
                                        onChange={(e) => handleInputChange(e, 'seatingCapacity')}
                                        label={false}
                                        labelName="seatingCapacity"
                                        min={0}
                                        max={60}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                        <FaMoneyBillWave className="text-red-600" />
                                        <span>Bus Fare (LKR)</span>
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <InputField
                                        id="busFare"
                                        type="number"
                                        placeholder="Enter bus fare"
                                        value={formData.busFare.toString()}
                                        onChange={(e) => handleInputChange(e, 'busFare')}
                                        label={false}
                                        labelName="busFare"
                                        min={0}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Password Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                        <FaShieldAlt className="text-red-600" />
                                        <span>Password</span>
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <InputField
                                        id="password"
                                        type="password"
                                        placeholder="Enter password"
                                        value={formData.password || ''}
                                        onChange={(e) => handleInputChange(e, 'password')}
                                        label={false}
                                        labelName="password"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                        <FaShieldAlt className="text-red-600" />
                                        <span>Confirm Password</span>
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <InputField
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Confirm password"
                                        value={formData.confirmPassword || ''}
                                        onChange={(e) => handleInputChange(e, 'confirmPassword')}
                                        label={false}
                                        labelName="confirmPassword"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Password Requirements */}
                            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                                <p className="text-sm font-medium text-gray-700">Password Requirements:</p>
                                <ul className="text-xs text-gray-600 space-y-1">
                                    <li>• At least 8 characters long</li>
                                    <li>• Include uppercase and lowercase letters</li>
                                    <li>• Include at least one number</li>
                                    <li>• Include at least one special character</li>
                                </ul>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6 border-t border-gray-200">
                                <CustomButton
                                    type="submit"
                                    variant="primary"
                                    size="xl"
                                    buttonLabel="Create Bus Account"
                                    showIcon={true}
                                    icon={<FaBus />}
                                    disabled={loading}
                                    loading={loading}
                                    fullWidth={true}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusAccountCreationForm;
