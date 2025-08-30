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
