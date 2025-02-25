import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import ProfilePic from "../../assets/images/profilePic.jpeg";

const ProfileAvatar = ({ size = "w-10 h-10", className = "" }) => {
    return (
        <Avatar className={`${size} ${className}`}>
            <AvatarImage src={ProfilePic} alt="User Profile" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    );
};

export default ProfileAvatar;
