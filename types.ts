
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
  theoryPart1: string;
  theoryPart2: string;
  theoryPart3: string;
  examplesPart1: string;
  examplesPart2: string;
  examplesPart3: string;
  applicationPart1: string;
  applicationPart2: string;
  workshopPart1: string;
  workshopPart2: string;
  studentClosure: string;
  rubric: RubricCriteria[];
  glossary: string;
  summary: string;
}
