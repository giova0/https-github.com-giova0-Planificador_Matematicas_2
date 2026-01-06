
import { GoogleGenAI, Type } from "@google/genai";
import { LessonFormData, GeneratedContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLessonPlan = async (data: LessonFormData): Promise<GeneratedContent> => {
  const model = 'gemini-3-pro-preview';
  
  const prompt = `Actúa como Coordinador Pedagógico del Colegio Marruecos y Molinos I.E.D.
  Diseña una planeación de clase y una GUÍA DE APRENDIZAJE EXTENSA para el docente ${data.teacherName}.
  Tema: ${data.topic}. Grado: ${data.grade}. Asignatura: ${data.subject}.
  
  REQUISITOS DE CONTENIDO (JSON):
  1. Planeación Docente: 3 actividades (Inicio, Desarrollo, Cierre).
  2. Guía Estudiante - Introducción: Un texto motivador y objetivos para el alumno.
  3. Guía Estudiante - Cierre: Actividades de autoevaluación y reflexión final (Se mostrará después de la intro).
  4. Guía Estudiante - Desarrollo Pág 1: Fundamentación teórica y definiciones clave.
  5. Guía Estudiante - Desarrollo Pág 2: Ejemplos resueltos detallados y análisis de casos.
  6. Guía Estudiante - Desarrollo Pág 3: Taller de ejercicios prácticos y retos de aplicación.
  7. Rúbrica: 3 criterios de evaluación.

  Asegúrate de que el contenido de desarrollo sea lo suficientemente extenso para llenar 3 páginas completas de papel A4.
  Responde únicamente con el objeto JSON estructurado.`;

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
                phase: { type: Type.STRING },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                duration: { type: Type.STRING }
              }
            }
          },
          studentIntro: { type: Type.STRING },
          studentClosure: { type: Type.STRING },
          devPage1: { type: Type.STRING },
          devPage2: { type: Type.STRING },
          devPage3: { type: Type.STRING },
          rubric: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                aspect: { type: Type.STRING },
                excellent: { type: Type.STRING },
                good: { type: Type.STRING },
                needsImprovement: { type: Type.STRING }
              }
            }
          },
          summary: { type: Type.STRING }
        },
        required: ["suggestedActivities", "studentIntro", "studentClosure", "devPage1", "devPage2", "devPage3", "rubric", "summary"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No se pudo generar el contenido.");
  
  return JSON.parse(text) as GeneratedContent;
};
