import {useState} from "react";
import InputField from "@/components/InputField/InputField.tsx";
import CheckBox from "@/components/CheckBox/CheckBox.tsx";
import CustomButton from "@/components/Button/CustomButton.tsx";
import {Link, useNavigate} from "react-router-dom";
import {SignupSchema} from "@/schema/auth/SignupSchema.ts";
import {userSignUp} from "@/api/authAPI.ts";
import AuthImg from "../../assets/images/authImg.png";
import BusLogo from "../../assets/images/BusLogo.png";
import { useForm } from "react-hook-form";

interface SignUpFormValues {
    name: string;
    email: string;
    nic: string;
    password: string;
    confirmPassword: string;
}

const SignUpForm = () =>{
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SignUpFormValues>({
        defaultValues: {
            name: '',
            email: '',
            nic: '',
            password: '',
            confirmPassword: ''
        },
    });

    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);


    const handleSignUp = async (data: SignUpFormValues) => {
        console.log(data)
        const validation = SignupSchema.safeParse(data);
        console.log(validation);

        if (!validation.success) {
            setServerError(validation.error.errors[0]?.message || "Invalid input");
            return;
        }
        setLoading(true);

        try {
            await userSignUp(data);
            console.log("Username: ", data.name, "Password: ", data.password);
            reset();
            setIsChecked(false);
            navigate("/login");

        } catch (error: unknown) {
            console.log(error);
            setServerError("Invalid input");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="flex min-h-screen bg-gradient-to-r from-red-100 via-red-100 to-[#FAFAFA] from-0% via-50% to-100%">
            {/* Left Section */}
            <div className="w-1/2 flex flex-col items-center justify-center">
            <div className="w-1/2 flex flex-col items-center justify-center">
                <img className="h-40 w-auto" src={BusLogo} alt="BusLogo"/>
                <img className="h-125 w-auto" src={AuthImg} alt="Auth"/>
            </div>
            </div>

            {/* Right Section (Login Form) */}
            <div className="w-1/2 flex flex-col items-center justify-center">
                <div>
                    <h3 className="text-4xl text-red font-bold mb-6">
                        Welcome to X-Bus!
                    </h3>
                </div>
                <div className="bg-white p-10 rounded-lg shadow-lg w-3/4">
                    <div className="flex items-center justify-center mb-6">
                            <h3 className="text-3xl font-bold">SignUp</h3>
                    </div>

                    <form onSubmit={handleSubmit(handleSignUp)}>
                        {/* Input Fields */}
                        <div className="my-8">
                            <div className="mb-4 mt-4">
                                <InputField
                                    id="name"
                                    type="text"
                                    placeholder="Name"
                                    {...register("name")}
                                    icon={undefined}
                                    label={false}
                                    labelName="name"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                            </div>

                            <div className="mb-4 mt-4">
                                <InputField
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    {...register("email")}
                                    icon={undefined}
                                    label={false}
                                    labelName="email"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="mb-4 mt-4">
                                <InputField
                                    id="nic"
                                    type="text"
                                    placeholder="NIC"
                                    {...register("nic")}
                                    icon={undefined}
                                    label={false}
                                    labelName="nic"
                                />
                                {errors.nic && (
                                    <p className="text-red-500 text-sm">{errors.nic.message}</p>
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

                        {/* Register Link */}
                        <div className="text-left">
                            <p className="text-grey-200">
                                Already Have an Account ?
                                <Link className="text-grey-200 font-semibold" to="/login">
                                    Login
                                </Link>

                            </p>
                        </div>

                        {/* SignUp Button */}
                        <div className="mt-6">
                            <CustomButton
                                type="submit"
                                buttonLabel={loading ? "Signing in..." : "SignUp"}
                                buttonClassName={`w-full h-10 py-3 text-red-800 bg-red-200 rounded-lg transition-all duration-300 transform 
                                                  hover:bg-gradient-to-r hover:from-red-300 hover:to-red-300 hover:scale-102 cursor-pointer 
                                                  ${!isChecked ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={!isChecked || loading}
                            />
                        </div>
                    </form>

                    {/* Error Message */}
                    {serverError && <p className="text-red-500 text-center mt-4">{serverError}</p>}

                    <div className="flex ml-24 mt-3">
                        <CheckBox
                            id="terms"
                            isChecked={isChecked}
                            onChange={(checked) => setIsChecked(checked)}
                        />
                        <span>Agree to our <a href="#"> Terms and Conditions</a> </span>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SignUpForm;