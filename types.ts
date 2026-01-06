
export interface LessonFormData {
  teacherName: string;
  subject: string;
  grade: string;
  sede: string;
  shift: string;
  period: string;
  topic: string;
  generalObjectives: string;
}

export interface Activity {
  phase: 'Inicio' | 'Desarrollo' | 'Cierre';
  title: string;
  description: string;
  duration: string;
}

export interface RubricCriteria {
  aspect: string;
  excellent: string;
  good: string;
  needsImprovement: string;
}

export interface GeneratedContent {
  suggestedActivities: Activity[];
  studentIntro: string;
  studentClosure: string;
  devPage1: string;
  devPage2: string;
  devPage3: string;
  rubric: RubricCriteria[];
  summary: string;
}
