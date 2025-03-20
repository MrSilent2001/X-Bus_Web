import CustomButton from "@/components/Button/CustomButton.tsx";
import InputField from "@/components/InputField/InputField.tsx";
import React, {FormEvent, useEffect, useState} from "react";
import {getBusById, updateBus} from "@/api/busAPI.ts";
import {BusUpdateSchema} from "@/schema/busSchema.ts";
import ImageUploader from "@/components/ImageUploader/ImageUpload.tsx";
import {Bus} from "@/types/bus.ts";
import {useParams} from "react-router-dom";

const BusProfileForm = () => {
    const {regNo} = useParams();

    const [formData, setFormData] = useState<Bus>({
        regNo: '',
        fleetName: '',
        routeNo: '',
        route: '',
        seatingCapacity: 0,
        busFare: 0,
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    console.log(errors);

    useEffect(() => {
        const fetchBusDetails = async () => {
            try {
                if (regNo) {
                    const response = await getBusById(regNo);

                    if (response) {
                        setFormData({
                            regNo: response.regNo || '',
                            fleetName: response.fleetName || '',
                            routeNo: response.routeNo || '',
                            route: response.route || '',
                            seatingCapacity: Number(response.seatingCapacity) || 0,
                            busFare: Number(response.busFare) || 0,
                            password: '',
                            confirmPassword: ''
                        });

                        if (response.profilePicture) {
                            setProfileImage(response.profilePicture);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching bus details:", error);
            }
        };

        fetchBusDetails();
    }, [regNo]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, value: keyof Bus) => {
        const inputValue = e.target.value;

        setFormData({
            ...formData,
            [value]: value === 'seatingCapacity' || value === 'busFare' ? Number(inputValue) : inputValue
        });
    };

    const handleSave = async (e: FormEvent) => {
        e.preventDefault();

        console.log(formData)

        const validation = BusUpdateSchema.safeParse(formData);
        console.log(validation)

        if (!validation.success) {
            setErrors(validation.error.errors[0]?.message || "Invalid input");
            return ;
        }
        setLoading(true);
        try {
            await updateBus(formData);
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
            setErrors('');
            setIsEditing(!isEditing);
        } catch (error: unknown) {
            console.log(error);
            setErrors("Error occurred while registering the bus");
        } finally {
            setLoading(false);
        }
    }

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    }

    const handleCancel = () => {
        setIsEditing(!isEditing);
        setFormData({
            regNo: '',
            fleetName: '',
            routeNo: '',
            route: '',
            seatingCapacity: 0,
            busFare: 0,
            password: '',
            confirmPassword: '',
        });
    }

    const handleImageUpload = (image: string) => {
        setProfileImage(image);
    }

    return (
        <>
            <div className="w-full mt-32 mb-16 flex">
                <div
                    className="w-1/3 rounded-lg bg-white border-r border-gray-300 flex flex-col items-center justify-center">
                    {isEditing ? (
                        <ImageUploader
                            height="300px"
                            width="350px"
                            borderRadius="3%"
                            borderColor="1px solid gray"
                            onImageUpload={handleImageUpload}
                        />
                    ) : (
                        profileImage ? (
                            <img
                                src={profileImage}
                                alt="Profile Image"
                                className="w-[350px] h-[300px] object-cover"
                                style={{borderRadius: "3%", border: "1px solid gray"}}
                            />
                        ) : (
                            <div className="w-[350px] h-[300px] bg-gray-300 flex items-center justify-center text-white"
                                 style={{borderRadius: "3%", border: "1px solid gray"}}
                            >
                                No Image
                            </div>
                        )
                    )}
                </div>
                <div className="w-2/3 p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
                    {/*{errors && (*/}
                    {/*    <div className="text-red-500 text-sm mb-4">*/}
                    {/*        {errors}*/}
                    {/*    </div>*/}
                    {/*)}*/}

                    <form onSubmit={handleSave}>
                        <div className="grid grid-cols-2 gap-4" >
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
                                    value={formData.fleetName || ''}
                                    onChange={(e) => handleInputChange(e, 'fleetName')}
                                    icon={undefined}
                                    label={false}
                                    labelName="fleetName"
                                    disabled={!isEditing}
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
                                    disabled={!isEditing}
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
                                    disabled={!isEditing}
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
                                    disabled={!isEditing}
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
                                    disabled={!isEditing}
                                />
                            </div>

                            {isEditing && (
                                <>
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
                                            disabled={!isEditing}
                                        />
                                    </div>


                                    <div>
                                        <label htmlFor="confirmPassword"
                                               className="block text-sm font-medium text-carnation-400">
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
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        {isEditing ? (
                            <div className="flex justify-between gap-4 mt-8 mb-4">
                                <CustomButton
                                    onClick={handleSave}
                                    buttonLabel="Save"
                                    buttonClassName="w-1/2 text-white bg-red-200 rounded-lg h-10 text-red-800 hover:bg-red-300 cursor-pointer"
                                />
                                <CustomButton
                                    onClick={handleCancel}
                                    buttonLabel="Cancel"
                                    buttonClassName="w-1/2 text-white bg-red-200 rounded-lg h-10 text-red-800 hover:bg-red-300 cursor-pointer"
                                />
                            </div>
                        ) : (
                            <div className="mt-8 mb-4">
                                <CustomButton
                                    buttonLabel={loading ? "Saving..." : "Edit Bus Account"}
                                    buttonClassName={`w-full text-white ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-red-200 to-red-200'} rounded-lg h-10 text-red-800 hover:bg-red-300 cursor-pointer`}
                                    onClick={toggleEditMode}
                                    disabled={loading}
                                />
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

export default BusProfileForm;
