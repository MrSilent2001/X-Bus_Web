import {FormEvent, useEffect, useState} from "react";
import {resetPassword} from "@/api/authAPI.ts";
import InputField from "@/components/InputField/InputField.tsx";
import CustomButton from "@/components/Button/CustomButton.tsx";
import {useNavigate} from "react-router-dom";
import AuthImg from "../../assets/images/authImage.png";
import {ResetPasswordSchema} from "@/schema/auth/ResetPasswordSchema.ts";

interface ResetPasswordFormValues {
    password: string;
    confirmPassword: string;
}

const ResetPasswordForm = () =>{
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ResetPasswordFormValues>({
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(()=>{
        const userEmail = localStorage.getItem("userEmail");
        setEmail(userEmail ? (userEmail) : "");
    },[])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, value: keyof ResetPasswordFormValues) => {
        setFormData({
            ...formData,
            [value]: e.target.value
        });
    }

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        const validation = ResetPasswordSchema.safeParse(formData);

        if (!validation.success) {
            setErrors(validation.error.errors[0]?.message || "Invalid input");
            return;
        }
        setLoading(true);
        try {
            await resetPassword(formData, email);
            setFormData({ password: '', confirmPassword: '' });
            navigate("/login");
        } catch (error: unknown) {
            console.log(error);
            setErrors("Invalid input");
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

                    <form onSubmit={handleLogin}>
                        {/* Input Fields */}
                        <div className="my-8">

                            <div className="mb-4">
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

                            <div className="mb-4">
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

                        </div>


                        {/* Login Button */}
                        <div className="mt-6 flex gap-6">
                            <CustomButton
                                onClick={handleCancel}
                                buttonLabel="Back"
                                buttonClassName="w-full py-3 text-red-800 bg-red-200 rounded-lg h-10 transition-all duration-300 transform hover:bg-gradient-to-r hover:from-red-300 hover:to-red-300 hover:scale-102 cursor-pointer"
                            />
                            <CustomButton
                                buttonLabel={loading ? "Logging in..." : "Continue"}
                                buttonClassName="w-full py-3 text-red-800 bg-red-200 rounded-lg h-10 transition-all duration-300 transform hover:bg-gradient-to-r hover:from-red-300 hover:to-red-300 hover:scale-102 cursor-pointer"
                            />
                        </div>
                    </form>

                    {/* Error Message */}
                    {errors && <p className="text-red-500 text-center mt-4">{errors}</p>}

                </div>
            </div>
        </div>
    );
}

export default ResetPasswordForm;
