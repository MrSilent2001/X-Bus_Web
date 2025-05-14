import { z } from "zod";

const expenseSchema = z.object({
    date: z.coerce.date({
        required_error: "Date is required",
        invalid_type_error: "Invalid date format",
    }),
    description: z.string().min(1, "Description is required"),
    proof: z.string().min(1, "Proof is required"),
    busId: z.number({
        required_error: "busId is required",
        invalid_type_error: "busId must be a number",
    }),
});

type expenseType = z.infer<typeof expenseSchema>;

export { expenseSchema, expenseType };
