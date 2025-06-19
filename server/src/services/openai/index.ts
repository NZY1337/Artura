import { OPENAI_API_KEY, OPENAI_PROJECT_ID } from "../../../secrets";
import OpenAI from "openai";

export const openAiClient = new OpenAI({
    apiKey: OPENAI_API_KEY,
    project: OPENAI_PROJECT_ID,
});
