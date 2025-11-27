import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
export const genAI = new GoogleGenerativeAI(apiKey);

export const getModel = (modelName: string = "gemini-2.5-flash") => {
  return genAI.getGenerativeModel({ model: modelName });
};
