import { z } from "zod";

const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
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
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
    confirmPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
    profilePicture: z.string().url("Profile picture must be a valid URL").optional(),
    role: z.string().min(1, "Role is required"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type UserReg = z.infer<typeof userSchema>;

export { userSchema, UserReg };
