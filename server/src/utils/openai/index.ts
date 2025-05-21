import { Request, Response } from "express";
import { OPENAI_API_KEY } from "../../../secrets";

import OpenAI from "openai";
import { writeFile } from "fs/promises";

const client = new OpenAI({
    apiKey: OPENAI_API_KEY,
    project: "proj_HT7S3fecqy6rX13pfHXpW9rz"
});

export const generateProject = async (req: Request, res: Response) => {
    const { prompt } = req.body;
    const img = await client.images.generate({
        model: "gpt-image-1",
        prompt: prompt,
        n: 1,
        size: "1024x1024"
    });

    // if (!img.data || !img.data[0]?.b64_json) {
    //     throw new Error("Image data is undefined or invalid.");
    // }
    const imageBuffer = Buffer.from(img, "base64");
    await writeFile("output.png", imageBuffer);
}
