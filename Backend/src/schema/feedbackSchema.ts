import { z } from "zod";

const feedbackSchema = z.object({
    passengerName: z.string().min(1, "Passenger Name is required"),
    busRegNo: z.string().min(1, "Bus Registration Number is required"),
    message: z.string().min(1, "Message is required").max(500, "Message must be at most 500 characters"),
    createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Time must be in HH:mm format").optional(),
});

type feedbackReg = z.infer<typeof feedbackSchema>;

export { feedbackSchema, feedbackReg };
