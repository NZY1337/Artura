import { Request, Response } from "express";
import { OPENAI_API_KEY } from "../../secrets";

import OpenAI from "openai";
import { writeFile } from "fs/promises";

const client = new OpenAI({
    apiKey: OPENAI_API_KEY,
    project: "proj_HT7S3fecqy6rX13pfHXpW9rz"
});

export const createProject = async (req: Request, res: Response) => {
    const { data } = req.body;
    console.log(data)

    res.status(200).json({ message: 'data send successfully' });
}
