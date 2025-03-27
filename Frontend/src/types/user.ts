export interface User {
    name: string;
    email: string;
    nic: string;
    contactNo: string;
    password?: string;
    confirmPassword?: string;
    profilePicture?: string
}