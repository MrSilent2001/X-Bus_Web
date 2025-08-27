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
import { FaUser, FaEdit, FaSignOutAlt, FaCog, FaShieldAlt } from "react-icons/fa";

const PopOver = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [profilePic, setProfilePic] = useState<string>("");
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

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
                    const response = await getUserByEmail(email);
                    setName(response.name);
                    setProfilePic(response.profilePicture);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };
            fetchUser();
        }
    }, [email]);

    const handleEditProfile = () => {
        navigate("/adminProfile");
    }

    const handleLogout = () => {
        setShowLogoutConfirm(true);
    }

    const confirmLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userEmail");
        navigate("/");
    }

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="p-0 bg-transparent hover:bg-gray-100 rounded-full transition-all duration-200">
                    <ProfileAvatar 
                        profilePic={profilePic} 
                        size="w-11 h-11" 
                        className="border-2 border-gray-300 cursor-pointer hover:border-red-500 transition-all duration-200" 
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-0">
                {/* User Info Section */}
                <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-t-2xl">
                    <div className="flex items-center space-x-4">
                        <ProfileAvatar 
                            profilePic={profilePic} 
                            size="w-16 h-16"
                            className="border-4 border-white shadow-lg"
                        />
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 text-lg truncate">
                                {name || "User"}
                            </h4>
                            <p className="text-gray-600 text-sm truncate">
                                {email}
                            </p>
                            <div className="flex items-center space-x-1 mt-1">
                                <FaShieldAlt className="text-red-600 text-xs" />
                                <span className="text-xs text-red-600 font-medium">Administrator</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="p-4 space-y-2">
                    <CustomButton
                        type="button"
                        variant="ghost"
                        size="md"
                        buttonLabel="Edit Profile"
                        showIcon={true}
                        icon={<FaEdit />}
                        onClick={handleEditProfile}
                        fullWidth={true}
                        buttonClassName="justify-start text-gray-700 hover:text-red-600 hover:bg-red-50"
                    />

                    <CustomButton
                        type="button"
                        variant="ghost"
                        size="md"
                        buttonLabel="Settings"
                        showIcon={true}
                        icon={<FaCog />}
                        onClick={() => navigate("/settings")}
                        fullWidth={true}
                        buttonClassName="justify-start text-gray-700 hover:text-red-600 hover:bg-red-50"
                    />

                    <div className="border-t border-gray-100 pt-2">
                        <CustomButton
                            type="button"
                            variant="ghost"
                            size="md"
                            buttonLabel="Logout"
                            showIcon={true}
                            icon={<FaSignOutAlt />}
                            onClick={handleLogout}
                            fullWidth={true}
                            buttonClassName="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                        />
                    </div>
                </div>

                {/* Logout Confirmation Modal */}
                {showLogoutConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-6 max-w-sm mx-4 shadow-2xl">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaSignOutAlt className="text-red-600 text-2xl" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    Confirm Logout
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Are you sure you want to logout? You'll need to sign in again to access your account.
                                </p>
                                <div className="flex space-x-3">
                                    <CustomButton
                                        type="button"
                                        variant="secondary"
                                        size="md"
                                        buttonLabel="Cancel"
                                        onClick={cancelLogout}
                                        fullWidth={true}
                                    />
                                    <CustomButton
                                        type="button"
                                        variant="danger"
                                        size="md"
                                        buttonLabel="Logout"
                                        showIcon={true}
                                        icon={<FaSignOutAlt />}
                                        onClick={confirmLogout}
                                        fullWidth={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}

export default PopOver;
