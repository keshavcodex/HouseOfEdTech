'use server';

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { z } from "zod";

const curriculumSchema = z.object({
  modules: z.array(z.object({
    title: z.string().describe("The concise, professional title of the module."),
    content: z.string().describe("A 2-3 sentence overview or description of what this module covers.")
  })).describe("An ordered list of modules for the curriculum.")
});

export async function generateCurriculum(title: string, description: string, difficulty: string) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return { success: false, error: "GEMINI_API_KEY is not configured in .env.local" };
    }

    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      temperature: 0.7,
      apiKey: process.env.GEMINI_API_KEY,
    });

    const structuredLlm = llm.withStructuredOutput(curriculumSchema);

    const result = await structuredLlm.invoke(`
      You are an expert curriculum designer. 
      The user is creating a learning path with the following details:
      Title: "${title}"
      Difficulty: "${difficulty}"
      Description: "${description}"

      Generate a comprehensive, logical, and step-by-step curriculum for this course. 
      Return an ordered list of 4-8 modules, including a concise professional title and a descriptive content overview for each.
    `);

    return { success: true, data: result.modules };
  } catch (error: any) {
    console.error("AI Generation failed:", error);
    return { success: false, error: error.message || "Failed to generate curriculum." };
  }
}
