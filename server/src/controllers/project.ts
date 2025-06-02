import { Request, Response } from "express";
import { openAiClient } from "../services/openai";
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
import { calculateImageGenerationCost, createStorageUrl } from "../utils";

import { SUPABASE_URL } from "../../secrets";


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

async function mockGenerateImage(): Promise<Buffer> {
    // Here you would call the OpenAI API, but we mock with reading a local file
    const absolutePath = path.resolve(__dirname, "../../../server/output.png");
    const imageBuffer = await readFile(absolutePath);
    return imageBuffer;
}

// TODO: must validate the request body with ProjectValidator
export const designGenerator = async (req: Request, res: Response) => {
    const { data: { n, prompt, size, output_format } } = req.body;

    const imgResponse = await openAiClient.images.generate({
        model: "gpt-image-1",
        prompt,
        n: 1,
        size,
        background: "auto",
    })

    if (!imgResponse.data || !imgResponse.data[0]?.b64_json) {
        throw new BadRequestException(
            ErrorCode.BAD_REQUEST, "Image data is undefined or invalid.",
        );
    }

    const base64Data = imgResponse.data[0].b64_json;
    const imageBuffer = Buffer.from(base64Data, "base64");
    // const imageBuffer = await mockGenerateImage()

    const storagePath = createStorageUrl(req.auth.userId); // check the extension provided by OPEN.AI
    const uploadResult = await supabaseClient.storage.from("artura").upload(storagePath, imageBuffer);

    if (uploadResult.error) throw new BadRequestException(ErrorCode.BAD_REQUEST, "Image could not be stored to Supabase Storage");

    const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/${uploadResult.data.fullPath}`;

    const result = await prismaClient.$transaction(async (tx) => {
        const project = await tx.project.create({
            data: {
                category: "DESIGN_GENERATION",
                userId: req.auth.userId,
                prompt,
                size,
                quality: "HIGH",
            },
        });

        const image = await tx.image.create({
            data: {
                url: imageUrl,
                projectId: project.id,
            },
        });

        const imgResponseData = { ...imgResponse.usage, model: "gpt-image-1", size, quality: "high" }

        const { tokenCost, imageCost, totalCost } = calculateImageGenerationCost(imgResponseData, false);

        const imageGenerationResponse = await tx.imageGenerationResponse.create({
            data: {
                projectId: project.id,
                background: "auto", // from your input or a constant
                outputFormat: output_format, // default or from your input if you have it
                quality: "high", // default or from your input
                size,

                inputTokens: imgResponse.usage?.input_tokens!,
                imageTokens: imgResponse.usage?.input_tokens_details?.image_tokens!,
                textTokens: imgResponse.usage?.input_tokens_details?.text_tokens!,
                outputTokens: imgResponse.usage?.output_tokens!,
                totalTokens: imgResponse.usage?.total_tokens!,

                imageCost,
                tokenCost,
                totalCost
            },
        });

        return { project, image, imageGenerationResponse };
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
