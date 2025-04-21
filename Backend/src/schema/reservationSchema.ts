import { z } from 'zod';

const reservationSchema = z.object({
    date: z.coerce.date({ required_error: "Date is required" }),
    busFare: z.number({ required_error: "Bus fare is required" }),
    seatNo: z.string().min(1, { message: "Seat number is required" }),
    userId: z.number({ required_error: "User ID is required" }),
    scheduleId: z.number({ required_error: "Schedule ID is required" }),
});

type Reserve = z.infer<typeof reservationSchema>;

export { reservationSchema, Reserve };