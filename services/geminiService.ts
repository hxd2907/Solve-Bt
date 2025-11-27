import { GoogleGenerativeAI } from '@google/generative-ai';
import { Language, SolutionResult, TestCase } from '../types';

// ✅ Đọc API key từ environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.API_KEY;

if (!API_KEY) {
  throw new Error('GEMINI_API_KEY is not configured. Please set it in Vercel environment variables.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function solveProblem(
  imageDataBase64: string,
  mimeType: string,
  language: Language
): Promise<SolutionResult> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `Bạn là một chuyên gia lập trình. Phân tích bài tập trong ảnh/PDF và:

1. Giải thích chi tiết bài toán bằng tiếng Việt
2. Viết code ${language} hoàn chỉnh và tối ưu
3. Tạo 20 test cases (10 basic, 5 edge cases, 5 stress tests)

Format trả về JSON:
{
  "markdown": "# Phân tích bài toán\\n\\n...",
  "rawCode": "code không có markdown backticks",
  "testCases": [
    {"input": "...", "output": "..."}
  ]
}`;

    const result = await model.generateContent([
      {
        inlineData: {
          data: imageDataBase64,
          mimeType: mimeType
        }
      },
      prompt
    ]);

    const response = await result.response;
    const text = response.text();
    
    // Parse JSON từ response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Không thể parse response từ Gemini');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    
    return {
      markdown: parsed.markdown || '',
      rawCode: parsed.rawCode || '',
      testCases: parsed.testCases || []
    };

  } catch (error: any) {
    console.error('Gemini API Error:', error);
    throw new Error(error.message || 'Lỗi khi gọi Gemini API');
  }
}
