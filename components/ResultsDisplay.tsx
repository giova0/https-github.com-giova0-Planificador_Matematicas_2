
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
      margin: 0,
      filename: `Guia_Institucional_${formData.topic.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
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

  const PageHeader = ({ title }: { title: string }) => (
    <div className="border-2 border-black p-3 mb-6 bg-white">
      <div className="text-center">
        <h2 className="text-lg font-black uppercase leading-tight">Colegio Marruecos y Molinos I.E.D.</h2>
        <p className="text-[10px] font-bold border-y border-black my-1 py-1 uppercase tracking-widest">{title}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[10px] mt-2">
        <div className="border-b border-black"><strong>Estudiante:</strong> _________________________________</div>
        <div className="border-b border-black"><strong>Curso:</strong> {formData.grade} _____</div>
        <div><strong>Asignatura:</strong> {formData.subject}</div>
        <div><strong>Fecha:</strong> __________________</div>
      </div>
    </div>
  );

  return (
    <div className="mt-12 space-y-8">
      <div className="flex justify-end gap-4 no-print">
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-3 bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 shadow-xl flex items-center gap-2 transition-all transform hover:scale-105"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Descargar Planeación y Guía Completa (5 Págs)
        </button>
      </div>

      <div ref={printRef} className="flex flex-col items-center bg-slate-100 p-4 gap-8">
        
        {/* PÁGINA 1: PLANEACIÓN DOCENTE */}
        <div className="bg-white p-12 shadow-2xl" style={{ width: '210mm', minHeight: '297mm' }}>
          <div className="text-center mb-6 border-b-2 border-black pb-2">
            <p className="text-[9px] font-bold uppercase">Secretaría de Educación del Distrito</p>
            <h1 className="text-xl font-black">COLEGIO MARRUECOS Y MOLINOS I.E.D.</h1>
            <p className="text-[10px] italic">"Respuesta a un sueño de crecer juntos y ser felices mientras aprehendemos"</p>
            <div className="bg-black text-white mt-2 py-1 text-xs font-bold">FORMATO DE PLANEACIÓN PEDAGÓGICA</div>
          </div>

          <div className="border border-black text-[11px] mb-4">
            <div className="grid grid-cols-4 divide-x divide-black border-b border-black">
              <div className="p-1 col-span-2 uppercase"><strong>Docente:</strong> {formData.teacherName}</div>
              <div className="p-1 uppercase"><strong>Asignatura:</strong> {formData.subject}</div>
              <div className="p-1 uppercase"><strong>Grado:</strong> {formData.grade}</div>
            </div>
            <div className="grid grid-cols-4 divide-x divide-black">
              <div className="p-1 uppercase"><strong>Sede:</strong> {formData.sede}</div>
              <div className="p-1 uppercase"><strong>Jornada:</strong> {formData.shift}</div>
              <div className="p-1 uppercase"><strong>Periodo:</strong> {formData.period}</div>
              <div className="p-1 uppercase"><strong>Fecha:</strong> {new Date().toLocaleDateString()}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border border-black p-2 bg-gray-50">
              <h3 className="font-bold text-xs uppercase underline">Tema Central:</h3>
              <p className="text-sm font-bold">{formData.topic}</p>
            </div>
            <div className="border border-black">
              <div className="bg-gray-800 text-white text-center py-1 text-[10px] font-bold uppercase">Secuencia Didáctica</div>
              <div className="divide-y divide-black">
                {content.suggestedActivities.map((act, i) => (
                  <div key={i} className="p-2 flex gap-4">
                    <div className="w-20 shrink-0 text-center">
                      <span className="text-[9px] font-bold uppercase bg-gray-200 block">{act.phase}</span>
                      <span className="text-[8px] italic block">{act.duration}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[10px] uppercase underline">{act.title}</h4>
                      <p className="text-[10px] text-justify">{act.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-black">
              <div className="bg-gray-200 text-center py-1 text-[10px] font-bold uppercase border-b border-black">Evaluación y Rúbrica</div>
              <table className="w-full text-[9px] border-collapse">
                <tbody>
                  {content.rubric.map((r, i) => (
                    <tr key={i} className="border-b border-black last:border-0">
                      <td className="p-1 border-r border-black font-bold uppercase w-1/4">{r.aspect}</td>
                      <td className="p-1 text-justify"><span className="font-bold">S:</span> {r.excellent} | <span className="font-bold">B:</span> {r.good}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* PÁGINA 2: INTRODUCCIÓN Y CIERRE (SOLICITADO) */}
        <div className="bg-white p-12 shadow-2xl" style={{ width: '210mm', minHeight: '297mm', pageBreakBefore: 'always' }}>
          <PageHeader title="Guía de Aprendizaje - Inicio y Reflexión" />
          <h3 className="text-center text-lg font-bold bg-green-50 border border-black p-2 mb-6 uppercase">
            Introducción: {formData.topic}
          </h3>
          
          <div className="space-y-8">
            <section>
              <h4 className="font-black text-green-800 border-b-2 border-green-800 mb-2 uppercase text-xs">1. ¿Qué vamos a aprender? (Introducción)</h4>
              <div className="text-sm leading-relaxed text-justify whitespace-pre-wrap px-4 italic">
                {content.studentIntro}
              </div>
            </section>

            <section className="bg-slate-50 p-6 border-2 border-dashed border-slate-300">
              <h4 className="font-black text-slate-800 border-b-2 border-slate-800 mb-4 uppercase text-xs">2. Cierre y Autoevaluación (Reflexión Final)</h4>
              <div className="text-sm leading-relaxed text-justify whitespace-pre-wrap">
                {content.studentClosure}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2 text-center text-[10px] uppercase font-bold">
                <div className="border border-black p-2">¿Lo logré? <br/> [ ]</div>
                <div className="border border-black p-2">¿Tengo dudas? <br/> [ ]</div>
                <div className="border border-black p-2">¿Puedo mejorar? <br/> [ ]</div>
              </div>
            </section>
          </div>
        </div>

        {/* PÁGINA 3: DESARROLLO PÁG 1 (TEORÍA) */}
        <div className="bg-white p-12 shadow-2xl" style={{ width: '210mm', minHeight: '297mm', pageBreakBefore: 'always' }}>
          <PageHeader title="Guía de Aprendizaje - Desarrollo Teórico (Pág 1/3)" />
          <h4 className="font-black text-blue-900 border-b-2 border-blue-900 mb-4 uppercase text-sm">Contenido Temático y Fundamentación</h4>
          <div className="text-[12px] leading-relaxed text-justify whitespace-pre-wrap prose max-w-none">
            {content.devPage1}
          </div>
        </div>

        {/* PÁGINA 4: DESARROLLO PÁG 2 (EJEMPLOS) */}
        <div className="bg-white p-12 shadow-2xl" style={{ width: '210mm', minHeight: '297mm', pageBreakBefore: 'always' }}>
          <PageHeader title="Guía de Aprendizaje - Ejemplificación (Pág 2/3)" />
          <h4 className="font-black text-orange-800 border-b-2 border-orange-800 mb-4 uppercase text-sm">Ejemplos Paso a Paso y Casos de Estudio</h4>
          <div className="text-[12px] leading-relaxed text-justify whitespace-pre-wrap prose max-w-none bg-orange-50/30 p-4 rounded border border-orange-100">
            {content.devPage2}
          </div>
        </div>

        {/* PÁGINA 5: DESARROLLO PÁG 3 (TALLER) */}
        <div className="bg-white p-12 shadow-2xl" style={{ width: '210mm', minHeight: '297mm', pageBreakBefore: 'always' }}>
          <PageHeader title="Guía de Aprendizaje - Taller Práctico (Pág 3/3)" />
          <h4 className="font-black text-purple-900 border-b-2 border-purple-900 mb-4 uppercase text-sm">Actividades de Aplicación y Ejercitación</h4>
          <div className="text-[12px] leading-relaxed text-justify whitespace-pre-wrap mb-8">
            {content.devPage3}
          </div>
          <div className="border-2 border-black p-4 bg-gray-50 mt-auto">
            <h5 className="font-bold text-[10px] uppercase mb-2">Espacio para la resolución del estudiante:</h5>
            <div className="h-48 w-full border-b border-gray-300 border-dashed"></div>
            <div className="h-48 w-full border-b border-gray-300 border-dashed"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResultsDisplay;
