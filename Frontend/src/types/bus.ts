export interface Bus {
    id?: number;
    ownerId?: string;
    regNo: string;
    fleetName: string;
    routeNo: string;
    route: string;
    seatingCapacity: number;
    busFare: number;
    password?: string;
    confirmPassword?: string;
    profilePicture?: string | null | undefined;
    operatorId?: string;
    operatorName?: string;
}

export interface BusRegistrationFormData {
    ownerName: string;
    email: string;
    contactNo: string;
    age: number;
    gender: string;
    busRegNo: string;
    type: string;
    manufacturedYear: number;
    chassisNo: string;
    proof: FileList;
}
