
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GroundingMetadata } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeImage = async (prompt: string, imageData: string, mimeType: string): Promise<string> => {
  try {
    const imagePart = {
      inlineData: {
        data: imageData,
        mimeType,
      },
    };
    const textPart = { text: prompt };

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
    });

    return response.text;
  } catch (error) {
    console.error("Error analyzing image:", error);
    if (error instanceof Error) {
        return `An error occurred: ${error.message}. Please check the console for more details.`;
    }
    return "An unknown error occurred while analyzing the image.";
  }
};

export const groundedQuery = async (prompt: string): Promise<{ text: string; groundingMetadata: GroundingMetadata | null }> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
      },
    });

    const groundingMetadata = response.candidates?.[0]?.groundingMetadata ?? null;

    return { text: response.text, groundingMetadata };
  } catch (error) {
    console.error("Error with grounded query:", error);
    if (error instanceof Error) {
        return { text: `An error occurred: ${error.message}. Please check the console for more details.`, groundingMetadata: null };
    }
    return { text: "An unknown error occurred during the grounded query.", groundingMetadata: null };
  }
};
