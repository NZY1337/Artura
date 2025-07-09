import { Request, Response } from "express";
import { openAiClient } from "../services/openai";
import { toFile, } from "openai";
import type { FileLike } from "openai/uploads";
import { supabaseClient } from "../services/supabase";
import { writeFile, readFile } from "fs/promises";
import {
    BadRequestException,
    ErrorCode,
    NotFoundException,
} from "../middlewares/errorMiddleware";
import path from "path";
import { prismaClient } from "../services/prismaClient";

import { ProjectValidator } from "../validation/project";
import { calculateImageGenerationCost, createStorageUrl, isValidUsage, uploadGeneratedImagesToSupabase, uploadUploadedImagesToSupabase, hasValidImageData } from "../utils";

import { SUPABASE_URL } from "../../secrets";

// !! extract Artura to ENV 

// https://yfyiqiqqwgdvmazcgdnv.supabase.co - SUPABASE_URL

// {
//   path: 'generated-1747863520295.png',
//   id: 'e413a45c-6cf9-4285-a856-bead89f02f09',
//   fullPath: 'artura/generated-1747863520295.png'
// }

// const mockFilepath = SUPABASE_URL + '/storage/v1/object/public/' + fullPath

// https://yfyiqiqqwgdvmazcgdnv.supabase.co/storage/v1/object/public/artura/generated-1747863520295.png

// const validatedData = ProjectValidator.parse(data);

// Removed invalid prismaClient.project.create call with incorrect data shape
// const asd = await prismaClient.project.create({
//     data: {
//         ...validatedData
//     }
// })

// const prompt = `A stunning modern kitchen interior with a minimalist design, featuring sleek white cabinets with matte finish, a large central island with a marble countertop, built-in stainless steel appliances, soft ambient lighting under cabinets, wooden flooring in a light oak tone, and large floor-to-ceiling windows that flood the space with natural light. Accents of black and brushed gold add elegance, with a few green plants for a touch of nature.
// Scandinavian and contemporary design elements combined in a spacious, luxurious layout - ultra-clean, airy, and functional`;

// // Types for the response
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

async function mockGenerateImage(): Promise<Buffer> {
    // Here you would call the OpenAI API, but we mock with reading a local file
    const absolutePath = path.resolve(__dirname, "../../../server/output.png");
    const imageBuffer = await readFile(absolutePath);
    return imageBuffer;
}

