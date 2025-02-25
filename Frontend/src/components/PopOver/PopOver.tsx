import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import ProfileAvatar from "@/components/Avatar/ProfilePic.tsx";
import {Button} from "@/components/ui/button.tsx";
import CustomButton from "@/components/Button/CustomButton.tsx";
import {useNavigate} from "react-router-dom";

const PopOver = () =>{
    const navigate = useNavigate();

    const handleEditProfile = ()=>{
        navigate("/adminProfile");
    }

    const handleLogout = ()=>{
        navigate("/");
    }

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
                    <h4 className="font-medium leading-none text-center">Hi John</h4>
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
