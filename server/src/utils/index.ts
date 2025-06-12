export * from "./costs";
import { BadRequestException } from "../middlewares/errorMiddleware";
import { ErrorCode } from "../middlewares/errorMiddleware";
import { Response } from "openai/core";
import { ImagesResponse, } from "openai/resources/images";

export const createStorageUrl = (userId: string, index: number): string => {
    return `${userId}/generated-${userId}-${Date.now()}-${index}.png`;
}

export const hasValidImageData = (data: ImagesResponse['data'] | undefined): data is Required<ImagesResponse['data']> => {
    return Array.isArray(data) && !!data[0]?.b64_json;
};


export const isValidUsage = (usage: ImagesResponse.Usage | undefined): usage is Required<ImagesResponse.Usage> => {
    return (
        usage !== undefined &&
        usage.input_tokens !== undefined &&
        usage.output_tokens !== undefined &&
        usage.total_tokens !== undefined &&
        usage.input_tokens_details?.image_tokens !== undefined &&
        usage.input_tokens_details?.text_tokens !== undefined
    );
};
