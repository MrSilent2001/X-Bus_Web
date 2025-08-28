export interface User {
    name: string;
    identifier: string;
    nic: string;
    email?: string;
    contactNo: string;
    password?: string;
    confirmPassword?: string;
    profilePicture?: string
}