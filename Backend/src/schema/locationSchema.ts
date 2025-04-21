import { z } from 'zod';

const locationSchema = z.object({
    coordinates: z.string().min(1, "Coordinates are required"),
    date: z.coerce.date(),
    time: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),
    busId: z.number().int().positive(), // if you're referencing the bus by ID
});

type LocationSchema = z.infer<typeof locationSchema>;

export { locationSchema, LocationSchema };