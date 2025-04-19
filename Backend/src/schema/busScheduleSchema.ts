import { z } from "zod";

const busScheduleSchema = z.object({
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
    scheduledTime: z
        .string()
        .regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
            message: "Scheduled time must be in HH:mm format",
        }),
    seatingCapacity: z
        .number({
            required_error: "Seating capacity is required",
            invalid_type_error: "Seating capacity must be a number",
        })
        .positive("Seating capacity must be a positive number")
        .optional(),

    busId: z.number({
        required_error: "busId is required",
        invalid_type_error: "busId must be a number",
    }),

});

type Schedule = z.infer<typeof busScheduleSchema>;

export { busScheduleSchema, Schedule };
