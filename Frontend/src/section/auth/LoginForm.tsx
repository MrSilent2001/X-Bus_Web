import {FormEvent, useState} from "react";
import {LoginSchema} from "@/schema/auth/LoginSchema.ts";
import {userLogin} from "@/api/authAPI.ts";
import InputField from "@/components/InputField/InputField.tsx";
import CustomButton from "@/components/Button/CustomButton.tsx";
import {Link} from "react-router-dom";
import AuthImg from "../../assets/images/authImage.png";

interface LoginFormValues {
    username: string;
    password: string;
}

const LoginForm = () =>{
    const [formData, setFormData] = useState<LoginFormValues>({
        username: '',
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
            console.log("Username: ", formData.username, "Password: ", formData.password);
            setFormData({ username: '', password: '' });
        } catch (error: unknown) {
            console.log(error);
            setErrors("Invalid input");
        } finally {
            setLoading(false);
        }


    }
    return (
        <div className="flex min-h-screen bg-gradient-to-r from-red-300 to-white">
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
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-4xl font-bold">Login</h3>
                        </div>
                    </div>

                    <form onSubmit={handleLogin}>
                        {/* Input Fields */}
                        <div className="my-8">
                            <div className="mb-4 mt-4">
                                <InputField
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                    value={formData.username || ''}
                                    onChange={(e) => handleInputChange(e, 'username')}
                                    icon={undefined}
                                    label={false}
                                    labelName="username"
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
                                    labelName=""
                                />
                            </div>

                        </div>

                        {/* Register Link */}
                        <div className="text-left mt-6">
                            <p className="text-gray-500 ">
                                Don't You Have an Account?
                                <Link className="text-blue-600 font-semibold" to="/auth/signup">
                                    Register
                                </Link>
                            </p>
                        </div>

                        {/* Login Button */}
                        <div className="mt-6">
                            <CustomButton
                                buttonLabel={loading ? "Logging in..." : "Continue"}
                                buttonClassName="w-full py-3 text-white bg-gradient-to-r from-red-500 to-red-700 rounded-lg h-10"
                            />
                        </div>
                    </form>

                    {/* Error Message */}
                    {errors && <p className="text-red-500 text-center mt-4">{errors}</p>}

                    <Link to="/auth/forgotPassword">
                        <p className="text-center text-blue-600 mt-3 cursor-pointer">Forgot Password?</p>
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default LoginForm;
