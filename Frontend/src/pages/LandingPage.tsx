import Logo from "@/assets/images/logo.png";
import Bus from "@/assets/images/Bus.png";
import CustomButton from "@/components/Button/CustomButton.tsx";
 import {useNavigate} from "react-router-dom";

const LandingPage = () =>{
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate("/login");
    };

    return (
        <div className="flex flex-col h-screen bg-white rounded-lg">
            <div className="h-5/6 flex flex-1 bg-gradient-to-b from-red-200 to-white">
                {/* Left Section */}
                <div className="w-1/2 flex flex-col items-center justify-center p-6">
                    <h3 className="font-poppins text-8xl text-center [text-shadow:0px_10px_4px_rgba(0,0,0,0.25)]">
                        Welcome to
                    </h3>
                    <img className="h-24 w-auto mt-12" src={Logo} alt="Logo"/>
                </div>

                {/* Right Section */}
                <div className="w-1/2 flex flex-col items-center justify-center">
                    <img className="h-full w-screen" src={Bus} alt="Bus Image"/>
                </div>
            </div>

            {/* Bottom Section with Button */}
            <div className="h-1/6 w-full flex flex-col items-center justify-center ">
                <CustomButton
                    onClick={handleGetStartedClick}
                    buttonLabel={"Get Started >"}
                    buttonClassName="w-1/4 text-white bg-red-200 rounded-lg h-10 text-red-800 transition-all duration-300 transform hover:bg-gradient-to-r hover:from-red-300 hover:to-red-300 hover:scale-105 cursor-pointer"
                />
            </div>
        </div>
    );
}

export default LandingPage;