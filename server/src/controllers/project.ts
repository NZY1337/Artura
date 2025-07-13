import { Request, Response } from "express";
import { openAiClient } from "../services/openai";
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
import type { FileLike } from "openai/uploads";

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


const mockRes = {
    project: {
        id: "bbb7b7b2-4468-4329-a11e-b9eccdc6a333",
        userId: "user_2xrVpetV8CkDDyfbJPSXmsrRe57",
        category: "DESIGN_GENERATION",
        createdAt: "2025-06-19T13:28:53.399Z",
        updatedAt: "2025-06-19T13:28:53.399Z",
        prompt:
            "Create a super realistic 3d rendering of this architectural rendering.. Do not change the positions of the walls, and maintain lines in the same exact position as they are in the plan, but add furniture and finishes and textures and depth.",
        background: "AUTO",
        outputFormat: "PNG",
        quality: "HIGH",
        size: "SIZE_1536x1024",
        designTheme: "MODERN",
        spaceType: "LIVING_ROOM",
        n: 1
    },
    images: [
        {
            id: "e027ce3b-1ae4-4948-87aa-922ed335d3b9",
            url: "https://yfyiqiqqwgdvmazcgdnv.supabase.co/storage/v1/object/public/artura/user_2xrVpetV8CkDDyfbJPSXmsrRe57/uploaded-user_2xrVpetV8CkDDyfbJPSXmsrRe57-1750017353067-0.png",
            projectId: "bbb7b7b2-4468-4329-a11e-b9eccdc6a333",
            createdAt: "2025-06-19T13:28:53.494Z",
        },
        {
            id: "e027ce3b-1ae4-4948-87aa-922ed335d3b1",
            url: "https://yfyiqiqqwgdvmazcgdnv.supabase.co/storage/v1/object/public/artura/user_2xrVpetV8CkDDyfbJPSXmsrRe57/generated-user_2xrVpetV8CkDDyfbJPSXmsrRe57-1750024202715-0.png",
            projectId: "bbb7b7b2-4468-4329-a11e-b9eccdc6a333",
            createdAt: "2025-06-19T13:28:53.494Z",
        },
    ],
    imageGenerationResponse: {
        id: "93d1f1d9-b68b-45bc-97f9-4c5860eb7f9f",
        projectId: "bbb7b7b2-4468-4329-a11e-b9eccdc6a333",
        inputTokens: 402,
        imageTokens: 323,
        textTokens: 79,
        outputTokens: 1568,
        totalTokens: 1970,
        imageCost: 0.25,
        tokenCost: 0.06634500000000002,
        totalCost: 0.316345,
    },
}

const mockedImages = [
    'https://yfyiqiqqwgdvmazcgdnv.supabase.co/storage/v1/object/public/artura/user_2xrVpetV8CkDDyfbJPSXmsrRe57/uploaded-user_2xrVpetV8CkDDyfbJPSXmsrRe57-1750017353067-0.png',
    'https://yfyiqiqqwgdvmazcgdnv.supabase.co/storage/v1/object/public/artura/user_2xrVpetV8CkDDyfbJPSXmsrRe57/generated-user_2xrVpetV8CkDDyfbJPSXmsrRe57-1750024202715-0.png'
]

export const designGeneratorUpload = async (req: Request, res: Response) => {
    const { userId } = req.auth;
    const { files }  = req;

    const validationResult = ProjectValidator.safeParse(req.body);

    if (!validationResult.success) throw new BadRequestException(ErrorCode.BAD_REQUEST, "Invalid request body");

    const { n, prompt, size, outputFormat, quality, category, spaceType, designTheme } = validationResult.data;

    // if it's image generation - no images are uploaded - else it should be image editing
    const isGenerationEndpoint = category === "DESIGN_GENERATION";

    // res body is the same for both endpoints
    let imgResponse = null;

    if (isGenerationEndpoint) {
        imgResponse = await openaiService.generate({ prompt, n, size, quality });
    } else {
        imgResponse = await openaiService.edit({ prompt, n, size, quality, files: (files as Express.Multer.File[]) ?? []});
    }

    // if the openai response is valid -> do the rest of computation
    if (!imgResponse.data) {
        throw new BadRequestException(ErrorCode.BAD_REQUEST, "Image data is undefined.");
    }

    const usage = imgResponse.usage;

    if (!isValidUsage(usage)) {
        throw new BadRequestException(ErrorCode.BAD_REQUEST, "Incomplete usage data from OpenAI.");
    }

    const generatedImagesUrls = await uploadGeneratedImagesToSupabase(userId, imgResponse.data);
    const uploadedImagesUrls  = isGenerationEndpoint ? [] : await uploadUploadedImagesToSupabase(userId, files as Express.Multer.File[]);
    const allImages           = [...generatedImagesUrls, ...uploadedImagesUrls];

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
