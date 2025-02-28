import {FormEvent, useState} from "react";
import InputField from "@/components/InputField/InputField.tsx";
import CheckBox from "@/components/CheckBox/CheckBox.tsx";
import CustomButton from "@/components/Button/CustomButton.tsx";
import {Link} from "react-router-dom";
import {SignupSchema} from "@/schema/auth/SignupSchema.ts";
import {userSignUp} from "@/api/authAPI.ts";
import AuthImg from "../../assets/images/authImage.png";

interface SignUpFormValues {
    username: string;
    email: string;
    nic: string;
    password: string;
    confirmPassword: string;
    role:string;
}

const SignUpForm = () =>{
    const [formData, setFormData] = useState<SignUpFormValues>({
        username: '',
        email: '',
        nic: '',
        password: '',
        confirmPassword: '',
        role: ''
    });

    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, value: keyof SignUpFormValues) => {
        setFormData({
            ...formData,
            [value]: e.target.value
        });
    }

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();

        const validation = SignupSchema.safeParse(formData);

        if (!validation.success) {
            setErrors(validation.error.errors[0]?.message || "Invalid input");
            return;
        }
        setLoading(true);
        try {
            await userSignUp(formData);
            console.log("Username: ", formData.username, "Password: ", formData.password);
            setFormData({
                username: '',
                email: '',
                nic: '',
                password: '',
                confirmPassword: '',
                role:'admin'
            });
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
                            <h3 className="text-3xl font-bold">SignUp</h3>
                    </div>

                    <form onSubmit={handleSignUp}>
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

                            <div className="mb-4 mt-4">
                                <InputField
                                    id="nic"
                                    type="text"
                                    placeholder="NIC"
                                    value={formData.nic || ''}
                                    onChange={(e) => handleInputChange(e, 'nic')}
                                    icon={undefined}
                                    label={false}
                                    labelName="nic"
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
                                buttonLabel={loading ? "Signing in..." : "SignUp"}
                                buttonClassName="w-full h-10 py-3 text-red-800 bg-red-200 rounded-lg transition-all duration-300 transform hover:bg-gradient-to-r hover:from-red-300 hover:to-red-300 hover:scale-102 cursor-pointer"
                            />
                        </div>
                    </form>

                    {/* Error Message */}
                    {errors && <p className="text-red-500 text-center mt-4">{errors}</p>}

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