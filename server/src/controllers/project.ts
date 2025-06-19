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
import { calculateImageGenerationCost, createStorageUrl, isValidUsage, hasValidImageData } from "../utils";

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

// TODO: must validate the request body with ProjectValidator
export const designGenerator = async (req: Request, res: Response) => {
    console.log('-------------------------------');
    const { files } = req;
    const { n, prompt, size, output_format, quality } = req.body;

    if (Array.isArray(files) && files.length > 0) {
        console.log(files);
        console.log('files exist');
    } else {
        console.log('files does not exist');
    }

    // const imgResponse = await openAiClient.images.generate({
    //     model: "gpt-image-1",
    //     prompt,
    //     n: 1,
    //     size,
    //     quality,
    //     background: "auto",
    // });

    // if (!imgResponse.data) {
    //     throw new BadRequestException(ErrorCode.BAD_REQUEST, "Image data is undefined.");
    // }

    // const usage = imgResponse.usage;

    // if (!isValidUsage(usage)) {
    //     throw new BadRequestException(ErrorCode.BAD_REQUEST, "Incomplete usage data from OpenAI.");
    // }`

    // const upload = await Promise.all(
    //     imgResponse.data.map(async (data, index) => {
    //         if (!data.b64_json) {
    //             throw new BadRequestException(ErrorCode.BAD_REQUEST, `Image data is missing for image at index ${index}`);
    //         }

    //         const imageBuffer = Buffer.from(data.b64_json, "base64");
    //         const storagePath = createStorageUrl(req.auth.userId, index);

    //         const { data: filePath, error } = await supabaseClient.storage.from("artura").upload(storagePath, imageBuffer, { contentType: "image/png" });

    //         if (error) {
    //             throw new BadRequestException(ErrorCode.BAD_REQUEST, `Failed to upload image at index ${index} to storage.`);
    //         }

    //         return filePath;
    //     })
    // );

    // const imageUrls = upload.map(object => `${SUPABASE_URL}/storage/v1/object/public/${object.fullPath}`);

    // const { tokenCost, imageCost, totalCost } = calculateImageGenerationCost(
    //     {
    //         model: "gpt-image-1",
    //         size,
    //         quality,
    //         input_tokens_details: usage.input_tokens_details,
    //         output_tokens: usage.output_tokens,
    //     },
    //     false
    // );

    // const result = await prismaClient.$transaction(async (tx) => {
    //     const project = await tx.project.create({
    //         data: {
    //             category: "DESIGN_GENERATION",
    //             userId: req.auth.userId,
    //             prompt,
    //             size,
    //             quality,
    //         },
    //     });

    //     const images = await Promise.all(
    //         imageUrls.map((url) =>
    //             tx.image.create({
    //                 data: {
    //                     url,
    //                     projectId: project.id,
    //                 },
    //             })
    //         )
    //     );

    //     const imageGenerationResponse = await tx.imageGenerationResponse.create({
    //         data: {
    //             projectId: project.id,
    //             background: "auto",
    //             outputFormat: output_format,
    //             quality: "high",
    //             size,
    //             inputTokens: usage.input_tokens,
    //             imageTokens: usage.input_tokens_details.image_tokens,
    //             textTokens: usage.input_tokens_details.text_tokens,
    //             outputTokens: usage.output_tokens,
    //             totalTokens: usage.total_tokens,
    //             imageCost,
    //             tokenCost,
    //             totalCost,
    //         },
    //     });

    //     return { project, images, imageGenerationResponse };
    // });

    res.status(200).json({ result: 'wow' });
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
