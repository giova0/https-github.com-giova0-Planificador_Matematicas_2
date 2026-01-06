
import { GoogleGenAI, Type } from "@google/genai";
import { LessonFormData, GeneratedContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLessonPlan = async (data: LessonFormData): Promise<GeneratedContent> => {
  const model = 'gemini-3-pro-preview';
  
  const prompt = `Eres un coordinador académico experto del Colegio Marruecos y Molinos I.E.D. en Bogotá.
  Tu misión es diseñar una planeación pedagógica de excelencia para el docente ${data.teacherName} en la asignatura de ${data.subject}.
  
  PEI Institucional: "Respuesta a un sueño de crecer juntos y ser felices mientras aprehendemos".
  Nivel: Grado ${data.grade}.
  Tema central: ${data.topic}.
  Objetivo/Propósito: ${data.generalObjectives}.
  
  INSTRUCCIONES:
  1. Genera 3 actividades obligatoriamente siguiendo la estructura: "Inicio" (motivación/saberes previos), "Desarrollo" (conceptualización/práctica) y "Cierre" (evaluación/conclusión).
  2. Crea una rúbrica de evaluación con 3 criterios enfocados en competencias para el contexto de educación distrital.
  3. El tono debe ser profesional, pedagógico y centrado en el estudiante.
  
  Responde estrictamente en formato JSON.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          suggestedActivities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                phase: { type: Type.STRING, enum: ["Inicio", "Desarrollo", "Cierre"] },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                duration: { type: Type.STRING }
              },
              required: ["phase", "title", "description", "duration"]
            }
          },
          rubric: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                aspect: { type: Type.STRING },
                excellent: { type: Type.STRING, description: "Desempeño Superior" },
                good: { type: Type.STRING, description: "Desempeño Básico" },
                needsImprovement: { type: Type.STRING, description: "Desempeño Bajo" }
              },
              required: ["aspect", "excellent", "good", "needsImprovement"]
            }
          },
          summary: { type: Type.STRING }
        },
        required: ["suggestedActivities", "rubric", "summary"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Error en la conexión con la IA.");
  
  return JSON.parse(text) as GeneratedContent;
};
