import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordSchema } from "@/schema/auth/ForgotPasswordSchema";
import InputField from "@/components/InputField/InputField";
import CustomButton from "@/components/Button/CustomButton";
import AuthImg from "@/assets/images/authImage.png";

interface ForgotPasswordFormData {
    email: string;
}

const ForgetPasswordForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [serverErrors, setServerErrors] = useState<string>("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        defaultValues: {
            email: "",
        },
    });

    const handleLogin = async (data: ForgotPasswordFormData) => {
        const validation = ForgotPasswordSchema.safeParse(data);

        if (!validation.success) {
            setServerErrors(validation.error.errors[0]?.message || "Invalid input");
            return;
        }

        setLoading(true);
        setServerErrors("");

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));
            
            // Navigate to OTP verification page
            navigate("/verifyOTP", { state: { email: data.email } });
        } catch (error) {
            setServerErrors("Failed to send reset link. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex">
            {/* Left Section - Simple Image */}
            <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center">
                <img className="h-screen w-auto" src={AuthImg} alt="Auth Image"/>
            </div>

            {/* Right Section - Forgot Password Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold text-gray-900">Forgot Password?</h2>
                        <p className="text-gray-600">We'll send you a reset link</p>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <div className="text-center mb-6">
                            <p className="text-gray-600 leading-relaxed">
                                Enter your email address associated with your account and 
                                we will send you an OTP to reset your password.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <InputField
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    {...register("email")}
                                    icon={undefined}
                                    label={false}
                                    labelName="email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                />
                                {errors.email && (
                                    <p className="text-red-600 text-sm flex items-center">
                                        <span className="mr-1">⚠</span>
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4">
                                <CustomButton
                                    type="button"
                                    variant="secondary"
                                    size="lg"
                                    buttonLabel="Back to Login"
                                    onClick={handleCancel}
                                    fullWidth={true}
                                />
                                <CustomButton
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    buttonLabel={loading ? "Sending..." : "Send Reset Link"}
                                    disabled={loading}
                                    loading={loading}
                                    fullWidth={true}
                                />
                            </div>

                            {/* Server Error */}
                            {serverErrors && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                    <p className="text-red-700 text-sm text-center">{serverErrors}</p>
                                </div>
                            )}
                        </form>

                        {/* Help Text */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-500">
                                Remember your password?{" "}
                                <CustomButton
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    buttonLabel="Sign in here"
                                    onClick={handleCancel}
                                    buttonClassName="text-red-700 hover:text-red-800 font-medium p-0 h-auto"
                                />
                            </p>
                        </div>
                    </div>

                    {/* Footer Text */}
                    <div className="text-center text-sm text-gray-500">
                        <p>Need help? Contact our support team at support@xbus.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgetPasswordForm;
