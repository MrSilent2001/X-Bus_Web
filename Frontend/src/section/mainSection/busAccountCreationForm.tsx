import CustomButton from "@/components/Button/CustomButton.tsx";
import InputField from "@/components/InputField/InputField.tsx";
import React, { FormEvent, useState } from "react";
import { registerBus } from "@/api/busAPI.ts";
import { BusRegisterSchema } from "@/schema/busSchema.ts";
import ImageUploader from "@/components/ImageUploader/ImageUpload.tsx";

interface BusRegisterFormValues {
    regNo: string;
    fleetName: string;
    routeNo: string;
    route: string;
    seatingCapacity: number;
    busFare: number;
    password: string;
    confirmPassword: string;
}

const BusAccountCreationForm = () => {
    const [formData, setFormData] = useState<BusRegisterFormValues>({
        regNo: '',
        fleetName: '',
        routeNo: '',
        route: '',
        seatingCapacity: 0,
        busFare: 0,
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, value: keyof BusRegisterFormValues) => {
        setFormData({
            ...formData,
            [value]: e.target.value
        });
    };

    const handleCreateBusAccount = async (e: FormEvent) => {
        e.preventDefault();

        const validation = BusRegisterSchema.safeParse(formData);

        if (!validation.success) {
            setErrors(validation.error.errors[0]?.message || "Invalid input");
            return;
        }
        setLoading(true);
        try {
            await registerBus(formData);
            console.log("Route: ", formData.route, "Password: ", formData.password);
            setFormData({
                regNo: '',
                fleetName: '',
                routeNo: '',
                route: '',
                seatingCapacity: 0,
                busFare: 0,
                password: '',
                confirmPassword: ''
            });
        } catch (error: unknown) {
            console.log(error);
            setErrors("An error occurred while creating the account");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="w-full mt-32 mb-16 flex">
                <div className="w-1/3 rounded-lg bg-white border-r border-gray-300 flex flex-col items-center justify-center">
                    <ImageUploader height="300px" width="350px" />
                </div>
                <div className="w-2/3 p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
                    <form className="grid grid-cols-2 gap-4" onSubmit={handleCreateBusAccount}>
                        <div>
                            <label htmlFor="userName" className="block text-sm font-medium text-carnation-400">
                                Bus Reg. No.
                            </label>
                            <InputField
                                id="regNo"
                                type="text"
                                placeholder="Bus Registration No"
                                value={formData.regNo || ''}
                                onChange={(e) => handleInputChange(e, 'regNo')}
                                icon={undefined}
                                label={false}
                                labelName="regNo"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-carnation-400">
                                Fleet Name
                            </label>
                            <InputField
                                id="fleetName"
                                type="text"
                                placeholder="Fleet Name"
                                value={formData.fleetName || ''}
                                onChange={(e) => handleInputChange(e, 'fleetName')}
                                icon={undefined}
                                label={false}
                                labelName="fleetName"
                            />
                        </div>
                        <div>
                            <label htmlFor="contact" className="block text-sm font-medium text-carnation-400">
                                Route No
                            </label>
                            <InputField
                                id="routeNo"
                                type="text"
                                placeholder="Route No"
                                value={formData.routeNo || ''}
                                onChange={(e) => handleInputChange(e, 'routeNo')}
                                icon={undefined}
                                label={false}
                                labelName="routeNo"
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-carnation-400">
                                Route
                            </label>
                            <InputField
                                id="route"
                                type="text"
                                placeholder="Route"
                                value={formData.route || ''}
                                onChange={(e) => handleInputChange(e, 'route')}
                                icon={undefined}
                                label={false}
                                labelName="route"
                            />
                        </div>
                        <div>
                            <label htmlFor="district" className="block text-sm font-medium text-carnation-400">
                                Seating Capacity
                            </label>
                            <InputField
                                id="seatingCapacity"
                                type="number"
                                placeholder="Seating Capacity"
                                value={formData.seatingCapacity.toString()}
                                onChange={(e) => handleInputChange(e, 'seatingCapacity')}
                                icon={undefined}
                                label={false}
                                labelName="seatingCapacity"
                                min={0}
                                max={60}
                            />
                        </div>
                        <div>
                            <label htmlFor="district" className="block text-sm font-medium text-carnation-400">
                                Bus Fare(LKR)
                            </label>
                            <InputField
                                id="busFare"
                                type="number"
                                placeholder="Bus Fare"
                                value={formData.busFare.toString()}
                                onChange={(e) => handleInputChange(e, 'busFare')}
                                icon={undefined}
                                label={false}
                                labelName="busFare"
                                min={0}
                            />
                        </div>
                        <div>
                            <label htmlFor="district" className="block text-sm font-medium text-carnation-400">
                                Password
                            </label>
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
                        <div>
                            <label htmlFor="district" className="block text-sm font-medium text-carnation-400">
                                Confirm Password
                            </label>
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
                    </form>

                    {errors && (
                        <div className="text-red-500 mt-4">{errors}</div>
                    )}

                    <div className="mt-8 mb-4">
                        {loading ? (
                            <div className="w-full text-center text-gray-500">Loading...</div>
                        ) : (
                            <CustomButton
                                buttonLabel={"Create New Account"}
                                buttonClassName="w-full text-white bg-gradient-to-r from-red-200 to-red-200 rounded-lg h-10 text-red-800 transition-all duration-300 transform hover:bg-gradient-to-r hover:from-red-300 hover:to-red-300 cursor-pointer"
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BusAccountCreationForm;
