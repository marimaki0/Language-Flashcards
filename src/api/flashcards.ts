import { Flashcard, FlashcardStats } from '../types';

const STORAGE_KEY = 'language-flashcards';

export const getFlashcards = async (): Promise<Flashcard[]> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const cards = JSON.parse(stored);
      return cards.map((card: any) => ({
        ...card,
        createdAt: new Date(card.createdAt),
        lastReviewed: card.lastReviewed ? new Date(card.lastReviewed) : undefined
      }));
    }

    const response = await fetch('/flashcards.json');
    const cards = await response.json();

    const processedCards = cards.map((card: any) => ({
      ...card,
      createdAt: new Date(card.createdAt),
      lastReviewed: card.lastReviewed ? new Date(card.lastReviewed) : undefined
    }));
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(processedCards));
    return processedCards;
  } catch (error) {
    console.error('Error loading flashcards:', error);
    return [];
  }
};

export const saveFlashcards = (cards: Flashcard[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch (error) {
    console.error('Error saving flashcards:', error);
  }
};

export const addFlashcard = async (card: Omit<Flashcard, 'id' | 'createdAt' | 'reviewCount' | 'correctCount' | 'incorrectCount'>): Promise<Flashcard> => {
  const cards = await getFlashcards();
  
  const newCard: Flashcard = {
    ...card,
    id: Date.now().toString(),
    createdAt: new Date(),
    reviewCount: 0,
    correctCount: 0,
    incorrectCount: 0
  };
  
  const updatedCards = [...cards, newCard];
  saveFlashcards(updatedCards);
  
  return newCard;
};

export const deleteFlashcard = async (id: string): Promise<void> => {
  const cards = await getFlashcards();
  const filteredCards = cards.filter(card => card.id !== id);
  saveFlashcards(filteredCards);
};

export const updateFlashcard = async (updatedCard: Flashcard): Promise<void> => {
  const cards = await getFlashcards();
  const updatedCards = cards.map(card => 
    card.id === updatedCard.id ? updatedCard : card
  );
  saveFlashcards(updatedCards);
};

export const updateFlashcardReview = async (id: string, isCorrect: boolean): Promise<void> => {
  const cards = await getFlashcards();
  const updatedCards = cards.map(card => {
    if (card.id === id) {
      return {
        ...card,
        reviewCount: card.reviewCount + 1,
        correctCount: isCorrect ? card.correctCount + 1 : card.correctCount,
        incorrectCount: isCorrect ? card.incorrectCount : card.incorrectCount + 1,
        lastReviewed: new Date()
      };
    }
    return card;
  });
  
  saveFlashcards(updatedCards);
};


export const getFlashcardStats = async (): Promise<FlashcardStats> => {
  const cards = await getFlashcards();
  
  const totalCards = cards.length;
  const totalReviews = cards.reduce((sum, card) => sum + card.reviewCount, 0);
  const correctAnswers = cards.reduce((sum, card) => sum + card.correctCount, 0);
  const incorrectAnswers = cards.reduce((sum, card) => sum + card.incorrectCount, 0);
  const averageAccuracy = totalReviews > 0 ? (correctAnswers / totalReviews) * 100 : 0;
  
  const categoriesStats: { [key: string]: any } = {};
  cards.forEach(card => {
    if (!categoriesStats[card.category]) {
      categoriesStats[card.category] = {
        totalCards: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        accuracy: 0
      };
    }
    
    categoriesStats[card.category].totalCards++;
    categoriesStats[card.category].correctAnswers += card.correctCount;
    categoriesStats[card.category].incorrectAnswers += card.incorrectCount;
  });

  Object.keys(categoriesStats).forEach(category => {
    const stats = categoriesStats[category];
    const totalAnswers = stats.correctAnswers + stats.incorrectAnswers;
    stats.accuracy = totalAnswers > 0 ? (stats.correctAnswers / totalAnswers) * 100 : 0;
  });
  
  return {
    totalCards,
    totalReviews,
    correctAnswers,
    incorrectAnswers,
    averageAccuracy,
    categoriesStats
  };
};