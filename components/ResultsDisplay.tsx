
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
      html2canvas: { scale: 1.5, useCORS: true },
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
      className="bg-white p-14 shadow-2xl relative border border-gray-100 flex flex-col mb-10 overflow-hidden" 
      style={{ width: '210mm', minHeight: '297mm', pageBreakBefore: pageNum > 1 ? 'always' : 'auto' }}
    >
      {children}
      <div className="mt-auto pt-6 border-t border-slate-200 flex justify-between items-center text-[8px] text-slate-400 uppercase tracking-widest font-bold">
        <span>Colegio Marruecos y Molinos I.E.D. - Guía Institucional</span>
        <span className="font-black text-slate-900 text-xs">Página {pageNum} de 15</span>
      </div>
    </div>
  );

  const BookHeader = ({ subtitle }: { subtitle: string }) => (
    <div className="mb-8 border-b-2 border-slate-900 pb-2 flex justify-between items-end">
      <div>
        <h2 className="text-xl font-black text-slate-900 uppercase leading-none">Marruecos y Molinos I.E.D.</h2>
        <p className="text-[10px] font-bold text-slate-500 uppercase mt-1 italic tracking-tight">{subtitle}</p>
      </div>
      <div className="text-right">
        <div className="text-[9px] font-mono text-slate-400 uppercase">Gestión Académica {new Date().getFullYear()}</div>
      </div>
    </div>
  );

  const SectionTitle = ({ title, color = "bg-slate-900" }: { title: string, color?: string }) => (
    <div className="flex items-center gap-4 mb-8">
      <div className={`h-8 w-2 ${color}`}></div>
      <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
        {title}
      </h3>
    </div>
  );

  const BookParagraphs = ({ text }: { text: string }) => (
    <div className="text-[13px] leading-[1.8] text-justify text-slate-800 space-y-6">
      {text.split('\n\n').filter(p => p.trim()).map((para, i) => (
        <p key={i} className="indent-8 first:indent-0">
          {para.trim()}
        </p>
      ))}
    </div>
  );

  return (
    <div className="mt-12 flex flex-col items-center">
      <div className="flex justify-end w-full max-w-[210mm] no-print mb-6">
        <button
          onClick={handleDownloadPDF}
          className="px-8 py-4 bg-green-700 text-white rounded-2xl font-black hover:bg-green-800 shadow-2xl flex items-center gap-3 transition-all transform hover:-translate-y-1"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Descargar Obra Pedagógica (15 Páginas)
        </button>
      </div>

      <div ref={printRef} className="flex flex-col bg-slate-200 p-1">
        
        {/* PÁGINA 1: PLANEACIÓN DOCENTE */}
        <PageContainer pageNum={1}>
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black uppercase text-slate-900">Protocolo de Planeación</h1>
            <p className="text-[10px] text-green-700 font-black tracking-widest uppercase mt-2">Institución Educativa Distrital Marruecos y Molinos</p>
          </div>
          
          <div className="grid grid-cols-2 gap-px bg-slate-900 border-2 border-slate-900 mb-8 overflow-hidden rounded-lg">
            <div className="bg-white p-3 text-[10px]"><strong>DOCENTE:</strong> {formData.teacherName}</div>
            <div className="bg-white p-3 text-[10px]"><strong>ASIGNATURA:</strong> {formData.subject}</div>
            <div className="bg-white p-3 text-[10px]"><strong>GRADO:</strong> {formData.grade}</div>
            <div className="bg-white p-3 text-[10px]"><strong>TEMA:</strong> {formData.topic}</div>
            <div className="bg-white p-3 text-[10px]"><strong>SEDE:</strong> {formData.sede}</div>
            <div className="bg-white p-3 text-[10px]"><strong>JORNADA:</strong> {formData.shift}</div>
          </div>

          <SectionTitle title="Secuencia de Aprendizaje" color="bg-green-700" />
          <div className="space-y-4 mb-8">
            {content.suggestedActivities.map((act, i) => (
              <div key={i} className="border-l-4 border-slate-200 pl-4 py-1">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{act.phase} - {act.duration}</span>
                <h4 className="font-bold text-sm text-slate-800 uppercase">{act.title}</h4>
                <p className="text-[11px] text-slate-600 italic mt-1">{act.description}</p>
              </div>
            ))}
          </div>

          <SectionTitle title="Objetivo General / Competencia" />
          <div className="bg-slate-50 p-6 border-l-8 border-slate-300 italic text-[12px] text-slate-700 leading-relaxed mb-8">
            {formData.generalObjectives}
          </div>
        </PageContainer>

        {/* PÁGINA 2: PORTADA E INTRODUCCIÓN */}
        <PageContainer pageNum={2}>
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <div className="mb-20">
              <h3 className="text-xl font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">Guía de Aprendizaje</h3>
              <div className="w-24 h-1 bg-slate-900 mx-auto"></div>
            </div>
            <h1 className="text-6xl font-black text-slate-900 uppercase leading-[0.85] mb-12 tracking-tighter">
              {formData.topic}
            </h1>
            <div className="max-w-xl text-left">
              <SectionTitle title="Introducción a la Unidad" color="bg-blue-800" />
              <BookParagraphs text={content.studentIntro} />
            </div>
          </div>
        </PageContainer>

        {/* PÁGINAS 3-5: TEORÍA */}
        <PageContainer pageNum={3}>
          <BookHeader subtitle="Fundamentación y Contexto" />
          <SectionTitle title="1. Historia y Orígenes" />
          <BookParagraphs text={content.theoryPart1} />
        </PageContainer>

        <PageContainer pageNum={4}>
          <BookHeader subtitle="Desarrollo Conceptual" />
          <SectionTitle title="2. Marco Teórico Estructurado" />
          <BookParagraphs text={content.theoryPart2} />
        </PageContainer>

        <PageContainer pageNum={5}>
          <BookHeader subtitle="Profundización" />
          <SectionTitle title="3. Teoremas y Análisis Técnico" />
          <BookParagraphs text={content.theoryPart3} />
        </PageContainer>

        {/* PÁGINAS 6-8: CASOS DE ESTUDIO RESUELTOS */}
        <PageContainer pageNum={6}>
          <BookHeader subtitle="Laboratorio de Ejemplos - Fase Inicial" />
          <SectionTitle title="4. Casos Resueltos: Punto a Punto I" color="bg-orange-600" />
          <BookParagraphs text={content.examplesPart1} />
        </PageContainer>

        <PageContainer pageNum={7}>
          <BookHeader subtitle="Laboratorio de Ejemplos - Fase Media" />
          <SectionTitle title="5. Casos Resueltos: Punto a Punto II" color="bg-orange-700" />
          <BookParagraphs text={content.examplesPart2} />
        </PageContainer>

        <PageContainer pageNum={8}>
          <BookHeader subtitle="Laboratorio de Ejemplos - Fase Avanzada" />
          <SectionTitle title="6. Casos Resueltos: Punto a Punto III" color="bg-orange-800" />
          <BookParagraphs text={content.examplesPart3} />
        </PageContainer>

        {/* PÁGINAS 9-10: DESAFÍOS PRÁCTICOS */}
        <PageContainer pageNum={9}>
          <BookHeader subtitle="Aplicación en Contextos" />
          <SectionTitle title="7. Desafíos Prácticos: Entorno Real" color="bg-emerald-600" />
          <BookParagraphs text={content.challengesPart1} />
        </PageContainer>

        <PageContainer pageNum={10}>
          <BookHeader subtitle="Modelado Sistemático" />
          <SectionTitle title="8. Desafíos Prácticos: Análisis y Modelado" color="bg-emerald-700" />
          <BookParagraphs text={content.challengesPart2} />
        </PageContainer>

        {/* PÁGINAS 11-13: ACTIVIDADES DE PRODUCCIÓN */}
        <PageContainer pageNum={11}>
          <BookHeader subtitle="Taller de Producción A" />
          <SectionTitle title="9. Actividades: Punto de Entrenamiento" color="bg-red-800" />
          <BookParagraphs text={content.productionPart1} />
        </PageContainer>

        <PageContainer pageNum={12}>
          <BookHeader subtitle="Taller de Producción B" />
          <SectionTitle title="10. Actividades: Ejercicio Autónomo" color="bg-red-900" />
          <BookParagraphs text={content.productionPart2} />
        </PageContainer>

        <PageContainer pageNum={13}>
          <BookHeader subtitle="Taller de Producción Superior" />
          <SectionTitle title="11. Actividades: Retos de Lógica" color="bg-purple-900" />
          <BookParagraphs text={content.productionPart3} />
        </PageContainer>

        {/* PÁGINA 14: RÚBRICA */}
        <PageContainer pageNum={14}>
          <BookHeader subtitle="Evaluación del Aprendizaje" />
          <SectionTitle title="12. Rúbrica de Valoración Integral" />
          <div className="overflow-hidden border border-slate-900 rounded-lg">
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white uppercase font-black">
                  <th className="p-4 border-r border-slate-700 text-left">Criterio</th>
                  <th className="p-4 border-r border-slate-700 text-left">Desempeño Superior</th>
                  <th className="p-4 text-left">Desempeño Básico</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {content.rubric.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-4 font-black uppercase bg-slate-50 border-r border-slate-200">{r.aspect}</td>
                    <td className="p-4 italic border-r border-slate-200">{r.excellent}</td>
                    <td className="p-4 text-slate-500">{r.good}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* SE REINCORPORA EL ESPACIO PARA COMENTARIOS MANUALES */}
          <div className="mt-8 p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl no-print">
            <h4 className="text-[10px] font-black uppercase mb-2">Comentarios del Docente:</h4>
            <div className="h-24"></div>
          </div>
        </PageContainer>

        {/* PÁGINA 15: CIERRE Y GLOSARIO */}
        <PageContainer pageNum={15}>
          <BookHeader subtitle="Metacognición y Glosario" />
          <SectionTitle title="13. Cierre y Diccionario de Unidad" color="bg-indigo-700" />
          <BookParagraphs text={content.studentClosure} />
          
          <div className="mt-12 bg-slate-900 p-8 text-white rounded-3xl">
            <h4 className="text-sm font-black uppercase mb-4 tracking-widest text-green-400">Glosario Técnico</h4>
            <div className="text-[11px] leading-relaxed opacity-90 italic">
              {content.glossary}
            </div>
          </div>

          <div className="mt-auto text-center py-6 border-t border-slate-100 italic text-[9px] text-slate-400">
            © Institución Educativa Distrital Marruecos y Molinos. <br/>
            Caminando hacia la excelencia educativa.
          </div>
        </PageContainer>

      </div>
    </div>
  );
};

export default ResultsDisplay;
