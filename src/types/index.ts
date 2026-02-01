// Module types
export interface Module {
  id: number;
  title: string;
  description: string;
  icon: string;
  slug: string;
}

// Quiz types
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Flashcard types
export interface Flashcard {
  id: string;
  front: string;
  back: string;
  moduleId: number;
}

// Progress tracking
export interface UserProgress {
  completedQuizzes: string[];
  flashcardProgress: Record<string, number>;
  lastVisited: string;
}

// Lesson structure
export interface Lesson {
  id: string;           // e.g., "1-0", "1-1", "1-1.1"
  title: string;
  description: string;
  parentId?: string;    // for sub-lessons
  order: number;
}

// Concept definition
export interface Concept {
  id: string;
  term: string;
  definition: string;   // English definition
  category: 'money' | 'payment' | 'financial-system' | 'institutions' | 'economy' | 'risk' | 'capital';
  relatedConcepts?: string[];  // IDs of related concepts
  lessonId: string;     // which lesson this concept belongs to
}

// Module content bundle
export interface ModuleContent {
  moduleId: number;
  lessons: Lesson[];
  concepts: Concept[];
}

// Glossary types
export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: Concept['category'];
  type: 'term' | 'concept' | 'formula' | 'regulation';
  moduleId: number;
  lessonId: string;
  relatedTerms?: string[];
}

// Exam types
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: QuestionDifficulty;
  moduleId: number;
  conceptId?: string;
}

// Progress tracking for study tools
export interface StudyProgress {
  // Exam progress
  totalQuestions: number;
  correctAnswers: number;
  currentStreak: number;
  bestStreak: number;
  points: number;
  badges: string[];
  // Session history
  lastExamDate?: string;
  examHistory: ExamResult[];
}

export interface ExamResult {
  date: string;
  questionCount: number;
  correctCount: number;
  pointsEarned: number;
}
