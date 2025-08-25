import { useState } from "react";
import { LoginSchema } from "@/schema/auth/LoginSchema.ts";
import { userLogin } from "@/api/authAPI.ts";
import InputField from "@/components/InputField/InputField.tsx";
import CustomButton from "@/components/Button/CustomButton.tsx";
import { Link, useNavigate } from "react-router-dom";
import AuthImg from "../../assets/images/authImg.png";
import BusLogo from "../../assets/images/BusLogo.png";
import { useForm } from "react-hook-form";

interface LoginFormValues {
    email: string;
    password: string;
}

const LoginForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginFormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const handleLogin = async (data: LoginFormValues) => {
        const validation = LoginSchema.safeParse(data);

        if (!validation.success) {
            setServerError(validation.error.errors[0]?.message || "Invalid input");
            return;
        }

        setLoading(true);

        try {
            await userLogin(data);
            reset();
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            setServerError("Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-red-100 via-red-100 to-[#FAFAFA] from-0% via-50% to-100%">
            {/* Left Section */}
            <div className="w-1/2 flex flex-col items-center justify-center">
                <img className="h-40 w-auto" src={BusLogo} alt="BusLogo"/>
                <img className="h-125 w-auto" src={AuthImg} alt="Auth"/>
            </div>

            {/* Right Section (Login Form) */}
            <div className="w-1/2 flex flex-col items-center justify-center">
                <h3 className="text-4xl text-red font-bold mb-6">Welcome to X-Bus!</h3>
                <div className="bg-white p-10 rounded-lg shadow-lg w-3/4">
                    <div className="flex items-center justify-center mb-6">
                        <h3 className="text-3xl font-bold">Login</h3>
                    </div>

                    <form onSubmit={handleSubmit(handleLogin)}>
                        {/* Input Fields */}
                        <div className="my-8">
                            <div className="mb-4 mt-4">
                                <InputField
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    {...register("email")}
                                    icon={undefined}
                                    label={false}
                                    labelName="Email"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <InputField
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    {...register("password")}
                                    icon={undefined}
                                    label={false}
                                    labelName="Password"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Register Link */}
                        <div className="text-left mt-6">
                            <p className="text-grey-200">
                                Don't have an account?{" "}
                                <Link className="text-grey-500 font-semibold" to="/signup">
                                    Register
                                </Link>
                            </p>
                        </div>

                        {/* Login Button */}
                        <div className="mt-6">
                            <CustomButton
                                type="submit"
                                buttonLabel={loading ? "Logging in..." : "Login"}
                                buttonClassName="w-full py-3 text-red-800 bg-red-200 rounded-lg h-10 transition-all duration-300 transform hover:bg-gradient-to-r hover:from-red-300 hover:to-red-300 hover:scale-102 cursor-pointer"
                            />
                        </div>
                    </form>

                    {/* Server Error Message */}
                    {serverError && <p className="text-red-500 text-center mt-4">{serverError}</p>}

                    <Link to="/forgot-password">
                        <p className="text-center text-grey-200 mt-3 cursor-pointer">Forgot Password?</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
