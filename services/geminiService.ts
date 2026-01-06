import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// IMPORTANT: The API key is sourced from process.env.API_KEY as per strict guidelines.
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const getStudyAdvice = async (
  context: string,
  scores: Record<string, any>
): Promise<string> => {
  const client = getClient();
  if (!client) return "Vui lòng cấu hình API Key để sử dụng tính năng AI.";

  try {
    const prompt = `
      Bạn là một giáo viên tâm lý, giàu kinh nghiệm và vui tính.
      Hãy phân tích tình hình học tập của học sinh dựa trên dữ liệu sau:
      Bối cảnh: ${context}
      Điểm số hiện tại: ${JSON.stringify(scores)}

      Hãy đưa ra lời khuyên ngắn gọn (khoảng 100-150 từ), khích lệ tinh thần, chỉ ra điểm cần cải thiện và một mẹo học tập nhỏ.
      Sử dụng giọng văn thân thiện, hiện đại (Gen Z), có thể dùng emoji.
      Định dạng kết quả bằng Markdown.
    `;

    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster response
      }
    });

    return response.text || "AI đang suy nghĩ, thử lại sau nhé!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Có lỗi khi kết nối với AI giáo viên. Vui lòng thử lại sau.";
  }
};