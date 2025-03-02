import {z} from "zod";

const busSchema = z.object({
    ownerId: z.string().min(1, "Owner ID is required"),
    regNo: z.string().min(1, "Registration Number is required"),
    fleetName: z.string().min(1, "Fleet Name is required"),
    routeNo: z
        .string()
        .min(1, "Route Number is required")
        .regex(/^[A-Za-z0-9-]+$/, "Route Number must contain only alphanumeric characters or hyphens"),
    route: z.string().min(1, "Route is required"),
    seatingCapacity: z
        .number()
        .min(1, "Seating Capacity must be at least 1")
        .int("Seating Capacity must be a whole number"),
    busFare: z
        .string()
        .min(1, "Bus Fare is required")
        .regex(/^\d+(\.\d{1,2})?$/, "Bus Fare must be a valid number with up to two decimal places"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
    profilePicture: z.string().url("Profile picture must be a valid URL").optional(),
}).refine(data => data.busFare !== '', {
    message: "Bus fare is required",
    path: ["busFare"],
});

type BusReg = z.infer<typeof busSchema>;

export { busSchema, BusReg };