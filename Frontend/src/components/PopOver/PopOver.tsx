import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import ProfileAvatar from "@/components/Avatar/ProfilePic.tsx";
import {Button} from "@/components/ui/button.tsx";
import CustomButton from "@/components/Button/CustomButton.tsx";
import {useNavigate} from "react-router-dom";
import {getDecodedTokenValue} from "@/utils/functions/decodeToken.ts";
import {useEffect, useState} from "react";
import {getUserByEmail} from "@/api/userAPI.ts";


const PopOver = () =>{
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");

    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        if (token) {
            const decodedEmail = getDecodedTokenValue<{ email: string }>(token, "email");
            if (decodedEmail) {
                setEmail(decodedEmail);
                localStorage.setItem("userEmail", decodedEmail);
            }
        } else {
            const storedEmail = localStorage.getItem("userEmail");
            if (storedEmail) {
                setEmail(storedEmail);
            }
        }
    }, [token]);

    // Fetch user data once the email is available
    useEffect(() => {
        if (email) {
            const fetchUser = async () => {
                try {
                    const response = await getUserByEmail(email, token);
                    console.log(response);
                    setName(response.name);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };
            fetchUser();
        }
    }, [email]);

    const handleEditProfile = ()=>{
        navigate("/adminProfile");
    }

    const handleLogout = ()=>{
        localStorage.removeItem("accessToken");
        navigate("/");
    }

    console.log(name)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button>
                    <ProfileAvatar size="w-11 h-11" className="border-2 border-gray-300 cursor-pointer" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 bg-white rounded-lg">
                <div className="grid gap-4">
                    <div className="space-y-2 flex justify-center">
                        <ProfileAvatar size="w-20 h-20"/>
                    </div>
                    <h4 className="font-medium leading-none text-center">Hi {name}</h4>
                    <div className="grid gap-2">
                        <div className="w-full gap-4">
                            <CustomButton
                                onClick={handleEditProfile}
                                buttonLabel="Edit Profile"
                                buttonClassName="w-full h-8 text-red-800 border border-gray-400 rounded-xl transition-all duration-300 transform hover:bg-red-400 hover:border-white hover:text-white cursor-pointer"
                            />

                        </div>
                        <div className="w-full gap-4">
                            <CustomButton
                                onClick={handleLogout}
                                buttonLabel={"Logout"}
                                buttonClassName="w-full h-8 text-red-800 border border-gray-400 rounded-xl transition-all duration-300 transform hover:bg-red-400 hover:border-white hover:text-white cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default PopOver;
