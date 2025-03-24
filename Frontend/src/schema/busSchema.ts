import {z} from 'zod';

export const BusRegisterSchema = z.object({
    regNo: z.string().nonempty("Registration number is required"),
    fleetName: z.string().nonempty("Fleet name is required"),
    routeNo: z.string().nonempty("Route number is required"),
    route: z.string().nonempty("Route details are required"),
    seatingCapacity: z
        .number()
        .min(1, "Seating capacity must be at least 10")
        .max(60, "Seating capacity cannot exceed 100"),
    busFare: z
        .number()
        .min(0, "Bus fare must be a positive value")
        .max(10000, "Bus fare cannot exceed Rs. 10,000"),
    password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
    confirmPassword: z
        .string()
        .nonempty("Confirm password is required")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const BusUpdateSchema = z.object({
    regNo: z.string().nonempty("Registration number is required"),
    fleetName: z.string().nonempty("Fleet name is required"),
    routeNo: z.string().nonempty("Route number is required"),
    route: z.string().nonempty("Route details are required"),
    seatingCapacity: z
        .number()
        .min(1, "Seating capacity must be at least 10")
        .max(60, "Seating capacity cannot exceed 100"),
    busFare: z
        .number()
        .min(0, "Bus fare must be a positive value")
        .max(10000, "Bus fare cannot exceed Rs. 10,000"),
});