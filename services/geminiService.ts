
import { GoogleGenAI, Type } from "@google/genai";
import { LessonFormData, GeneratedContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLessonPlan = async (data: LessonFormData): Promise<GeneratedContent> => {
  const model = 'gemini-3-pro-preview';
  
  const prompt = `Actúa como un Autor de Libros de Texto Pedagógicos de Élite para el Colegio Marruecos y Molinos I.E.D.
  Diseña una OBRA PEDAGÓGICA MONUMENTAL de 15 páginas sobre el tema: ${data.topic}.
  
  REGLAS DE FORMATO PARA GUÍA-TALLER:
  1. ESPACIOS DE TRABAJO: Incluye intencionalmente espacios para que el estudiante complete o resuelva (ej: usa líneas de guiones bajos "__________" o puntos suspensivos en partes clave de los talleres y desafíos). 
  2. PUNTO APARTE: Cada ejemplo, enunciado y sección de teoría debe estar separado por dobles saltos de línea (\n\n) para una lectura clara y profesional.
  3. NO USES LATEX: Está prohibido el uso de símbolos de dólar ($). Escribe fórmulas en texto plano (ej: x^2, raiz de x).
  4. EXTENSIÓN: Genera contenido denso y explicativo para cubrir las 15 páginas.
  5. LENGUAJE: Académico y formal de grado ${data.grade}.

  ESTRUCTURA SOLICITADA (JSON):
  - suggestedActivities: Guía docente (Página 1).
  - studentIntro: Portada e introducción motivacional extensa (Página 2).
  - theoryPart1: Historia y conceptos base (Página 3).
  - theoryPart2: Marco conceptual y reglas (Página 4).
  - theoryPart3: Profundización técnica (Página 5).
  - examplesPart1: Casos de Estudio Resueltos Nivel I (Página 6).
  - examplesPart2: Casos de Estudio Resueltos Nivel II (Página 7).
  - examplesPart3: Casos de Estudio Resueltos Nivel III (Página 8).
  - challengesPart1: Desafíos Prácticos: Aplicaciones Reales (Página 9).
  - challengesPart2: Desafíos Prácticos: Modelado (Página 10).
  - productionPart1: Producción Estudiantil: Entrenamiento (Página 11).
  - productionPart2: Producción Estudiantil: Autónomo (Página 12).
  - productionPart3: Producción Estudiantil: Nivel Superior (Página 13).
  - rubric: Rúbrica detallada (Página 14).
  - studentClosure: Autoevaluación y Cierre (Página 15).
  - glossary: Glosario de términos.

  Responde solo con el JSON.`;

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
          theoryPart1: { type: Type.STRING },
          theoryPart2: { type: Type.STRING },
          theoryPart3: { type: Type.STRING },
          examplesPart1: { type: Type.STRING },
          examplesPart2: { type: Type.STRING },
          examplesPart3: { type: Type.STRING },
          challengesPart1: { type: Type.STRING },
          challengesPart2: { type: Type.STRING },
          productionPart1: { type: Type.STRING },
          productionPart2: { type: Type.STRING },
          productionPart3: { type: Type.STRING },
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
          studentClosure: { type: Type.STRING },
          glossary: { type: Type.STRING }
        },
        required: [
          "suggestedActivities", "studentIntro", "theoryPart1", "theoryPart2", "theoryPart3",
          "examplesPart1", "examplesPart2", "examplesPart3", "challengesPart1", "challengesPart2",
          "productionPart1", "productionPart2", "productionPart3", "rubric", "studentClosure", "glossary"
        ]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No se pudo obtener el texto de la IA.");
  
  return JSON.parse(text) as GeneratedContent;
};
