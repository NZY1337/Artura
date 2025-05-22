import { Request, Response } from "express";
import { openAiClient } from "../utils/openai";
import { supabaseClient } from "../utils/supabase";
import { writeFile, readFile } from "fs/promises";
import { BadRequestException, ErrorCode, NotFoundException } from "../middlewares/errorMiddleware";
import path from "path";
import { prismaClient } from "../utils/prismaClient";

import { ProjectValidator } from "../validation/project";

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

async function mockGenerateImage(): Promise<Buffer> {
    // Here you would call the OpenAI API, but we mock with reading a local file
    const absolutePath = path.resolve(__dirname, "../../../server/output1.png");
    const imageBuffer = await readFile(absolutePath);
    return imageBuffer;
}

export const createProject = async (req: Request, res: Response) => {
    // const { data: { n, prompt, size, output_format } } = req.body;
    // const { data } = req.body;


    // call OPEN AI for image generation with all the data
    const imageBuffer = await mockGenerateImage()
    const fileName = `generated-${Date.now()}.png`; // check the extension provided by OPEN.AI

    const uploadResult = await supabaseClient.storage.from('artura').upload(fileName, imageBuffer)

    if (uploadResult.error) {
        throw new BadRequestException(ErrorCode.BAD_REQUEST, 'Image could not be stored to Prisma DB Storage');
    }

    const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/${uploadResult.data.fullPath}`;

    // Step 3: Create project AND image record inside one Prisma transaction
    const result = await prismaClient.$transaction(async (tx) => {
        const project = await tx.project.create({
            data: {
                title: 'My first project',
                description: 'this is a self description text',
                category: 'DESIGN_GENERATION',
                userId: req.auth.userId
            }
        });

        const image = await tx.image.create({
            data: {
                url: imageUrl,
                projectId: project.id,
            },
        });

        return { project, image };
    });

    console.log(result)
    res.status(200).json({ result });
}

export const getProjects = async (req: Request, res: Response) => {
    const projects = await prismaClient.project.findMany();

    res.status(200).json({ projects })
}