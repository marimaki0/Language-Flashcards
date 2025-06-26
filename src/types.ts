export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: Date;
  lastReviewed?: Date;
  reviewCount: number;
  correctCount: number;
  incorrectCount: number;
}

export interface FlashcardStats {
  totalCards: number;
  totalReviews: number;
  correctAnswers: number;
  incorrectAnswers: number;
  averageAccuracy: number;
  categoriesStats: { [category: string]: CategoryStats };
}

export interface CategoryStats {
  totalCards: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
}

export interface StudySession {
  id: string;
  cards: Flashcard[];
  currentCardIndex: number;
  isComplete: boolean;
  startTime: Date;
  endTime?: Date;
}

export interface FilterOptions {
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  onlyNotReviewed?: boolean;
}