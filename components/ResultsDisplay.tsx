
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
      filename: `Guia_Institucional_15_Paginas_${formData.topic.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { scale: 1.5, useCORS: true, logging: false },
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

  const PageContainer = ({ children, pageNum }: { children?: React.ReactNode, pageNum: number }) => (
    <div 
      className="bg-white p-16 shadow-2xl relative border border-gray-100 flex flex-col mb-10" 
      style={{ width: '210mm', minHeight: '297mm', pageBreakBefore: pageNum > 1 ? 'always' : 'auto' }}
    >
      {children}
      <div className="mt-auto pt-6 border-t border-slate-200 flex justify-between items-center text-[8px] text-slate-400 uppercase tracking-widest font-semibold">
        <span>Colegio Marruecos y Molinos I.E.D. - Sede {formData.sede} - {formData.shift}</span>
        <span className="font-black text-slate-900 text-xs">Página {pageNum} de 15</span>
      </div>
    </div>
  );

  const PageHeader = ({ subtitle }: { subtitle: string }) => (
    <div className="mb-8 border-b-2 border-slate-900 pb-2">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-xl font-black text-slate-900 uppercase">Marruecos y Molinos I.E.D.</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{subtitle}</p>
        </div>
        <div className="text-right text-[9px] font-mono">
          REF: {formData.topic.substring(0,3).toUpperCase()}-{new Date().getFullYear()}
        </div>
      </div>
    </div>
  );

  const BookParagraphs = ({ text }: { text: string }) => (
    <div className="text-[13px] leading-[1.8] text-justify text-slate-800 space-y-6">
      {text.split('\n\n').map((para, i) => (
        <p key={i} className="indent-8 first:indent-0">
          {para}
        </p>
      ))}
    </div>
  );

  const SectionTitle = ({ title, color = "bg-slate-900" }: { title: string, color?: string }) => (
    <h3 className={`text-sm font-black text-white uppercase mb-6 px-4 py-2 ${color} inline-block tracking-tight`}>
      {title}
    </h3>
  );

  return (
    <div className="mt-12 flex flex-col items-center">
      <div className="flex justify-end w-full max-w-[210mm] no-print mb-6">
        <button
          onClick={handleDownloadPDF}
          className="px-8 py-4 bg-green-700 text-white rounded-2xl font-black hover:bg-green-800 shadow-2xl flex items-center gap-3 transition-all transform hover:-translate-y-1 active:scale-95"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Generar Obra de Aprendizaje (15 Págs)
        </button>
      </div>

      <div ref={printRef} className="flex flex-col bg-slate-200 p-1">
        
        {/* PÁGINA 1: PLANEACIÓN DOCENTE */}
        <PageContainer pageNum={1}>
          <div className="text-center mb-12">
            <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900">Protocolo de Planeación</h1>
            <p className="text-xs text-slate-500 font-bold mt-2">GESTIÓN ACADÉMICA - COLEGIO MARRUECOS Y MOLINOS</p>
          </div>
          
          <div className="grid grid-cols-2 gap-px bg-slate-900 border border-slate-900 mb-8">
            <div className="bg-white p-3 text-[10px]"><strong>DOCENTE:</strong> {formData.teacherName}</div>
            <div className="bg-white p-3 text-[10px]"><strong>ASIGNATURA:</strong> {formData.subject}</div>
            <div className="bg-white p-3 text-[10px]"><strong>GRADO:</strong> {formData.grade}</div>
            <div className="bg-white p-3 text-[10px]"><strong>TEMA:</strong> {formData.topic}</div>
          </div>

          <SectionTitle title="Secuencia de Aprendizaje" />
          <div className="space-y-4 mb-10">
            {content.suggestedActivities.map((act, i) => (
              <div key={i} className="border-l-4 border-slate-900 pl-4 py-2">
                <div className="text-[9px] font-black text-slate-400 uppercase">{act.phase} ({act.duration})</div>
                <h4 className="font-bold text-xs uppercase">{act.title}</h4>
                <p className="text-[10px] text-slate-600 mt-1">{act.description}</p>
              </div>
            ))}
          </div>

          <SectionTitle title="Objetivos Generales" color="bg-green-700" />
          <p className="text-[11px] leading-relaxed italic text-slate-600 mb-10 px-4">
            {formData.generalObjectives}
          </p>

          <div className="mt-auto border-t-2 border-slate-900 pt-4">
            <p className="text-[9px] font-bold text-center italic">Documento firmado por el Departamento de {formData.subject}</p>
          </div>
        </PageContainer>

        {/* PÁGINA 2: PORTADA ESTUDIANTIL */}
        <PageContainer pageNum={2}>
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <div className="mb-16">
              <h2 className="text-xl font-bold text-slate-400 uppercase tracking-[0.4em]">Guía de Trabajo</h2>
              <div className="w-16 h-1 bg-slate-900 mx-auto mt-4"></div>
            </div>
            <h1 className="text-6xl font-black text-slate-900 uppercase leading-[0.9] max-w-lg mb-12">
              {formData.topic}
            </h1>
            <div className="max-w-md">
              <SectionTitle title="Introducción" color="bg-blue-800" />
              <BookParagraphs text={content.studentIntro} />
            </div>
          </div>
        </PageContainer>

        {/* PÁGINAS 3, 4, 5: TEORÍA */}
        <PageContainer pageNum={3}>
          <PageHeader subtitle="Teoría y Conceptos Fundamentales (Parte I)" />
          <SectionTitle title="1. Fundamentación y Orígenes" />
          <BookParagraphs text={content.theoryPart1} />
        </PageContainer>

        <PageContainer pageNum={4}>
          <PageHeader subtitle="Desarrollo Conceptual (Parte II)" />
          <SectionTitle title="2. Marco Teórico Estructurado" />
          <BookParagraphs text={content.theoryPart2} />
        </PageContainer>

        <PageContainer pageNum={5}>
          <PageHeader subtitle="Profundización Técnica (Parte III)" />
          <SectionTitle title="3. Casos Especiales y Análisis" />
          <BookParagraphs text={content.theoryPart3} />
        </PageContainer>

        {/* PÁGINAS 6, 7, 8: EJEMPLOS */}
        <PageContainer pageNum={6}>
          <PageHeader subtitle="Laboratorio de Ejemplos - Nivel Inicial" />
          <SectionTitle title="4. Ejemplificación Punto a Punto" color="bg-orange-600" />
          <BookParagraphs text={content.examplesPart1} />
        </PageContainer>

        <PageContainer pageNum={7}>
          <PageHeader subtitle="Ejemplificación - Nivel Intermedio" />
          <SectionTitle title="5. Análisis de Procesos" color="bg-orange-700" />
          <BookParagraphs text={content.examplesPart2} />
        </PageContainer>

        <PageContainer pageNum={8}>
          <PageHeader subtitle="Resolución de Casos Complejos" />
          <SectionTitle title="6. Desafíos de Resolución" color="bg-orange-800" />
          <BookParagraphs text={content.examplesPart3} />
        </PageContainer>

        {/* PÁGINAS 9, 10: APLICACIÓN */}
        <PageContainer pageNum={9}>
          <PageHeader subtitle="Aplicación en Contextos Reales" />
          <SectionTitle title="7. El Saber en la Práctica" color="bg-emerald-600" />
          <BookParagraphs text={content.applicationPart1} />
        </PageContainer>

        <PageContainer pageNum={10}>
          <PageHeader subtitle="Modelado y Problemática Social" />
          <SectionTitle title="8. Conexiones Interdisciplinarias" color="bg-emerald-700" />
          <BookParagraphs text={content.applicationPart2} />
        </PageContainer>

        {/* PÁGINAS 11, 12: TALLER */}
        <PageContainer pageNum={11}>
          <PageHeader subtitle="Taller de Entrenamiento - Fase A" />
          <SectionTitle title="9. Actividades de Producción Estudiantil" color="bg-red-800" />
          <BookParagraphs text={content.workshopPart1} />
        </PageContainer>

        <PageContainer pageNum={12}>
          <PageHeader subtitle="Taller de Entrenamiento - Fase B" />
          <SectionTitle title="10. Retos y Desafíos Finales" color="bg-red-900" />
          <BookParagraphs text={content.workshopPart2} />
        </PageContainer>

        {/* PÁGINA 13: RÚBRICA */}
        <PageContainer pageNum={13}>
          <PageHeader subtitle="Evaluación y Desempeño" />
          <SectionTitle title="11. Criterios de Calificación" />
          <div className="overflow-hidden border border-slate-900 rounded-lg">
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white uppercase">
                  <th className="p-4 border-r border-slate-700 text-left">Aspecto a Evaluar</th>
                  <th className="p-4 border-r border-slate-700 text-left">Superior / Alto</th>
                  <th className="p-4 text-left">Básico / Bajo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {content.rubric.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-black uppercase bg-slate-50 border-r border-slate-200">{r.aspect}</td>
                    <td className="p-4 italic border-r border-slate-200">{r.excellent}</td>
                    <td className="p-4 text-slate-500">{r.good}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageContainer>

        {/* PÁGINA 14: CIERRE */}
        <PageContainer pageNum={14}>
          <PageHeader subtitle="Reflexión y Autoconocimiento" />
          <SectionTitle title="12. Metacognición y Cierre" color="bg-indigo-800" />
          <BookParagraphs text={content.studentClosure} />
        </PageContainer>

        {/* PÁGINA 15: GLOSARIO */}
        <PageContainer pageNum={15}>
          <PageHeader subtitle="Glosario Pedagógico" />
          <SectionTitle title="13. Diccionario de la Unidad" color="bg-slate-400" />
          <div className="bg-slate-50 p-10 border-2 border-double border-slate-200">
            <BookParagraphs text={content.glossary} />
          </div>
          <div className="mt-auto text-center italic text-[9px] text-slate-400">
            © {new Date().getFullYear()} Institución Educativa Distrital Marruecos y Molinos. <br/>
            Bogotá, D.C. - Colombia.
          </div>
        </PageContainer>

      </div>
    </div>
  );
};

export default ResultsDisplay;
