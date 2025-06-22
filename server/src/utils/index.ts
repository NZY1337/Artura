export * from "./constCalculation";
import { ImagesResponse } from "openai/resources/images";
export * from "./uploadToSupabaseStorage";


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
