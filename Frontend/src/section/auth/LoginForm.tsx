import {FormEvent, useState} from "react";
import {LoginSchema} from "@/schema/auth/LoginSchema.ts";
import {userLogin} from "@/api/authAPI.ts";
import InputField from "@/components/InputField/InputField.tsx";
import CustomButton from "@/components/Button/CustomButton.tsx";
import {Link, useNavigate} from "react-router-dom";
import AuthImg from "../../assets/images/authImage.png";

interface LoginFormValues {
    email: string;
    password: string;
}

const LoginForm = () =>{
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginFormValues>({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, value: keyof LoginFormValues) => {
        setFormData({
            ...formData,
            [value]: e.target.value
        });
    }

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        const validation = LoginSchema.safeParse(formData);

        if (!validation.success) {
            setErrors(validation.error.errors[0]?.message || "Invalid input");
            return;
        }
        setLoading(true);
        try {
            await userLogin(formData);
            console.log("Email: ", formData.email, "Password: ", formData.password);
            setFormData({ email: '', password: '' });
            navigate("/dashboard");
        } catch (error: unknown) {
            console.log(error);
            setErrors("Invalid input");
        } finally {
            setLoading(false);
        }


    }
    return (
        <div className="flex min-h-screen bg-gradient-to-r from-red-100 via-red-100 to-[#FAFAFA] from-0% via-50% to-100%">
            {/* Left Section */}
            <div className="w-1/2 flex flex-col items-center justify-center">
                <img className="h-screen w-auto" src={AuthImg} alt="Auth Image"/>
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
                            <h3 className="text-3xl font-bold">Login</h3>
                    </div>

                    <form onSubmit={handleLogin}>
                        {/* Input Fields */}
                        <div className="my-8">
                            <div className="mb-4 mt-4">
                                <InputField
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email || ''}
                                    onChange={(e) => handleInputChange(e, 'email')}
                                    icon={undefined}
                                    label={false}
                                    labelName="email"
                                />
                            </div>
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

                        </div>

                        {/* Register Link */}
                        <div className="text-left mt-6">
                            <p className="text-grey-200 ">
                                Don't You Have an Account?
                                <Link className="text-grey-500 font-semibold" to="/signup">
                                    Register
                                </Link>
                            </p>
                        </div>

                        {/* Login Button */}
                        <div className="mt-6">
                            <CustomButton
                                buttonLabel={loading ? "Logging in..." : "Continue"}
                                buttonClassName="w-full py-3 text-red-800 bg-red-200 rounded-lg h-10 transition-all duration-300 transform hover:bg-gradient-to-r hover:from-red-300 hover:to-red-300 hover:scale-102 cursor-pointer"
                            />
                        </div>
                    </form>

                    {/* Error Message */}
                    {errors && <p className="text-red-500 text-center mt-4">{errors}</p>}

                    <Link to="/auth/forgotPassword">
                        <p className="text-center text-grey-200 mt-3 cursor-pointer">Forgot Password?</p>
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default LoginForm;
