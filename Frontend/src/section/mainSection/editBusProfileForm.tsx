import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useForm } from "react-hook-form";
import {getBusByRegNo, updateBus} from "@/api/busAPI.ts";
import { BusUpdateSchema } from "@/schema/busSchema.ts";
import InputField from "@/components/InputField/InputField.tsx";
import CustomButton from "@/components/Button/CustomButton.tsx";
import ImageUploader from "@/components/ImageUploader/ImageUpload.tsx";
import { Bus } from "@/types/bus.ts";
import {uploadToCloudinary} from "@/utils/functions/fileUpload.ts";
import { FaBus, FaRoute, FaUsers, FaMoneyBillWave, FaSave, FaTimes, FaArrowLeft, FaCamera, FaBuilding, FaMapMarkedAlt, FaCloudUploadAlt } from "react-icons/fa";

const EditBusProfileForm = () => {
    const { regNo } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, setValue, reset } = useForm<Bus & { profilePicture?: string }>({
        defaultValues: {
            regNo: '',
            fleetName: '',
            routeNo: '',
            route: '',
            seatingCapacity: 0,
            busFare: 0,
            password: '',
            confirmPassword: '',
            profilePicture: undefined
        }
    });

    const [formErrors, setFormErrors] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<string | null >(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchBusDetails = async () => {
            setIsLoading(true);
            try {
                if (regNo) {
                    const response = await getBusByRegNo(regNo);
                    if (response) {
                        Object.entries(response).forEach(([key, value]) => {
                            if (key in response) {
                                setValue(key as keyof Bus, value as never);
                            }
                        });
                        setProfileImage(response.profilePicture || null);
                    }
                }
            } catch (error) {
                console.error("Error fetching bus details:", error);
                setFormErrors("Failed to load bus details. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchBusDetails();
    }, [regNo, setValue]);

    const handleUpdate = async (data: Bus ) => {
        const {id, ownerId, password, confirmPassword, ...busData} = data;
        console.log("Updated Data:", busData);
        const validation = BusUpdateSchema.safeParse(busData);
        console.log(validation);

        if (!validation.success) {
            setFormErrors(validation.error.errors[0]?.message || "Invalid input");
            return;
        }

        setLoading(true);
        try {
            await updateBus(data);
            reset();
            setProfileImage(data.profilePicture || null);
            navigate(`/BusProfile/${regNo}`)
        } catch (error: unknown) {
            console.log(error);
            setFormErrors("Error occurred while updating the bus details");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate(`/BusProfile/${regNo}`);
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading bus details...</p>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(handleUpdate)}>
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Bus Profile</h1>
                        <p className="text-gray-600 text-lg">Update bus information and settings</p>
                    </div>
                </div>

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
                                <p className="text-gray-600">Update bus profile picture</p>
                            </div>
                            
                            <div className="w-full max-w-sm">
                                <ImageUploader
                                    height="300px"
                                    width="100%"
                                    borderRadius="12px"
                                    borderColor="2px solid #f3f4f6"
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
                                            setFormErrors("Failed to upload image. Please try again.");
                                        }
                                    }}
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
                            {formErrors && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg">⚠</span>
                                        <span>{formErrors}</span>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-6">
                                {/* Registration and Fleet */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                            <FaBus className="text-red-600" />
                                            <span>Bus Registration No.</span>
                                        </label>
                                        <InputField
                                            id="regNo"
                                            type="text"
                                            placeholder="Bus Registration No"
                                            {...register("regNo")}
                                            disabled={true}
                                        />
                                        <p className="text-xs text-gray-500">Registration number cannot be changed</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                            <FaBuilding className="text-red-600" />
                                            <span>Fleet Name</span>
                                        </label>
                                        <InputField
                                            id="fleetName"
                                            type="text"
                                            placeholder="Fleet Name"
                                            {...register("fleetName")}
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                {/* Route Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                            <FaRoute className="text-red-600" />
                                            <span>Route No</span>
                                        </label>
                                        <InputField
                                            id="routeNo"
                                            type="text"
                                            placeholder="Route No"
                                            {...register("routeNo")}
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                            <FaMapMarkedAlt className="text-red-600" />
                                            <span>Route</span>
                                        </label>
                                        <InputField
                                            id="route"
                                            type="text"
                                            placeholder="Route"
                                            {...register("route")}
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                {/* Capacity and Fare */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                            <FaUsers className="text-red-600" />
                                            <span>Seating Capacity</span>
                                        </label>
                                        <InputField
                                            id="seatingCapacity"
                                            type="number"
                                            placeholder="Seating Capacity"
                                            {...register("seatingCapacity", { valueAsNumber: true })}
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                            <FaMoneyBillWave className="text-red-600" />
                                            <span>Bus Fare (LKR)</span>
                                        </label>
                                        <InputField
                                            id="busFare"
                                            type="number"
                                            placeholder="Bus Fare"
                                            {...register("busFare", { valueAsNumber: true })}
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                {/* Hidden Password Fields */}
                                <div className="hidden">
                                    <InputField
                                        id="password"
                                        type="hidden"
                                        placeholder="Password"
                                        {...register("password")}
                                        disabled={loading}
                                    />
                                    <InputField
                                        id="confirmPassword"
                                        type="hidden"
                                        placeholder="Confirm Password"
                                        {...register("confirmPassword")}
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
                                <CustomButton
                                    type="button"
                                    variant="secondary"
                                    size="lg"
                                    buttonLabel="Cancel"
                                    showIcon={true}
                                    icon={<FaTimes />}
                                    onClick={handleCancel}
                                    disabled={loading}
                                    fullWidth={true}
                                />
                                <CustomButton
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    buttonLabel="Save Changes"
                                    showIcon={true}
                                    icon={<FaSave />}
                                    disabled={loading}
                                    loading={loading}
                                    fullWidth={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default EditBusProfileForm;
