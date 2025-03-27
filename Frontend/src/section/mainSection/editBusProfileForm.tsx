import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useForm } from "react-hook-form";
import {getBusById, updateBus} from "@/api/busAPI.ts";
import { BusUpdateSchema } from "@/schema/busSchema.ts";
import InputField from "@/components/InputField/InputField.tsx";
import CustomButton from "@/components/Button/CustomButton.tsx";
import ImageUploader from "@/components/ImageUploader/ImageUpload.tsx";
import { Bus } from "@/types/bus.ts";

const EditBusProfileForm = () => {
    const { regNo } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<Bus & { profilePicture?: string }>({
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

    useEffect(() => {
        const fetchBusDetails = async () => {
            try {
                if (regNo) {
                    const response = await getBusById(regNo);
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

    return (
        <form onSubmit={handleSubmit(handleUpdate)}>
            <div className="w-full mt-32 mb-16 flex">
                <div className="w-1/3 rounded-lg bg-white border-r border-gray-300 flex flex-col items-center justify-center">
                    <ImageUploader
                        height="300px"
                        width="350px"
                        borderRadius="3%"
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
                            {formErrors}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="regNo" className="block text-sm font-medium text-carnation-400">
                                Bus Reg. No.
                            </label>
                            <InputField
                                id="regNo"
                                type="text"
                                placeholder="Bus Registration No"
                                {...register("regNo")}
                                disabled={true}
                            />
                        </div>
                        <div>
                            <label htmlFor="fleetName" className="block text-sm font-medium text-carnation-400">
                                Fleet Name
                            </label>
                            <InputField
                                id="fleetName"
                                type="text"
                                placeholder="Fleet Name"
                                {...register("fleetName")}
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label htmlFor="routeNo" className="block text-sm font-medium text-carnation-400">
                                Route No
                            </label>
                            <InputField
                                id="routeNo"
                                type="text"
                                placeholder="Route No"
                                {...register("routeNo")}
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label htmlFor="route" className="block text-sm font-medium text-carnation-400">
                                Route
                            </label>
                            <InputField
                                id="route"
                                type="text"
                                placeholder="Route"
                                {...register("route")}
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label htmlFor="seatingCapacity" className="block text-sm font-medium text-carnation-400">
                                Seating Capacity
                            </label>
                            <InputField
                                id="seatingCapacity"
                                type="number"
                                placeholder="Seating Capacity"
                                {...register("seatingCapacity", { valueAsNumber: true })}
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label htmlFor="busFare" className="block text-sm font-medium text-carnation-400">
                                Bus Fare(LKR)
                            </label>
                            <InputField
                                id="busFare"
                                type="number"
                                placeholder="Bus Fare"
                                {...register("busFare", { valueAsNumber: true })}
                                disabled={loading}
                            />
                        </div>
                        <div>
                            {/*<label htmlFor="password" className="block text-sm font-medium text-carnation-400">*/}
                            {/*    Password*/}
                            {/*</label>*/}
                            <InputField
                                id="password"
                                type="hidden"
                                placeholder="Password"
                                {...register("password")}
                                disabled={loading}
                            />
                        </div>
                        <div>
                            {/*<label htmlFor="confirmPassword" className="block text-sm font-medium text-carnation-400">*/}
                            {/*    Confirm Password*/}
                            {/*</label>*/}
                            <InputField
                                id="confirmPassword"
                                type="hidden"
                                placeholder="Confirm Password"
                                {...register("confirmPassword")}
                                disabled={loading}
                            />
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

export default EditBusProfileForm;
