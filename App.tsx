
import React, { useState } from 'react';
import Header from './components/Header';
import LessonForm from './components/LessonForm';
import ResultsDisplay from './components/ResultsDisplay';
import { LessonFormData, GeneratedContent } from './types';
import { generateLessonPlan } from './services/geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const [lastFormData, setLastFormData] = useState<LessonFormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (data: LessonFormData) => {
    setLoading(true);
    setError(null);
    setLastFormData(data);
    try {
      const generated = await generateLessonPlan(data);
      setResult(generated);
    } catch (err: any) {
      setError("Error generando el formato I.E.D. Verifica tu conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="max-w-3xl mb-8 no-print">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase">
            <span className="text-green-700 italic">Marruecos y Molinos I.E.D.</span>
          </h2>
          <p className="text-md text-slate-600">
            Herramienta inteligente para el diseño de planeaciones de clase alineadas al PEI distrital.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 no-print">
          <LessonForm onSubmit={handleGenerate} isLoading={loading} />
        </div>

        {error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center font-medium">
            {error}
          </div>
        )}

        {result && lastFormData && !loading && (
          <ResultsDisplay content={result} formData={lastFormData} />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-12 no-print">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">
            COLEGIO MARRUECOS Y MOLINOS I.E.D. - SEDE BOGOTÁ
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
