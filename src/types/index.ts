export type MissionStatus =
  | 'locked'
  | 'learning'
  | 'developing'
  | 'mastered'
  | 'needs_remediation';

export interface Competency {
  id: string;
  title: string;
}

export interface BadgeDef {
  icon: string;
  name: string;
}

export interface Badge extends BadgeDef {
  id: string;
  date: number;
}

export interface MasteryRecord {
  status: Exclude<MissionStatus, 'locked' | 'learning'>;
  score: number;
  lastScore?: number;
  attempts: number;
  updated: number;
}

export interface Reflection {
  k: 'dulu' | 'sekarang' | 'selanjutnya';
  v: string;
  date: number;
}

export interface Student {
  name: string;
  className: string;
  mastery: Record<string, MasteryRecord>;
  completedActivities: string[];
  badges: Badge[];
  reflections: Reflection[];
  finalProject: Record<string, string> | null;
  settings: { reduceMotion: boolean };
  createdAt: number;
}

export type QuestionType = 'mc' | 'multi' | 'tf';

export interface Question {
  type: QuestionType;
  skill: string;
  difficulty?: 'mudah' | 'sedang' | 'sulit'; 
  q: string;
  options?: string[];
  answer?: number | boolean;   // mc: number (indeks) | tf: boolean
  answers?: number[];     // multi
  explain: string;
}

export interface ConceptCard {
  icon: string;
  title: string;
  body: string;
}

export interface Mission {
  intro: MissionIntro;
  id: string;
  num: number;
  icon: string;
  badge: string;
  title: string;
  subtitle: string;
  competency: string;
  competencyTitle: string;
  color: string;
  phenomenon: {
    visual: () => JSX.Element | JSX.Element[];
    caption: string;
    text: string;
  };
  predict: {
    q: string;
    options: string[];
    answer: number;
    explain: string;
  };
  miscon: {
    q: string;
    options: string[];
    answer: number;
    explain: string;
  };
  explore: string;
  explore2?: string;
  concept: ConceptCard[];
  practice: Question[];
  mastery: Question[];
  retry: Question[];
  remediation: Record<string, string>;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warn' | 'error';
}

export interface MissionIntro {
  hook: string;
  whyItMatters: string;
  localContext: string;
  objectives: string[];
  initialQuestion: string;
}