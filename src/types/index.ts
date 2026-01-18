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
