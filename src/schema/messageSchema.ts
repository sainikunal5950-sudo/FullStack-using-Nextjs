import { z } from "zod";

export const messageSchema = z.object({
    content: z.
        string()
        .min(10, { message: 'content must be least of 10 chracetrs' })
        .max(300, { message: 'content must be no more longer than 300 chracters' })
})