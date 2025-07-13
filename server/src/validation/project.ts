import { z } from "zod";
import { BadRequestException, ErrorCode } from "../middlewares/errorMiddleware";
import { 
    SPACE_TYPES, 
    CATEGORIES, 
    DESIGN_THEMES, 
    SIZE_OPTIONS, 
    QUALITY_OPTIONS, 
    OUTPUT_FORMATS 
} from "../../types/types";

export const ProjectValidator = z.object({
    n: z.string().transform((val) => {
        const num = parseInt(val, 10);
        if (isNaN(num) || num < 1 || num > 10) {
            throw new BadRequestException(ErrorCode.BAD_REQUEST, "Image count must be between 1 and 10");
        }
        return num;
    }),
    prompt: z.string().min(1, "Prompt is required"),
    size: z.enum(SIZE_OPTIONS),
    outputFormat: z.enum(OUTPUT_FORMATS),
    quality: z.enum(QUALITY_OPTIONS),
    category: z.enum(CATEGORIES),
    spaceType: z.enum(SPACE_TYPES),
    designTheme: z.enum(DESIGN_THEMES),
    images: z.array(z.string()).optional(),
});

// Export the inferred type
export type ValidatedProjectData = z.infer<typeof ProjectValidator>;