import { z } from "zod";

export const ProjectValidator = z.object({
    n: z.number().min(1).max(10),
    prompt: z.string(),
    size: z.enum(["1024x1024", "1024x1536", "1536x1024", "auto"]),
    output_format: z.enum(["png", "jpeg", "webp"])
})
