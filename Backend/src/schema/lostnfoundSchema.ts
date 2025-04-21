import { z } from "zod";

const lostnFoundSchema = z.object({
    userId: z.number().nullable().optional(),
    userName: z.string().min(1, "Passenger name is required"),
    contactNo: z.string().min(1, "Contact number is required"),
    description: z.string().min(1, "Description is required"),
    date: z.coerce.date({ invalid_type_error: "Invalid date format" }),
    time: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, {
        message: "Invalid time format (expected HH:MM or HH:MM:SS)",
    }),
    status: z.string().min(1, "Status is required"),
});

type lostnfound = z.infer<typeof lostnFoundSchema>

export {lostnFoundSchema, lostnfound}