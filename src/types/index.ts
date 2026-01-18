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
  category: 'money' | 'payment' | 'financial-system' | 'institutions' | 'economy';
  relatedConcepts?: string[];  // IDs of related concepts
  lessonId: string;     // which lesson this concept belongs to
}

// Module content bundle
export interface ModuleContent {
  moduleId: number;
  lessons: Lesson[];
  concepts: Concept[];
}
