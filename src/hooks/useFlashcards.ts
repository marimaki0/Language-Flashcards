import { useState, useEffect, useCallback } from 'react';
import { Flashcard, FilterOptions, StudySession } from '../types';
import * as flashcardsApi from '../api/flashcards';

export const useFlashcards = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFlashcards();
  }, []);

  const loadFlashcards = async () => {
    try {
      setLoading(true);
      setError(null);
      const cards = await flashcardsApi.getFlashcards();
      setFlashcards(cards);
    } catch (err) {
      setError('Nie udało się załadować fiszek');
      console.error('Error loading flashcards:', err);
    } finally {
      setLoading(false);
    }
  };

  const addFlashcard = async (cardData: Omit<Flashcard, 'id' | 'createdAt' | 'reviewCount' | 'correctCount' | 'incorrectCount'>) => {
    try {
      const newCard = await flashcardsApi.addFlashcard(cardData);
      setFlashcards(prev => [...prev, newCard]);
      return newCard;
    } catch (err) {
      setError('Nie udało się dodać fiszki');
      throw err;
    }
  };

  const updateFlashcard = async (updatedCard: Flashcard) => {
    try {
      await flashcardsApi.updateFlashcard(updatedCard); 
      setFlashcards(prev => prev.map(card => 
        card.id === updatedCard.id ? updatedCard : card
      ));
    } catch (err) {
      setError('Nie udało się zaktualizować fiszki');
      throw err;
    }
  };

  const deleteFlashcard = async (id: string) => {
    try {
      await flashcardsApi.deleteFlashcard(id);
      setFlashcards(prev => prev.filter(card => card.id !== id));
    } catch (err) {
      setError('Nie udało się usunąć fiszki');
      throw err;
    }
  };

  const updateFlashcardReview = async (id: string, isCorrect: boolean) => {
    try {
      await flashcardsApi.updateFlashcardReview(id, isCorrect); 

      const cardToUpdate = flashcards.find(card => card.id === id);
      if (!cardToUpdate) return;

      const updatedCard: Flashcard = {
        ...cardToUpdate,
        reviewCount: (cardToUpdate.reviewCount || 0) + 1,
        correctCount: isCorrect ? (cardToUpdate.correctCount || 0) + 1 : (cardToUpdate.correctCount || 0),
        incorrectCount: isCorrect ? (cardToUpdate.incorrectCount || 0) : (cardToUpdate.incorrectCount || 0) + 1,
        lastReviewed: new Date(),
        difficulty: isCorrect 
          ? (cardToUpdate.difficulty === 'hard' ? 'medium' : cardToUpdate.difficulty === 'medium' ? 'easy' : 'easy')
          : (cardToUpdate.difficulty === 'easy' ? 'medium' : 'hard')
      };
      
      setFlashcards(prev => prev.map(card => 
        card.id === id ? updatedCard : card
      ));
    } catch (err) {
      setError('Nie udało się zaktualizować fiszki');
      throw err;
    }
  };

  const getFilteredFlashcards = useCallback((filters: FilterOptions = {}) => {
    return flashcards.filter(card => {
      if (filters.category && card.category !== filters.category) {
        return false;
      }
      
      if (filters.difficulty && card.difficulty !== filters.difficulty) {
        return false;
      }
      
      if (filters.onlyNotReviewed && (card.reviewCount || 0) > 0) {
        return false;
      }
      
      return true;
    });
  }, [flashcards]);

  const getCategories = useCallback(() => {
    const categories = new Set(flashcards.map(card => card.category));
    return Array.from(categories).sort();
  }, [flashcards]);

  const getRandomFlashcards = useCallback((count: number = 10, filters: FilterOptions = {}) => {
    const filtered = getFilteredFlashcards(filters);
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }, [getFilteredFlashcards]);

  return {
    flashcards,
    loading,
    error,
    loadFlashcards,
    addFlashcard,
    updateFlashcard,
    deleteFlashcard,
    updateFlashcardReview,
    getFilteredFlashcards,
    getCategories,
    getRandomFlashcards,
    clearError: () => setError(null)
  };
};

export const useStudySession = (initialCards: Flashcard[]) => {
  const [session, setSession] = useState<StudySession>({
    id: Date.now().toString(),
    cards: initialCards,
    currentCardIndex: 0,
    isComplete: false,
    startTime: new Date()
  });

  const [showAnswer, setShowAnswer] = useState(false);
  const { updateFlashcardReview } = useFlashcards();

  const currentCard = session.cards[session.currentCardIndex] || null;

  const nextCard = () => {
    if (session.currentCardIndex < session.cards.length - 1) {
      setSession(prev => ({
        ...prev,
        currentCardIndex: prev.currentCardIndex + 1
      }));
      setShowAnswer(false);
    } else {
      setSession(prev => ({
        ...prev,
        isComplete: true,
        endTime: new Date()
      }));
    }
  };

  const handleAnswer = async (id: string, isCorrect: boolean) => {
    if (currentCard && currentCard.id === id) {
      await updateFlashcardReview(currentCard.id, isCorrect);

      setTimeout(() => {
        nextCard();
      }, 1500);
    }
  };

  const resetSession = () => {
    setSession(prev => ({
      id: Date.now().toString(),
      cards: initialCards,
      currentCardIndex: 0,
      isComplete: false,
      startTime: new Date(),
      endTime: undefined
    }));
    setShowAnswer(false);
  };

  useEffect(() => {
    if (initialCards.length > 0) {
      setSession(prev => ({
        ...prev,
        cards: initialCards
      }));
    }
  }, [initialCards]);

  return {
    session,
    currentCard,
    showAnswer,
    setShowAnswer,
    handleAnswer,
    nextCard,
    resetSession,
    progress: {
      current: session.currentCardIndex + 1,
      total: session.cards.length,
      percentage: session.cards.length > 0 ? ((session.currentCardIndex + 1) / session.cards.length) * 100 : 0
    }
  };
};