import * as z from "zod";

export const UserValidation = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(3).max(30),
    first_name: z.string().min(2).max(30),
    last_name: z.string().min(2).max(30),
    email: z.string().min(2).max(30),
    phone: z.string().min(10).max(10),
    university: z.string().min(10).max(100),
});
