import {useEffect, useState} from "react";
import {resetPassword} from "@/api/authAPI.ts";
import InputField from "@/components/InputField/InputField.tsx";
import CustomButton from "@/components/Button/CustomButton.tsx";
import {useNavigate} from "react-router-dom";
import AuthImg from "../../assets/images/authImage.png";
import {ResetPasswordSchema} from "@/schema/auth/ResetPasswordSchema.ts";
import { useForm } from "react-hook-form";

interface ResetPasswordFormValues {
    password: string;
    confirmPassword: string;
}

const ResetPasswordForm = () =>{
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ResetPasswordFormValues>({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const [serverErrors, setServerErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(()=>{
        const userEmail = localStorage.getItem("userEmail");
        setEmail(userEmail ? (userEmail) : "");
    },[])


    const handleLogin = async (data: ResetPasswordFormValues) => {
        const validation = ResetPasswordSchema.safeParse(data);

        if (!validation.success) {
            setServerErrors(validation.error.errors[0]?.message || "Invalid input");
            return;
        }
        setLoading(true);
        try {
            await resetPassword(data, email);
            reset();
            navigate("/login");
        } catch (error: unknown) {
            console.log(error);
            setServerErrors("Invalid input");
        } finally {
            setLoading(false);
        }
    }

    const handleCancel = () => {
        navigate("/login");
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-red-100 via-red-100 to-[#FAFAFA] from-0% via-50% to-100%">
            {/* Left Section */}
            <div className="w-1/2 flex flex-col items-center justify-center">
                <img className="h-screen w-auto" src={AuthImg} alt="Auth Image"/>
            </div>

            {/* Right Section (Login Form) */}
            <div className="w-1/2 flex flex-col items-center justify-center">
                <div className="bg-white p-10 rounded-lg shadow-lg w-3/4">
                    <div className="flex items-center justify-center mb-6">
                        <h3 className="text-3xl font-bold">Reset Your Password</h3>
                    </div>

                    <form onSubmit={handleSubmit(handleLogin)}>
                        {/* Input Fields */}
                        <div className="my-8">

                            <div className="mb-4">
                                <InputField
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    {...register("password")}
                                    icon={undefined}
                                    label={false}
                                    labelName="password"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <InputField
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    {...register("confirmPassword")}
                                    icon={undefined}
                                    label={false}
                                    labelName="confirmPassword"
                                />
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Login Button */}
                        <div className="mt-6 flex gap-6">
                            <CustomButton
                                type="reset"
                                onClick={handleCancel}
                                buttonLabel="Back"
                                buttonClassName="w-full py-3 text-red-800 bg-red-200 rounded-lg h-10 transition-all duration-300 transform hover:bg-gradient-to-r hover:from-red-300 hover:to-red-300 hover:scale-102 cursor-pointer"
                            />
                            <CustomButton
                                type="submit"
                                buttonLabel={loading ? "Logging in..." : "Continue"}
                                buttonClassName="w-full py-3 text-red-800 bg-red-200 rounded-lg h-10 transition-all duration-300 transform hover:bg-gradient-to-r hover:from-red-300 hover:to-red-300 hover:scale-102 cursor-pointer"
                            />
                        </div>
                    </form>

                    {/* Server Error Message */}
                    {serverErrors && <p className="text-red-500 text-center mt-4">{serverErrors}</p>}

                </div>
            </div>
        </div>
    );
}

export default ResetPasswordForm;
