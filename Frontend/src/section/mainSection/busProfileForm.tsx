import CustomButton from "@/components/Button/CustomButton.tsx";
import InputField from "@/components/InputField/InputField.tsx";
import {useEffect, useState} from "react";
import {getBusByRegNo} from "@/api/busAPI.ts";
import ImageUploader from "@/components/ImageUploader/ImageUpload.tsx";
import {Bus} from "@/types/bus.ts";
import {useParams, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import { FaBus, FaRoute, FaUsers, FaMoneyBillWave, FaEdit, FaArrowLeft, FaBuilding, FaMapMarkedAlt } from "react-icons/fa";

const BusProfileForm = () => {
    const {regNo} = useParams();
    const navigate = useNavigate();

    // Initialize React Hook Form
    const {register, setValue, watch} = useForm<Bus & { profilePicture?: string }>({
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
    const seatingCapacity = watch("seatingCapacity");
    const busFare = watch("busFare");

    const [errors, setErrors] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchBusDetails = async () => {
            setLoading(true);
            try {
                if (regNo) {
                    const response = await getBusByRegNo(regNo);
                    console.log(response);
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
                setErrors("Failed to load bus details. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchBusDetails();
    }, [regNo, setValue]);

    const handleSubmit = () => {
        navigate(`/editBusProfile/${regNo}`)
    }

    const handleBack = () => {
        navigate(-1);
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading bus profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Bus Profile</h1>
                    <p className="text-gray-600 text-lg">View and manage bus information</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    {/* Left Section - Image */}
                    <div className="lg:w-1/3 bg-gradient-to-br from-red-50 to-red-100 p-8 flex flex-col items-center justify-center">
                        <div className="text-center mb-6">
                            <FaBus className="text-6xl text-red-600 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Bus Details</h2>
                            <p className="text-gray-600">Registration: {regNo}</p>
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

                        {/* Quick Stats */}
                        <div className="w-full max-w-sm mt-6 space-y-3">
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <FaUsers className="text-red-600 text-xl" />
                                    <div>
                                        <p className="text-sm text-gray-500">Seating Capacity</p>
                                        <p className="text-lg font-semibold text-gray-900">{seatingCapacity} Seats</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <FaMoneyBillWave className="text-red-600 text-xl" />
                                    <div>
                                        <p className="text-sm text-gray-500">Fare</p>
                                        <p className="text-lg font-semibold text-gray-900">Rs. {busFare}</p>
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
                                        icon={undefined}
                                        label={false}
                                        labelName="regNo"
                                        disabled={true}
                                    />
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
                                        icon={undefined}
                                        label={false}
                                        labelName="fleetName"
                                        disabled={true}
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
                                        icon={undefined}
                                        label={false}
                                        labelName="routeNo"
                                        disabled={true}
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
                                        icon={undefined}
                                        label={false}
                                        labelName="route"
                                        disabled={true}
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
                                        {...register("seatingCapacity")}
                                        icon={undefined}
                                        label={false}
                                        labelName="seatingCapacity"
                                        disabled={true}
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
                                        {...register("busFare")}
                                        icon={undefined}
                                        label={false}
                                        labelName="busFare"
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <CustomButton
                                type="button"
                                variant="primary"
                                size="xl"
                                buttonLabel="Edit Bus Profile"
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

export default BusProfileForm;