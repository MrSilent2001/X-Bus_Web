import { z } from "zod";

const registrationRequestSchema = z.object({
    ownerName: z.string().min(1, "Owner name is required"),

    email: z.string().email("Invalid email address").nonempty("Email is required"),

    contactNo: z
        .string()
        .regex(/^(?:\+94\d{9}|0\d{9})$/, "Contact No must be a valid Sri Lankan number"),

    age: z.number().int().min(18, "Owner must be at least 18 years old"),

    gender: z.enum(["Male", "Female", "Other"], {
        errorMap: () => ({ message: "Gender must be Male, Female, or Other" }),
    }),

    busRegNo: z.string().min(1, "Bus registration number is required"),

    type: z.string().min(1, "Bus type is required"),

    manufacturedYear: z
        .number()
        .int()
        .min(1900, "Year must be after 1900")
        .max(new Date().getFullYear(), "Year cannot be in the future"),

    chassisNo: z.string().min(5, "Chassis number must be at least 5 characters"),

    proof: z.string().url("Proof must be a valid URL").optional(),

    status: z.enum(["NOTGRANTED", "GRANTED", "TERMINATED"]).default("NOTGRANTED"),
});

type RegistrationRequestDTO = z.infer<typeof registrationRequestSchema>;

export { registrationRequestSchema, RegistrationRequestDTO };
