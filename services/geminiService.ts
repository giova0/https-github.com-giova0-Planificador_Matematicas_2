
import { GoogleGenAI, Type } from "@google/genai";
import { LessonFormData, GeneratedContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLessonPlan = async (data: LessonFormData): Promise<GeneratedContent> => {
  const model = 'gemini-3-pro-preview';
  
  const prompt = `Actúa como un Autor de Libros de Texto Pedagógicos de Élite y Coordinador del Colegio Marruecos y Molinos I.E.D.
  Diseña una GUÍA DE APRENDIZAJE MONUMENTAL DE 15 PÁGINAS sobre: ${data.topic}.
  
  REGLAS DE FORMATO CRÍTICAS:
  - En las secciones de Ejemplos, Aplicaciones y Talleres, CADA EJEMPLO O ACTIVIDAD DEBE SER UN PUNTO APARTE, estar numerado y tener un título en negrita. No amontones el texto.
  - El lenguaje debe ser de libro de texto: introducciones largas, explicaciones detalladas y mucho espacio entre ideas.
  - El volumen de texto debe ser suficiente para llenar 15 páginas A4 reales.

  ESTRUCTURA DEL JSON:
  1. suggestedActivities: Planeación docente (Inicio, Desarrollo, Cierre).
  2. studentIntro: Portada y presentación motivacional (Pág 2).
  3. theoryPart1: Historia del concepto, etimología y conceptos base (Pág 3).
  4. theoryPart2: Desarrollo teórico intermedio y reglas fundamentales (Pág 4).
  5. theoryPart3: Profundización técnica, casos especiales y teoremas (Pág 5).
  6. examplesPart1: Laboratorio de ejemplos básicos paso a paso (Pág 6).
  7. examplesPart2: Ejemplos de nivel medio con diagramas descritos (Pág 7).
  8. examplesPart3: Ejemplos avanzados y resolución de paradojas (Pág 8).
  9. applicationPart1: El tema en la vida cotidiana y otras ciencias (Pág 9).
  10. applicationPart2: Desafíos contemporáneos y modelado complejo (Pág 10).
  11. workshopPart1: Taller práctico Parte A (Ejercicios 1-10) (Pág 11).
  12. workshopPart2: Taller práctico Parte B (Retos y Olimpiadas) (Pág 12).
  13. rubric: Rúbrica institucional detallada (Pág 13).
  14. studentClosure: Autoevaluación y Metacognición (Pág 14).
  15. glossary: Glosario de términos clave de la unidad (Pág 15).

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
          applicationPart1: { type: Type.STRING },
          applicationPart2: { type: Type.STRING },
          workshopPart1: { type: Type.STRING },
          workshopPart2: { type: Type.STRING },
          studentClosure: { type: Type.STRING },
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
          glossary: { type: Type.STRING },
          summary: { type: Type.STRING }
        },
        required: [
          "suggestedActivities", "studentIntro", "theoryPart1", "theoryPart2", "theoryPart3", 
          "examplesPart1", "examplesPart2", "examplesPart3", "applicationPart1", "applicationPart2", 
          "workshopPart1", "workshopPart2", "studentClosure", "rubric", "glossary", "summary"
        ]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No se pudo obtener el texto de la IA.");
  
  return JSON.parse(text) as GeneratedContent;
};
