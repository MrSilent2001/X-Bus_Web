import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

interface ProfileAvatarProps {
    size?: string;
    className?: string;
    profilePic?: string;
}


const ProfileAvatar = ({ size = "w-10 h-10", className = "", profilePic }: ProfileAvatarProps) => {
    return (
        <Avatar className={`${size} ${className}`}>
            <AvatarImage
                src={profilePic || ""}
                alt="User Profile"
            />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    );
};

export default ProfileAvatar;
