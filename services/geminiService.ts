
import { GoogleGenAI, Type } from "@google/genai";
import { AssessmentResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getCareAdvice(result: AssessmentResult) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Analyze the following medical assessment:
        Type: ${result.type}
        Score: ${result.score}/10 (or equivalent scale)
        
        Provide professional, compassionate advice in THAI language. 
        Focus on management strategy for high scores.
        Format the response as JSON with fields: 'summary', 'dangerSigns', 'recommendation'.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "สรุปอาการของผู้ป่วย" },
            dangerSigns: { type: Type.STRING, description: "สัญญาณอันตรายที่ต้องระวัง" },
            recommendation: { type: Type.STRING, description: "คำแนะนำการพยาบาล" }
          },
          required: ["summary", "dangerSigns", "recommendation"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}
