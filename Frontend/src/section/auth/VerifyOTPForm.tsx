import {FormEvent, SetStateAction, useEffect, useState} from "react";
import {InputOTP, InputOTPGroup, InputOTPItem} from 'keep-react';
import CustomButton from "@/components/Button/CustomButton.tsx";
import {useNavigate} from "react-router-dom";
import AuthImg from "../../assets/images/authImage.png";
import {verifyOTP} from "@/api/authAPI.ts";

const VerifyOTPForm = () => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (email) {
            setEmail(JSON.parse(email));
        }
    }, []);

    const handleOtpVerification = async (e: FormEvent) => {
        e.preventDefault();

        console.log("opt: ", value);
        console.log("Email: ", email);


        if (!email) {
            setErrors("Email not found. Please try again.");
            return;
        }

        if (value.length !== 6) {
            setErrors("Please enter a valid 6-digit OTP.");
            return;
        }

        setLoading(true);
        try {
            await verifyOTP(email, value);
            setValue("")
            setErrors("");
        } catch (error: unknown) {
            console.log(error);
            setErrors("Invalid input");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/login");
    }

    return (
        <div
            className="flex min-h-screen bg-gradient-to-r from-red-100 via-red-100 to-[#FAFAFA] from-0% via-50% to-100%">
            {/* Left Section */}
            <div className="w-1/2 flex flex-col items-center justify-center">
                <img className="h-screen w-auto" src={AuthImg} alt="Auth Image"/>
            </div>

            {/* Right Section (Login Form) */}
            <div className="w-1/2 flex flex-col items-center justify-center">

                <div className="bg-white p-10 rounded-lg shadow-lg w-3/4">
                    <div className="flex items-center justify-center mb-6">
                        <h3 className="text-3xl font-bold">OTP Verification</h3>
                    </div>

                    <form onSubmit={handleOtpVerification}>
                        {/* Input Fields */}
                        <div className="my-8">
                            <div className="flex items-center justify-between mb-6 font-semibold">
                                <p className="text-center mt-6 mb-4">
                                    Please check your email and enter the OTP below to proceed.
                                </p>
                            </div>

                            {/* OTP Input */}
                            <div className="mb-4 mt-4">
                                <div className="mb-6 flex flex-col items-center">
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
                                        <InputOTPGroup>
                                            {[...Array(6)].map((_, index) => (
                                                <InputOTPItem
                                                    key={index}
                                                    index={index}
                                                    className="otp-box border-red-500 border-2 rounded-lg p-3 text-center text-xl sm:w-12 sm:h-12 mx-2"
                                                    inputMode="numeric"
                                                />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
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
)
    ;
}

export default VerifyOTPForm;
