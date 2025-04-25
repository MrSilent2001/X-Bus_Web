import { z } from 'zod';

const paymentSchema = z.object({
    date: z.coerce.date(),
    amount: z.number().positive("Amount must be positive"),
    status: z.string().min(1, "Status is required"),
    user: z.coerce.number().int().positive(),
    schedule: z.coerce.number().int().positive()
});

type PaymentSchema = z.infer<typeof paymentSchema>;

export { paymentSchema, PaymentSchema };
