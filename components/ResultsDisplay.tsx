
import React, { useRef } from 'react';
import { GeneratedContent, LessonFormData } from '../types';

interface ResultsDisplayProps {
  content: GeneratedContent;
  formData: LessonFormData;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ content, formData }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    if (!element) return;

    const opt = {
      margin: [5, 5, 5, 5],
      filename: `Planeacion_IED_${formData.topic.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      // @ts-ignore
      const html2pdf = (window as any).html2pdf;
      if (html2pdf) await html2pdf().set(opt).from(element).save();
    } catch (error) {
      window.print();
    }
  };

  return (
    <div className="mt-12 space-y-8">
      <div className="flex justify-end gap-4 no-print">
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-2 bg-green-700 text-white rounded-lg font-bold hover:bg-green-800 shadow-lg flex items-center gap-2 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Descargar Planeación I.E.D.
        </button>
      </div>

      <div 
        ref={printRef} 
        className="bg-white p-6 md:p-8 border border-gray-300 text-black leading-tight"
        style={{ width: '210mm', margin: 'auto' }}
      >
        {/* CABEZOTE INSTITUCIONAL EXACTO SEGÚN IMAGEN */}
        <div className="flex items-center justify-between mb-2 border-b-2 border-black pb-2">
          <div className="w-20 h-20 flex items-center justify-center border border-gray-200">
             <div className="text-[10px] text-center font-bold text-green-700">ESCUDO<br/>COLEGIO</div>
          </div>

          <div className="flex-1 text-center px-4">
            <p className="text-[9px] font-bold uppercase">SECRETARÍA DE EDUCACIÓN</p>
            <h1 className="text-xl font-black uppercase leading-none mb-1">COLEGIO MARRUECOS Y MOLINOS I. E. D.</h1>
            <p className="text-[10px] italic font-semibold">"Respuesta a un sueño de crecer juntos y ser felices mientras aprehendemos"</p>
            <p className="text-[8px] leading-tight mt-1">
              Aprobación de la Secretaría de Educación de Bogotá, D. C. Resolución 18-132 de Diciembre 13 de 2013<br/>
              NIT 830.035.460-7 INSR. DANE 111001076376
            </p>
          </div>

          <div className="w-20 h-20 flex items-center justify-center border border-gray-200">
             <div className="text-[10px] text-center font-bold text-blue-800">ESCUDO<br/>BOGOTÁ</div>
          </div>
        </div>

        {/* TABLA DE IDENTIFICACIÓN */}
        <div className="border-collapse w-full border border-black text-[11px] mb-4">
          <div className="grid grid-cols-4 divide-x divide-black border-b border-black">
            <div className="p-1 col-span-2"><strong>DOCENTE:</strong> {formData.teacherName}</div>
            <div className="p-1"><strong>ASIGNATURA:</strong> {formData.subject}</div>
            <div className="p-1"><strong>GRADO:</strong> {formData.grade}</div>
          </div>
          <div className="grid grid-cols-4 divide-x divide-black">
            <div className="p-1"><strong>SEDE:</strong> {formData.sede}</div>
            <div className="p-1"><strong>JORNADA:</strong> {formData.shift}</div>
            <div className="p-1"><strong>PERIODO:</strong> {formData.period}</div>
            <div className="p-1"><strong>FECHA:</strong> {new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* CONTENIDO PEDAGÓGICO */}
        <div className="space-y-4">
          <div className="border border-black p-2 bg-gray-50">
            <h3 className="font-bold text-xs uppercase underline">Propósito de la Clase / Tema:</h3>
            <p className="text-sm">{formData.topic}</p>
          </div>

          <div className="border border-black p-2">
            <h3 className="font-bold text-xs uppercase mb-1">Competencia / Logro / Objetivo:</h3>
            <p className="text-[11px] text-justify">{formData.generalObjectives}</p>
          </div>

          {/* SECUENCIA DIDÁCTICA */}
          <div className="border border-black">
             <div className="bg-black text-white text-center py-1 text-xs font-bold uppercase tracking-widest">Secuencia Didáctica</div>
             <div className="divide-y divide-black">
                {content.suggestedActivities.map((act, i) => (
                  <div key={i} className="p-2 flex gap-4">
                    <div className="w-24 shrink-0">
                      <span className="text-[10px] font-bold uppercase bg-gray-200 px-1 block mb-1">{act.phase}</span>
                      <span className="text-[9px] text-gray-600 italic">({act.duration})</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[11px] mb-1">{act.title}</h4>
                      <p className="text-[10px] leading-snug">{act.description}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* EVALUACIÓN */}
          <div className="border border-black">
             <div className="bg-gray-200 text-center py-1 text-xs font-bold uppercase border-b border-black">Criterios de Evaluación (Rúbrica)</div>
             <table className="w-full text-[9px] border-collapse">
               <thead>
                 <tr className="border-b border-black">
                   <th className="p-1 border-r border-black w-1/4">Aspecto</th>
                   <th className="p-1 border-r border-black">Superior</th>
                   <th className="p-1 border-r border-black">Básico</th>
                   <th className="p-1">Bajo</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-black">
                 {content.rubric.map((r, i) => (
                   <tr key={i} className="align-top">
                     <td className="p-1 border-r border-black font-bold">{r.aspect}</td>
                     <td className="p-1 border-r border-black italic">{r.excellent}</td>
                     <td className="p-1 border-r border-black">{r.good}</td>
                     <td className="p-1 text-gray-600">{r.needsImprovement}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>

        {/* FIRMAS */}
        <div className="mt-8 flex justify-between px-10">
          <div className="text-center w-40">
            <div className="border-b border-black mb-1 h-12"></div>
            <p className="text-[10px] font-bold uppercase">Docente</p>
          </div>
          <div className="text-center w-40">
            <div className="border-b border-black mb-1 h-12"></div>
            <p className="text-[10px] font-bold uppercase">Coordinación</p>
          </div>
        </div>

        {/* PIE DE PÁGINA DOCUMENTAL */}
        <div className="mt-4 text-center text-[8px] text-gray-500 border-t border-gray-100 pt-1 uppercase">
          Documento Institucional - I.E.D. Marruecos y Molinos - Planeación Generada por IA
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
