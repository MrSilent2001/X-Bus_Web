import CustomButton from "@/components/Button/CustomButton.tsx";
import InputField from "@/components/InputField/InputField.tsx";
import {useEffect, useState} from "react";
import {getBusByRegNo} from "@/api/busAPI.ts";
import ImageUploader from "@/components/ImageUploader/ImageUpload.tsx";
import {Bus} from "@/types/bus.ts";
import {useParams, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

const BusProfileForm = () => {
    const {regNo} = useParams();
    const navigate = useNavigate();

    // Initialize React Hook Form
    const {register, setValue} = useForm<Bus & { profilePicture?: string }>({
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

    const [errors, setErrors] = useState<string>('');
    // const [loading, setLoading] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchBusDetails = async () => {
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
                setErrors("Failed to load bus details. Please try again.");
            }
        };
        fetchBusDetails();
    }, [regNo, setValue]);

    const handleSubmit = () =>{
        navigate(`/editBusProfile/${regNo}`)
    }

    return (
        <>
            <div className="w-full mt-32 mb-16 flex">
                <div
                    className="w-1/3 rounded-lg bg-white border-r border-gray-300 flex flex-col items-center justify-center">

                    <ImageUploader
                        height="300px"
                        width="350px"
                        borderRadius="3%"
                        borderColor="1px solid gray"
                        initialImage={profileImage || undefined}
                        disabled={true}
                    />

                </div>
                <div className="w-2/3 p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
                    {errors && (
                        <div className="text-red-500 text-sm mb-4">
                            {errors}
                        </div>
                    )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="userName" className="block text-sm font-medium text-carnation-400">
                                    Bus Reg. No.
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
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-carnation-400">
                                    Fleet Name
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
                            <div>
                                <label htmlFor="contact" className="block text-sm font-medium text-carnation-400">
                                    Route No
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
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-carnation-400">
                                    Route
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
                            <div>
                                <label htmlFor="district" className="block text-sm font-medium text-carnation-400">
                                    Seating Capacity
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
                            <div>
                                <label htmlFor="district" className="block text-sm font-medium text-carnation-400">
                                    Bus Fare(LKR)
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

                        <div className="mt-8 mb-4">
                            <CustomButton
                                type="button"
                                buttonLabel={"Edit Bus Account"}
                                buttonClassName={`w-full text-white 'bg-gray-400 bg-gradient-to-r from-red-200 to-red-200 rounded-lg h-10 text-red-800 hover:bg-red-300 cursor-pointer`}
                                onClick={handleSubmit}
                            />
                        </div>
                </div>
            </div>
        </>
    );
}

export default BusProfileForm;

//${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-red-200 to-red-200'}