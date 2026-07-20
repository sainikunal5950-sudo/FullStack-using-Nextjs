import { z } from 'zod';

export const usernameValidation = z
    .string()
    .min(2, "username must be 2 chracters ")
    .max(20, "username must be no more than 20 charcaters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must contain special Character")

export const signupSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: "password must be leat 6 chracters " })
})

