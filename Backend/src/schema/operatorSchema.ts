import { z } from "zod";

const operatorSchema = z.object({
    name: z.string().min(1, "Name is required"),

    nic: z
        .string()
        .nonempty("NIC is required")
        .regex(/^(\d{12}|\d{9}[vV])$/, "NIC must be 12 digits or 9 digits followed by 'v' or 'V'"),

    contactNo: z
        .union([
            z.string().regex(/^(?:\+94\d{9}|0\d{9})$/, "Contact No must be a valid Sri Lankan number"),
            z.literal(""),
            z.undefined(),
        ])
        .optional(),

    email: z.string().email("Invalid email address").nonempty("Email is required"),

    yearsOfExperience: z
        .number({
            invalid_type_error: "Years of experience must be a number",
        })
        .int("Years of experience must be an integer")
        .min(0, "Years of experience cannot be negative"),

    busRegNo: z.string().nonempty("Bus registration number is required"),
});

type OperatorReg = z.infer<typeof operatorSchema>;

export { operatorSchema, OperatorReg };
