// src/services/geminiService.ts
import { GoogleGenerativeAI } from "@google/genai";

// Lấy API key từ biến môi trường Vite
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Khởi tạo client Gemini
export const genAI = new GoogleGenerativeAI(apiKey);

// Hàm tiện ích để gọi model
export const getModel = (modelName: string = "gemini-2.5-flash") => {
  return genAI.getGenerativeModel({ model: modelName });
};

// Ví dụ hàm gọi sinh code
export async function solveProblem(prompt: string) {
  const model = getModel();
  const result = await model.generateContent(prompt);
  return result.response.text();
}
