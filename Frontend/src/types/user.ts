export interface User {
    name: string;
    identifier: string;
    nic: string;
    contactNo: string;
    password?: string;
    confirmPassword?: string;
    profilePicture?: string
}