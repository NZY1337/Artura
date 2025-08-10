import { Request, Response } from "express";
import { prismaClient } from "../services/prismaClient";
import { ProjectValidator } from "../validation/project";

// services
import { openaiService } from "../services/openai/openai";

// middleware
import {
    BadRequestException,
    ErrorCode,
    NotFoundException,
} from "../middlewares/errorMiddleware";

// types
import type { SizeImageProps, QualityFormatProps } from "../../types";

// helpers
import {
    calculateImageGenerationCost,
    isValidUsage,
    uploadGeneratedImagesToSupabase,
    uploadUploadedImagesToSupabase,
    sizeMap,
    qualityMap,
    MODEL_NAME,
    BACKGROUND_MODE
} from "../utils";

// export interface ImageResponse {
//   created: number;
//   background: "transparent" | "opaque" | "auto";
//   data: {
//     b64_json: string;
//   }[];
//   output_format: "png" | "webp";
//   quality: "low" | "medium" | "high";
//   size: string;
//   usage: {
//     input_tokens: number;
//     output_tokens: number;
//     input_tokens_details: {
//       image_tokens: number;
//       text_tokens: number;
//     };
//     total_tokens: number;
//   };
// }

// https://yfyiqiqqwgdvmazcgdnv.supabase.co/storage/v1/object/public/artura/user_2xrVpetV8CkDDyfbJPSXmsrRe57/generated-user_2xrVpetV8CkDDyfbJPSXmsrRe57-1748797755897.png
// https://yfyiqiqqwgdvmazcgdnv.supabase.co/storage/v1/object/public/artura/artura/user_2xrVpetV8CkDDyfbJPSXmsrRe57/generated-user_2xrVpetV8CkDDyfbJPSXmsrRe57-1748888792317-0.png"


export const designGenerator = async (req: Request, res: Response) => {
    const { userId } = req.auth;

    console.log("Request body:", req.body); // Debug log

    const validationResult = ProjectValidator.safeParse(req.body);

    if (!validationResult.success) {
        console.log("Validation errors:", validationResult.error.errors); // Debug log
        throw new BadRequestException(ErrorCode.BAD_REQUEST, `Invalid request body: ${JSON.stringify(validationResult.error.errors)}`);
    }

    const { n, prompt, size, outputFormat, quality, category, spaceType, designTheme } = validationResult.data;

    //! OPENAI API call for design generation
    const imgResponse = await openaiService.generate({ prompt, n, size, quality });

    if (!imgResponse.data) throw new BadRequestException(ErrorCode.BAD_REQUEST, "Image data is undefined.");

    const usage = imgResponse.usage;

    if (!isValidUsage(usage)) throw new BadRequestException(ErrorCode.BAD_REQUEST, "Incomplete usage data from OpenAI.");

    const generatedImages = await uploadGeneratedImagesToSupabase(userId, imgResponse.data);

    const { tokenCost, imageCost, totalCost } = calculateImageGenerationCost({
        model: MODEL_NAME,
        size: sizeMap[size as SizeImageProps],
        quality: qualityMap[quality as QualityFormatProps],
        input_tokens_details: usage.input_tokens_details,
        output_tokens: usage.output_tokens,
    },
        false
    );

    const result = await prismaClient.$transaction(async (tx) => {
        const project = await tx.project.create({
            data: {
                category,
                spaceType,
                designTheme,
                userId,
                prompt,
                size,
                quality,
                background: BACKGROUND_MODE,
                outputFormat,
                n
            },
        });

        const images = await Promise.all(
            generatedImages.map((url) =>
                tx.image.create({
                    data: {
                        url,
                        projectId: project.id,
                    },
                })
            )
        );

        const imageGenerationResponse = await tx.imageGenerationResponse.create({
            data: {
                projectId: project.id,
                inputTokens: usage.input_tokens,
                imageTokens: usage.input_tokens_details.image_tokens,
                textTokens: usage.input_tokens_details.text_tokens,
                outputTokens: usage.output_tokens,
                totalTokens: usage.total_tokens,
                imageCost,
                tokenCost,
                totalCost,
            },
        });

        return { project, images, imageGenerationResponse };
    });

    res.status(200).json({ result });
};

export const designEditor = async (req: Request, res: Response) => {
    const { userId } = req.auth;
    const { files } = req;

    console.log("Request body:", req.body); // Debug log

    const validationResult = ProjectValidator.safeParse(req.body);

    if (!validationResult.success) {
        console.log("Validation errors:", validationResult.error.errors); // Debug log
        throw new BadRequestException(ErrorCode.BAD_REQUEST, `Invalid request body: ${JSON.stringify(validationResult.error.errors)}`);
    }

    const { n, prompt, size, outputFormat, quality, category, spaceType, designTheme } = validationResult.data;

    // Ensure files are provided for editing
    if (!files || !Array.isArray(files) || files.length === 0) {
        throw new BadRequestException(ErrorCode.BAD_REQUEST, "Image files are required for design editing.");
    }

    //! OPENAI API call for design editing
    const imgResponse = await openaiService.edit({ prompt, n, size, quality, files: files as Express.Multer.File[] });

    // if the openai response is valid -> do the rest of computation
    if (!imgResponse.data) throw new BadRequestException(ErrorCode.BAD_REQUEST, "Image data is undefined.");

    const usage = imgResponse.usage;

    if (!isValidUsage(usage)) throw new BadRequestException(ErrorCode.BAD_REQUEST, "Incomplete usage data from OpenAI.");

    const generatedImages = await uploadGeneratedImagesToSupabase(userId, imgResponse.data);
    const uploadedImages = await uploadUploadedImagesToSupabase(userId, files as Express.Multer.File[]);
    const allImages = [...generatedImages, ...uploadedImages];

    const { tokenCost, imageCost, totalCost } = calculateImageGenerationCost({
        model: MODEL_NAME,
        size: sizeMap[size as SizeImageProps],
        quality: qualityMap[quality as QualityFormatProps],
        input_tokens_details: usage.input_tokens_details,
        output_tokens: usage.output_tokens,
    },
        false
    );

    const result = await prismaClient.$transaction(async (tx) => {
        const project = await tx.project.create({
            data: {
                category,
                spaceType,
                designTheme,
                userId,
                prompt,
                size,
                quality,
                background: BACKGROUND_MODE,
                outputFormat,
                n
            },
        });

        const images = await Promise.all(
            allImages.map((url) =>
                tx.image.create({
                    data: {
                        url,
                        projectId: project.id,
                    },
                })
            )
        );

        const imageGenerationResponse = await tx.imageGenerationResponse.create({
            data: {
                projectId: project.id,
                inputTokens: usage.input_tokens,
                imageTokens: usage.input_tokens_details.image_tokens,
                textTokens: usage.input_tokens_details.text_tokens,
                outputTokens: usage.output_tokens,
                totalTokens: usage.total_tokens,
                imageCost,
                tokenCost,
                totalCost,
            },
        });

        return { project, images, imageGenerationResponse };
    });

    res.status(200).json({ result });
};

export const getProjects = async (req: Request, res: Response) => {
    const projects = await prismaClient.project.findMany({
        include: {
            images: true,
        },
        where: {
            userId: req.auth.userId,
        },
    });

    res.status(200).json({ projects });
};
