import React, { useState } from "react";
import {Controller, useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputField from "@/components/InputField/InputField";
import CustomButton from "@/components/Button/CustomButton";
import CustomAlert from "@/components/Alert/CustomAlert";
import Navbar from "@/components/TopNavbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { uploadFileToCloudinaryAuto } from "@/utils/functions/fileUpload";
import { submitBusRegistrationRequest } from "@/api/busAPI";
import Dropdown from "@/components/Dropdown/dropdown.tsx";
import {BusRegistrationFormData} from "@/types/bus.ts";

const BusRegistrationRequests: React.FC = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<BusRegistrationFormData>();

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertVariant, setAlertVariant] = useState<
        "success" | "error" | "info" | "warning"
    >("info");
    const [alertMessage, setAlertMessage] = useState(" ");

    const onSubmit = async (data: BusRegistrationFormData) => {
        try {
            const file = data.proof?.[0];
            if (!file) throw new Error("Proof letter file is missing");

            const url = await uploadFileToCloudinaryAuto(file);

            await submitBusRegistrationRequest({
                ownerName: data.ownerName,
                email: data.email,
                contactNo: data.contactNo,
                age: Number(data.age),
                gender: data.gender,
                busRegNo: data.busRegNo,
                type: data.type,
                manufacturedYear: Number(data.manufacturedYear),
                chassisNo: data.chassisNo,
                proof: url,
            });

            setAlertVariant("success");
            setAlertMessage(
                "Your bus registration request has been sent successfully."
            );
            setAlertOpen(true);

            setTimeout(() => {
                setAlertOpen(false);
                navigate("/");
            }, 1500);

            reset();
        } catch (err) {
            setAlertVariant("error");
            setAlertMessage("Failed to submit request. Please try again.");
            setAlertOpen(true);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="pt-24 pb-10 px-6">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Bus Registration Request
                    </h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        {/* Owner Details */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Owner Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputField
                                        id="ownerName"
                                        type="text"
                                        placeholder="Owner's Name"
                                        label
                                        labelName="Owner's Name"
                                        register={register("ownerName", {
                                            required: "Owner name is required",
                                        })}
                                    />
                                    {errors.ownerName && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors.ownerName.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <InputField
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        label
                                        labelName="Email"
                                        register={register("email", {
                                            required: "Email is required",
                                        })}
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <InputField
                                        id="contact"
                                        type="text"
                                        placeholder="Contact Number"
                                        label
                                        labelName="Contact Number"
                                        register={register("contactNo", {
                                            required: "Contact is required",
                                        })}
                                    />
                                    {errors.contactNo && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors.contactNo.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <InputField
                                        id="age"
                                        type="number"
                                        placeholder="Age"
                                        label
                                        labelName="Age"
                                        register={register("age", {
                                            required: "Age is required",
                                            valueAsNumber: true,
                                        })}
                                    />
                                    {errors.age && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors.age.message}
                                        </p>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Gender
                                    </label>
                                    <Controller
                                        control={control}
                                        name="gender"
                                        rules={{ required: "Gender is required" }}
                                        render={({ field }) => (
                                            <Dropdown
                                                options={[
                                                    { label: "Male", value: "male" },
                                                    { label: "Female", value: "female" },
                                                    { label: "Other", value: "other" }
                                                ]}
                                                width="100%"
                                                placeholder="Select gender"
                                                value={field.value || ""}
                                                onChange={(val) => field.onChange(val)}
                                            />
                                        )}
                                    />
                                    {errors.gender && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors.gender.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Bus Details */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Bus Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputField
                                        id="regNo"
                                        type="text"
                                        placeholder="Registration Number"
                                        label
                                        labelName="Registration Number"
                                        uppercase
                                        register={register("busRegNo", {
                                            required: "Registration number is required",
                                        })}
                                    />
                                    {errors.busRegNo && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors.busRegNo.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <InputField
                                        id="busType"
                                        type="text"
                                        placeholder="Bus Type"
                                        label
                                        labelName="Bus Type"
                                        register={register("type", {
                                            required: "Bus type is required",
                                        })}
                                    />
                                    {errors.type && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors.type.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <InputField
                                        id="manufactureYear"
                                        type="number"
                                        placeholder="Manufacture Year"
                                        label
                                        labelName="Manufacture Year"
                                        register={register("manufacturedYear", {
                                            required: "Manufacture year is required",
                                            valueAsNumber: true,
                                        })}
                                    />
                                    {errors.manufacturedYear && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors.manufacturedYear.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <InputField
                                        id="chassisNo"
                                        type="text"
                                        placeholder="Chassis Number"
                                        label
                                        labelName="Chassis Number"
                                        register={register("chassisNo", {
                                            required: "Chassis number is required",
                                        })}
                                    />
                                    {errors.chassisNo && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors.chassisNo.message}
                                        </p>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        NTC Proof Letter
                                    </label>
                                    <input
                                        id="proofLetter"
                                        type="file"
                                        accept="application/pdf,image/*"
                                        className="block w-full h-10 py-2 px-3 text-sm text-black border rounded-md border-gray-400 focus:outline-none focus:ring-gray-700 focus:border-carnation-300 bg-white"
                                        {...register("proof", {
                                            required: "Proof letter is required",
                                        })}
                                    />
                                    {errors.proof && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors.proof.message as string}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <CustomButton
                                type="button"
                                onClick={() => navigate("/")}
                                buttonLabel="Cancel"
                                variant="outline"
                                buttonClassName="h-10 w-40 px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                            />
                            <CustomButton
                                type="submit"
                                buttonLabel={isSubmitting ? "Submitting..." : "Submit Request"}
                                variant="primary"
                                buttonClassName="h-10 w-40 px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                            />
                        </div>
                    </form>
                </div>
            </div>

            <Footer />

            <CustomAlert
                isOpen={alertOpen}
                title={alertVariant === "success" ? "Submitted" : "Error"}
                message={alertMessage}
                variant={alertVariant}
                autoCloseMs={alertVariant === "success" ? 1500 : undefined}
                onClose={() => setAlertOpen(false)}
            />
        </div>
    );
};

export default BusRegistrationRequests;