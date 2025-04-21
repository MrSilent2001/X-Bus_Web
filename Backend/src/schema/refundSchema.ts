import { z } from 'zod';

const refundSchema = z.object({
    date: z.coerce.date(),
    paymentId: z.number().int().positive(),
    accountDetails: z.string().min(1, "Account details are required"),
    status: z.string().min(1, "Status is required"),
});

type RefundSchema = z.infer<typeof refundSchema>;

export { refundSchema, RefundSchema };