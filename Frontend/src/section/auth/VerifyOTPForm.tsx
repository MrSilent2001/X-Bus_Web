import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { InputOTP, InputOTPGroup, InputOTPItem } from "keep-react";
import CustomButton from "@/components/Button/CustomButton";
import AuthImg from "@/assets/images/authImage.png";

const VerifyOTPForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string>("");

    // Get email from location state or use a default
    const email = location.state?.email || "user@example.com";

    const handleOtpVerification = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors("");

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));
            
            // Navigate to reset password page
            navigate("/resetPassword", { state: { email } });
        } catch (error) {
            setErrors("Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/login");
    };

    const handleResendOTP = () => {
        // Handle resend OTP logic
        console.log("Resending OTP...");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex">
            {/* Left Section - Simple Image */}
            <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center">
                <img className="h-screen w-auto" src={AuthImg} alt="Auth Image"/>
            </div>

            {/* Right Section - OTP Verification Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold text-gray-900">OTP Verification</h2>
                        <p className="text-gray-600">Enter the 6-digit code sent to your email</p>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <div className="text-center mb-6">
                            <p className="text-gray-600 leading-relaxed">
                                We've sent a verification code to <span className="font-semibold text-gray-900">{email}</span>. 
                                Please check your email and enter the code below.
                            </p>
                        </div>

                        <form onSubmit={handleOtpVerification} className="space-y-6">
                            {/* OTP Input */}
                            <div className="space-y-4">
                                <label className="text-sm font-medium text-gray-700 text-center block">
                                    Enter OTP Code
                                </label>
                                <div className="flex justify-center">
                                    <InputOTP
                                        value={value}
                                        onChange={(newValue: SetStateAction<string>) => {
                                            // Only set the value if it's numeric
                                            if (/^\d*$/.test(newValue as string)) {
                                                setValue(newValue);
                                            }
                                        }}
                                        maxLength={6}
                                    >
                                        <InputOTPGroup className="gap-3">
                                            {[...Array(6)].map((_, index) => (
                                                <InputOTPItem
                                                    key={index}
                                                    index={index}
                                                    className="w-14 h-14 border-2 border-gray-300 rounded-xl text-center text-xl font-semibold focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200"
                                                    inputMode="numeric"
                                                />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
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
                                    buttonLabel={loading ? "Verifying..." : "Verify OTP"}
                                    disabled={loading}
                                    loading={loading}
                                    fullWidth={true}
                                />
                            </div>

                            {/* Error Message */}
                            {errors && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                    <p className="text-red-700 text-sm text-center">{errors}</p>
                                </div>
                            )}
                        </form>

                        {/* Help Text */}
                        <div className="mt-6 text-center space-y-3">
                            <p className="text-sm text-gray-500">
                                Didn't receive the code?{" "}
                                <CustomButton
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    buttonLabel="Resend OTP"
                                    onClick={handleResendOTP}
                                    buttonClassName="text-red-700 hover:text-red-800 font-medium p-0 h-auto"
                                />
                            </p>
                            <p className="text-sm text-gray-500">
                                Check your spam folder if you don't see the email
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

export default VerifyOTPForm;
