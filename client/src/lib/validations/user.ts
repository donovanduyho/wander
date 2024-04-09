import * as z from "zod";

export const UserValidation = z.object({
    name: z.string().min(3).max(30),
    university: z.string().min(10).max(100),
});
