export interface User {
    name: string;
    identifier: string;
    nic: string;
    email?: string;
    contactNo: string;
    password?: string;
    confirmPassword?: string;
    profilePicture?: string;
    regPermStatus?: "GRANTED" | "PENDING" | "DENIED";
}

export interface BusOperator {
    id?: string;
    name: string;
    email: string;
    contactNo: string;
    nic: string;
    licenseNo: string;
    experience: number;
    assignedBusRegNo?: string;
    profilePicture?: string;
}