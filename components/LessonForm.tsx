
import React, { useState } from 'react';
import { LessonFormData } from '../types';

interface LessonFormProps {
  onSubmit: (data: LessonFormData) => void;
  isLoading: boolean;
}

const LessonForm: React.FC<LessonFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<LessonFormData>({
    teacherName: 'Giovanny Quiazúa',
    subject: 'Matemáticas',
    grade: 'Sexto',
    sede: 'A',
    shift: 'Mañana',
    period: 'Primer Periodo',
    topic: 'm.c.m',
    generalObjectives: 'Comprender y aplicar el concepto de mínimo común múltiplo (m.c.m) en la resolución de situaciones problema y simplificación de fracciones.'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Nombre del Docente</label>
          <input 
            type="text" 
            name="teacherName"
            required
            value={formData.teacherName}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Asignatura</label>
          <input 
            type="text" 
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Grado</label>
          <input 
            type="text" 
            name="grade"
            required
            value={formData.grade}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Sede</label>
            <input 
              type="text" 
              name="sede"
              value={formData.sede}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Jornada</label>
            <select 
              name="shift"
              value={formData.shift}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="Mañana">Mañana</option>
              <option value="Tarde">Tarde</option>
              <option value="Única">Única</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Periodo</label>
            <input 
              type="text" 
              name="period"
              value={formData.period}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Tema / Propósito</label>
        <input 
          type="text" 
          name="topic"
          required
          placeholder="Ej: Factorización de Trinomios"
          value={formData.topic}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Objetivo General / Competencia</label>
        <textarea 
          name="generalObjectives"
          required
          rows={3}
          value={formData.generalObjectives}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
        />
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full py-4 px-6 bg-green-700 hover:bg-green-800 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isLoading ? 'Generando Planeación...' : 'Generar Plan de Clase Marruecos y Molinos'}
      </button>
    </form>
  );
};

export default LessonForm;
