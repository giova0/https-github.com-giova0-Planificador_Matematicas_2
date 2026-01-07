
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
  challengesPart1: string;
  challengesPart2: string;
  productionPart1: string;
  productionPart2: string;
  productionPart3: string;
  rubric: RubricCriteria[];
  studentClosure: string;
  glossary: string;
}
