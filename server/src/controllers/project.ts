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

import { SUPABASE_URL } from "../../secrets";

import type { ImageGenerationResponseProps } from "../../types";

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

// const img = await openAiClient.images.generate({
//     model: "gpt-image-1",
//     prompt,
//     n: 1,
//     size: "1024x1024"
// });

// if (!img.data || !img.data[0]?.b64_json) {
//     throw new NotFoundException(
//         ErrorCode.NOT_FOUND,
//         "Image data is undefined or invalid.", // message
//     );
// }

// const imageBase64 = img.data[0].b64_json;
// const imageBuffer = Buffer.from(imageBase64, "base64");
// await writeFile("output1.png", imageBuffer);

// console.log(img);
// const finalImage = `data:image/png;base64,${imageBase64}`

// Types for the request
// export interface ImageRequest {
//   n: number;
//   prompt: string;
//   size: string;
//   output_format: "png" | "webp";
// }

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

export const designGenerator = async (req: Request, res: Response) => {
  const {
    data: { n, prompt, size, output_format },
  } = req.body;
  // const { data } = req.body;

  console.log({ n, prompt, size, output_format });

  const imgResponse = (await openAiClient.images.generate({
    model: "gpt-image-1",
    prompt,
    n: 1,
    size,
    background: "auto",
  })) as ImageGenerationResponseProps;

  console.log(imgResponse);

  if (!imgResponse.data || !imgResponse.data[0]?.b64_json) {
    throw new NotFoundException(
      ErrorCode.NOT_FOUND,
      "Image data is undefined or invalid." // message
    );
  }

  const base64Data = imgResponse.data[0].b64_json;
  const imageBuffer = Buffer.from(base64Data, "base64");

  // call OPEN AI for image generation with all the data
  // const imageBuffer = await mockGenerateImage()
  const storagePath = `${req.auth.userId}/generated-${
    req.auth.userId
  }-${Date.now()}.png`; // check the extension provided by OPEN.AI

  const uploadResult = await supabaseClient.storage
    .from("artura")
    .upload(storagePath, imageBuffer);

  if (uploadResult.error) {
    throw new BadRequestException(
      ErrorCode.BAD_REQUEST,
      "Image could not be stored to Prisma DB Storage"
    );
  }

  const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/${uploadResult.data.fullPath}`;

  // Step 3: Create project AND image record inside one Prisma transaction
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

    const imageGenerationResponse = await tx.imageGenerationResponse.create({
      data: {
        projectId: project.id,
        background: "auto", // from your input or a constant
        outputFormat: output_format, // default or from your input if you have it
        quality: "high", // default or from your input
        size,

        inputTokens: imgResponse.usage?.input_tokens ?? 0,
        imageTokens: imgResponse.usage?.input_tokens_details?.image_tokens ?? 0,
        textTokens: imgResponse.usage?.input_tokens_details?.text_tokens ?? 0,
        outputTokens: imgResponse.usage?.output_tokens ?? 0,
        totalTokens: imgResponse.usage?.total_tokens ?? 0,

        imageCost: 1.36,
        tokenCost: 0.003,
        totalCost: 1.363,
      },
    });

    return { project, image, imageGenerationResponse };
  });

  res.status(200).json({ result: result });
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
