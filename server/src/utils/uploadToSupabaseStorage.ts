// utils/uploadToSupabase.ts
import { supabaseClient } from "../services/supabase";
import { BadRequestException, ErrorCode } from "../middlewares/errorMiddleware";
import { SUPABASE_URL } from "../../secrets";

export const createStorageUrl = (userId: string, identifier: string): string => {
    return `${userId}/generated-${userId}-${Date.now()}-${identifier}`;
}

export const sanitizeFilename = (filename: string) => {
    return filename
        .toLowerCase()
        .replace(/\s+/g, '_')           // Replace spaces with underscore
        .replace(/[^a-z0-9_\-\.]/g, '') // Remove all chars except a-z, 0-9, underscore, dash, dot
        .replace(/_+/g, '_')            // Replace multiple underscores with one
        .substring(0, 100);             // Optional: limit length to 100 chars
}

export async function uploadGeneratedImagesToSupabase(
    userId: string,
    imageData: { b64_json?: string }[]
): Promise<string[]> {
    return await Promise.all(
        imageData.map(async (data, index) => {
            if (!data.b64_json) {
                throw new BadRequestException(ErrorCode.BAD_REQUEST, `Image data is missing for image at index ${index}`);
            }

            const imageBuffer = Buffer.from(data.b64_json, "base64");
            const storagePath = createStorageUrl(userId, `generated-${index}`);

            const { error } = await supabaseClient.storage.from("artura").upload(storagePath, imageBuffer, { contentType: "image/png" });

            if (error) throw new BadRequestException(ErrorCode.BAD_REQUEST, `Failed to upload generated image at index ${index} to storage.`);

            return `${SUPABASE_URL}/storage/v1/object/public/artura/${encodeURIComponent(storagePath)}`;
        })
    );
}

// Upload function
export async function uploadUploadedImagesToSupabase(
    userId: string,
    files: Express.Multer.File[]
): Promise<string[]> {
    return await Promise.all(
        files.map(async (file, index) => {
            const safeFileName = sanitizeFilename(file.originalname);
            const storagePath = createStorageUrl(userId, `uploaded-${index}-${safeFileName}`);

            const { error } = await supabaseClient.storage
                .from("artura")
                .upload(storagePath, file.buffer, { contentType: file.mimetype });

            if (error) {
                throw new BadRequestException(ErrorCode.BAD_REQUEST, `Failed to upload original image at index ${index}`);
            }

            return `${SUPABASE_URL}/storage/v1/object/public/artura/${encodeURIComponent(storagePath)}`;
        })
    );
}