const mockRes = {
    project: {
        id: "bbb7b7b2-4468-4329-a11e-b9eccdc6a333",
        userId: "user_2xrVpetV8CkDDyfbJPSXmsrRe57",
        category: "DESIGN_GENERATION",
        createdAt: "2025-06-19T13:28:53.399Z",
        updatedAt: "2025-06-19T13:28:53.399Z",
        prompt:
            "Create a super realistic 3d rendering of this architectural rendering.. Do not change the positions of the walls, and maintain lines in the same exact position as they are in the plan, but add furniture and finishes and textures and depth.",
        background: "auto",
        outputFormat: "png",
        quality: "high",
        size: "1536x1024",
        designTheme: "MODERN",
        spaceType: "LIVING_ROOM",
        n: 1
    },
    images: [
        {
            id: "e027ce3b-1ae4-4948-87aa-922ed335d3b9",
            url: "https://yfyiqiqqwgdvmazcgdnv.supabase.co/storage/v1/object/public/artura/user_2xrVpetV8CkDDyfbJPSXmsrRe57/generated-user_2xrVpetV8CkDDyfbJPSXmsrRe57-1750339732317-0.png",
            projectId: "bbb7b7b2-4468-4329-a11e-b9eccdc6afc2",
            createdAt: "2025-06-19T13:28:53.494Z",
        },
    ],
    imageGenerationResponse: {
        id: "93d1f1d9-b68b-45bc-97f9-4c5860eb7f9f",
        projectId: "bbb7b7b2-4468-4329-a11e-b9eccdc6afc2",
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

// !! TODO: must validate the request body with ProjectValidator
// !! TODO: must validate the request body with ProjectValidator
// !! TODO: must validate the request body with ProjectValidator

// call the route in FE
export const designGenerator = async (req: Request, res: Response) => {
    const userId = req.auth.userId;
    const { files } = req;
    const { n, prompt, size, outputFormat, quality, category } = req.body;

    const imgResponse = await openAiClient.images.generate({
        model: "gpt-image-1",
        prompt,
        n: 1,
        size,
        quality,
        background: "auto",
    });

    if (!imgResponse.data) {
        throw new BadRequestException(ErrorCode.BAD_REQUEST, "Image data is undefined.");
    }

    const usage = imgResponse.usage;

    if (!isValidUsage(usage)) {
        throw new BadRequestException(ErrorCode.BAD_REQUEST, "Incomplete usage data from OpenAI.");
    }

    const generatedImagesUrls = await uploadGeneratedImagesToSupabase(userId, imgResponse.data);

    const { tokenCost, imageCost, totalCost } = calculateImageGenerationCost(
        {
            model: "gpt-image-1",
            size,
            quality,
            input_tokens_details: usage.input_tokens_details,
            output_tokens: usage.output_tokens,
        },
        false
    );

    const result = await prismaClient.$transaction(async (tx) => {
        const project = await tx.project.create({
            data: {
                category: category,
                userId: userId,
                prompt,
                size,
                quality,
            },
        });

        const images = await Promise.all(
            generatedImagesUrls.map((url) =>
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

/*
 - Handles file uploads and generates images using OpenAI
 - Uploads files to OpenAI and Supabase from client with Multer
 - Calculates image generation cost using OpenAI's pricing model
 - Creates project and image records in the database using Prisma's transaction model
 - Returns a JSON response with project, images, and image generation response data 

 * after the response is successfully returned by openai -> we save everything inside db
*/

export const designGeneratorUpload = async (req: Request, res: Response) => {
    const userId = req.auth.userId;
    const { files } = req;
    const { n, prompt, size, outputFormat, quality, category, spaceType, designTheme } = req.body;

    console.log({ userId, files, body: req.body })

    // if the user uploads refference images -> these need to be uploaded to openai -> and then we need to upload them to supabase
    let openaiUploadedImages: FileLike[] = [];

    if (Array.isArray(files) && files.length > 0) {
        const openAiFiles = await Promise.all(
            files.map((file) =>
                toFile(file.buffer, file.originalname, {
                    type: file.mimetype,
                })
            )
        );

        openaiUploadedImages = [...openAiFiles]
    } else {
        throw new BadRequestException(ErrorCode.BAD_REQUEST, "No files uploaded.");
    }

    const imgResponse = await openAiClient.images.edit({
        model: "gpt-image-1",
        image: openaiUploadedImages,
        prompt,
        n,
        size,
        quality,
    });

    console.log(imgResponse, 'img Response')

    // if the openai response is valid -> do the rest of computation
    if (!imgResponse.data) {
        throw new BadRequestException(ErrorCode.BAD_REQUEST, "Image data is undefined.");
    }

    const usage = imgResponse.usage;

    if (!isValidUsage(usage)) {
        throw new BadRequestException(ErrorCode.BAD_REQUEST, "Incomplete usage data from OpenAI.");
    }

    const generatedImagesUrls = await uploadGeneratedImagesToSupabase(userId, imgResponse.data);
    const uploadedImagesUrls = await uploadUploadedImagesToSupabase(userId, files as Express.Multer.File[]);
    const allImages = [...generatedImagesUrls, ...uploadedImagesUrls];

    const { tokenCost, imageCost, totalCost } = calculateImageGenerationCost(
        {
            model: "gpt-image-1",
            size,
            quality,
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
                background: "auto",
                outputFormat,
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

// get all projects per user
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
