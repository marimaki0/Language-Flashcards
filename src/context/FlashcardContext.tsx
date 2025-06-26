import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Flashcard {
  id: number;
  front: string;
  back: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface StudySession {
  id: number;
  date: string;
  mode: 'flashcards' | 'quiz';
  totalCards: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  timeSpent: number; // w minutach
}

export interface DailyStats {
  date: string;
  cardsStudied: number;
  sessionsCompleted: number;
  averageAccuracy: number;
  timeSpent: number;
}

interface FlashcardContextType {
  flashcards: Flashcard[];
  studySessions: StudySession[];
  addFlashcard: (flashcard: Omit<Flashcard, 'id'>) => void;
  updateFlashcard: (flashcard: Flashcard) => void; // DODANO
  deleteFlashcard: (id: number) => void; // DODANO
  addStudySession: (session: Omit<StudySession, 'id'>) => void;
  loading: boolean;
  // Funkcje statystyk
  getTotalCardsStudied: () => number;
  getStreakDays: () => number;
  getWeeklyStats: () => DailyStats[];
  getCategoryStats: () => { [category: string]: { studied: number; accuracy: number } };
}

const FlashcardContext = createContext<FlashcardContextType | undefined>(undefined);

export const FlashcardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const savedFlashcards = localStorage.getItem('flashcards');
    if (savedFlashcards) {
      try {
        setFlashcards(JSON.parse(savedFlashcards));
      } catch (error) {
        console.error('Błąd parsowania fiszek:', error);
        loadDefaultFlashcards();
      }
    } else {
      loadDefaultFlashcards();
    }


    const savedSessions = localStorage.getItem('studySessions');
    if (savedSessions) {
      try {
        setStudySessions(JSON.parse(savedSessions));
      } catch (error) {
        console.error('Błąd parsowania sesji:', error);
      }
    }
    
    setLoading(false);
  }, []);

  const loadDefaultFlashcards = () => {
    const defaultFlashcards = [
      {
        id: 1,
        front: "Hello",
        back: "Cześć",
        category: "English", 
        difficulty: "easy" as const
      },
      {
        id: 2,
        front: "Goodbye", 
        back: "Do widzenia",
        category: "English",
        difficulty: "easy" as const
      },
      {
        id: 3,
        front: "Thank you",
        back: "Dziękuję",
        category: "English",
        difficulty: "medium" as const
      },
      {
        id: 4,
        front: "Bonjour",
        back: "Dzień dobry",
        category: "French",
        difficulty: "easy" as const
      },
      {
        id: 5,
        front: "Merci",
        back: "Dziękuję",
        category: "French",
        difficulty: "medium" as const
      }
    ];
    setFlashcards(defaultFlashcards);
    localStorage.setItem('flashcards', JSON.stringify(defaultFlashcards));
  };

  const addFlashcard = (newFlashcardData: Omit<Flashcard, 'id'>) => {
    const newFlashcard: Flashcard = {
      ...newFlashcardData,
      id: Date.now()
    };
    
    const updatedFlashcards = [...flashcards, newFlashcard];
    setFlashcards(updatedFlashcards);
    localStorage.setItem('flashcards', JSON.stringify(updatedFlashcards));
  };

  const updateFlashcard = (updatedFlashcard: Flashcard) => {
    const updatedFlashcards = flashcards.map(card => 
      card.id === updatedFlashcard.id ? updatedFlashcard : card
    );
    setFlashcards(updatedFlashcards);
    localStorage.setItem('flashcards', JSON.stringify(updatedFlashcards));
  };

  const deleteFlashcard = (id: number) => {
    const updatedFlashcards = flashcards.filter(card => card.id !== id);
    setFlashcards(updatedFlashcards);
    localStorage.setItem('flashcards', JSON.stringify(updatedFlashcards));
  };

  const addStudySession = (sessionData: Omit<StudySession, 'id'>) => {
    const newSession: StudySession = {
      ...sessionData,
      id: Date.now(),
      accuracy: Math.round((sessionData.correctAnswers / sessionData.totalCards) * 100)
    };
    
    const updatedSessions = [...studySessions, newSession];
    setStudySessions(updatedSessions);
    localStorage.setItem('studySessions', JSON.stringify(updatedSessions));
    
    console.log('Dodano sesję nauki:', newSession);
  };

  const getTotalCardsStudied = () => {
    return studySessions.reduce((total, session) => total + session.totalCards, 0);
  };

  const getStreakDays = () => {
    if (studySessions.length === 0) return 0;

    const sortedSessions = [...studySessions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const uniqueDaysSet = new Set(sortedSessions.map(session => 
      session.date.split('T')[0]
    ));
    const uniqueDays = Array.from(uniqueDaysSet);
    
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    
    for (let i = 0; i < uniqueDays.length; i++) {
      const daysDiff = Math.floor(
        (new Date(today).getTime() - new Date(uniqueDays[i]).getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (daysDiff === i) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getWeeklyStats = (): DailyStats[] => {
    const today = new Date();
    const weeklyStats: DailyStats[] = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const daySessions = studySessions.filter(session => 
        session.date.startsWith(dateString)
      );
      
      const cardsStudied = daySessions.reduce((total, session) => 
        total + session.totalCards, 0
      );
      
      const averageAccuracy = daySessions.length > 0 
        ? Math.round(daySessions.reduce((total, session) => 
            total + session.accuracy, 0) / daySessions.length)
        : 0;
      
      const timeSpent = daySessions.reduce((total, session) => 
        total + session.timeSpent, 0
      );
      
      weeklyStats.push({
        date: dateString,
        cardsStudied,
        sessionsCompleted: daySessions.length,
        averageAccuracy,
        timeSpent
      });
    }
    
    return weeklyStats;
  };

  const getCategoryStats = () => {
    const categoryStats: { [category: string]: { studied: number; accuracy: number } } = {};

    const categoriesSet = new Set(flashcards.map(card => card.category));
    const categories = Array.from(categoriesSet);
    
    categories.forEach(category => {
      const categoryCards = flashcards.filter(card => card.category === category);

      const relevantSessions = studySessions.filter(session => session.totalCards > 0);
      
      const studied = relevantSessions.reduce((total, session) => total + session.totalCards, 0);
      const accuracy = relevantSessions.length > 0 
        ? Math.round(relevantSessions.reduce((total, session) => 
            total + session.accuracy, 0) / relevantSessions.length)
        : 0;
      
      categoryStats[category] = { studied, accuracy };
    });
    
    return categoryStats;
  };

  return (
    <FlashcardContext.Provider value={{
      flashcards,
      studySessions,
      addFlashcard,
      updateFlashcard, 
      deleteFlashcard, 
      addStudySession,
      loading,
      getTotalCardsStudied,
      getStreakDays,
      getWeeklyStats,
      getCategoryStats
    }}>
      {children}
    </FlashcardContext.Provider>
  );
};

export const useFlashcards = () => {
  const context = useContext(FlashcardContext);
  if (!context) {
    throw new Error('useFlashcards must be used within FlashcardProvider');
  }
  return context;
};