import { z } from "zod";

export const acceptingMessage = z.object({
    acceptMessages: z.boolean(),
})