import { z } from 'zod';

export const SignupSchema = z.object({
    name: z.string().nonempty("Username is required"),
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    nic: z
        .string()
        .nonempty("NIC is required")
        .regex(/^(\d{12}|\d{9}[v])$/, "NIC must be 12 digits or 9 digits followed by 'v'"),
    contactNo: z
        .union([
            z.string().regex(/^(?:\+94\d{9}|0\d{9})$/, "Contact No must be exactly 10 digits"),
            z.literal(""),
            z.undefined(),
        ])
        .optional(),
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