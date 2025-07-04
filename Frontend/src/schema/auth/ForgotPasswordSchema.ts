import { z } from 'zod';

export const ForgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address").nonempty("Email is required"),
});
