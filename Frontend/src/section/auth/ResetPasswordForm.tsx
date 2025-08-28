import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ResetPasswordSchema } from "@/schema/auth/ResetPasswordSchema";
import InputField from "@/components/InputField/InputField";
import CustomButton from "@/components/Button/CustomButton";
import AuthImg from "@/assets/images/authImage.png";

interface ResetPasswordFormData {
    password: string;
    confirmPassword: string;
}

const ResetPasswordForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [serverErrors, setServerErrors] = useState<string>("");



    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormData>({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const handleResetPassword = async (data: ResetPasswordFormData) => {
        const validation = ResetPasswordSchema.safeParse(data);

        if (!validation.success) {
            setServerErrors(validation.error.errors[0]?.message || "Invalid input");
            return;
        }

        setLoading(true);
        setServerErrors("");

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));
            
            // Navigate to login page after successful password reset
            navigate("/login");
        } catch (error) {
            setServerErrors("Failed to update password. Please try again.");
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

            {/* Right Section - Reset Password Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
                        <p className="text-gray-600">Create a new password for your account</p>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <div className="text-center mb-6">
                            <p className="text-gray-600 leading-relaxed">
                                Enter your new password below. Make sure it's strong and secure.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-6">
                            {/* Password Field */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    New Password
                                </label>
                                <InputField
                                    id="password"
                                    type="password"
                                    placeholder="Enter your new password"
                                    {...register("password")}
                                    icon={undefined}
                                    label={false}
                                    labelName="password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                />
                                {errors.password && (
                                    <p className="text-red-600 text-sm flex items-center">
                                        <span className="mr-1">⚠</span>
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                                    Confirm New Password
                                </label>
                                <InputField
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your new password"
                                    {...register("confirmPassword")}
                                    icon={undefined}
                                    label={false}
                                    labelName="confirmPassword"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                />
                                {errors.confirmPassword && (
                                    <p className="text-red-600 text-sm flex items-center">
                                        <span className="mr-1">⚠</span>
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>

                            {/* Password Requirements */}
                            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                                <p className="text-sm font-medium text-gray-700">Password Requirements:</p>
                                <ul className="text-xs text-gray-600 space-y-1">
                                    <li>• At least 8 characters long</li>
                                    <li>• Include uppercase and lowercase letters</li>
                                    <li>• Include at least one number</li>
                                    <li>• Include at least one special character</li>
                                </ul>
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
                                    buttonLabel={loading ? "Updating..." : "Update Password"}
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

export default ResetPasswordForm;
