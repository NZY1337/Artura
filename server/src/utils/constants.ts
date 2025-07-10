import { SizeImageProps, QualityFormatProps } from "../../types";

import { ImageEditParams } from "openai/resources/images";

export const sizeMap: Record<SizeImageProps, ImageEditParams['size']> = {
    SIZE_1024x1024: "1024x1024",
    SIZE_1024x1536: "1024x1536",
    SIZE_1536x1024: "1536x1024",
    AUTO: "auto",
};

export const qualityMap: Record<QualityFormatProps, ImageEditParams['quality']> = {
    HIGH: "high",
    MEDIUM: "medium",
    LOW: "low",
};