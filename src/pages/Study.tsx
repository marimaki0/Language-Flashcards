import React, { useState, useEffect } from 'react';
import { useFlashcards } from '../context/FlashcardContext';
import { Link } from 'react-router-dom';

const Study: React.FC = () => {
  const { flashcards, addStudySession } = useFlashcards();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState<'flashcards' | 'quiz' | null>(null);
  const [shuffledCards, setShuffledCards] = useState(flashcards);
  const [stats, setStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0
  });
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [sessionStartTime] = useState(Date.now());

  useEffect(() => {
    if (flashcards.length > 0) {
      const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
      setShuffledCards(shuffled);
    }
  }, [flashcards]);

  const saveStudySession = () => {
    if (stats.total > 0) {
      addStudySession({
        date: new Date().toISOString(),
        mode: studyMode as 'flashcards' | 'quiz',
        totalCards: stats.total,
        correctAnswers: stats.correct,
        incorrectAnswers: stats.incorrect,
        accuracy: Math.round((stats.correct / stats.total) * 100),
        timeSpent: Math.round((Date.now() - sessionStartTime) / 60000)
      });
    }
  };

  const nextCard = () => {
    if (currentIndex < shuffledCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const markAnswer = (correct: boolean) => {
    const newStats = {
      correct: stats.correct + (correct ? 1 : 0),
      incorrect: stats.incorrect + (correct ? 0 : 1),
      total: stats.total + 1
    };
    
    setStats(newStats);
    

    if (currentIndex >= shuffledCards.length - 1) {

      const delay = studyMode === 'quiz' ? 2000 : 1000; 
      
      setTimeout(() => {
        if (newStats.total > 0) {
          addStudySession({
            date: new Date().toISOString(),
            mode: studyMode as 'flashcards' | 'quiz',
            totalCards: newStats.total,
            correctAnswers: newStats.correct,
            incorrectAnswers: newStats.incorrect,
            accuracy: Math.round((newStats.correct / newStats.total) * 100),
            timeSpent: Math.round((Date.now() - sessionStartTime) / 60000)
          });
        }
        setStudyMode(null);
        setCurrentIndex(0);
        setStats({ correct: 0, incorrect: 0, total: 0 });
        setIsFlipped(false);
        setUserAnswer('');
        setShowResult(false);
        alert(`🎉 Sesja zakończona!\nPoprawne: ${newStats.correct}/${newStats.total}\nDokładność: ${Math.round((newStats.correct / newStats.total) * 100)}%`);
      }, delay);
    } else {
      if (studyMode === 'quiz') {
        setTimeout(() => {
          setUserAnswer('');
          setShowResult(false);
          nextCard();
        }, 2000);
      } else {
        setTimeout(() => {
          nextCard();
        }, 500);
      }
    }
  };

  if (!studyMode) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center', 
        maxWidth: '600px', 
        margin: '0 auto',
        fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
      }}>
        <h1 style={{
          fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
        }}>🎓 Rozpocznij naukę</h1>
        <p style={{
          fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
        }}>Wybierz tryb nauki fiszek:</p>
        
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '3rem', flexWrap: 'wrap' }}>
          <div 
            onClick={() => setStudyMode('flashcards')}
            style={{
              padding: '2rem',
              border: '2px solid #667eea',
              borderRadius: '12px',
              cursor: 'pointer',
              background: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              width: '250px'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🃏</div>
            <h3 style={{ 
              color: '#667eea', 
              marginBottom: '1rem',
              fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
            }}>Tryb Fiszek</h3>
            <p style={{ 
              color: '#666', 
              fontSize: '0.9rem',
              fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
            }}>
              Klasyczna nauka z obracaniem fiszek.
            </p>
          </div>

          <div 
            onClick={() => setStudyMode('quiz')}
            style={{
              padding: '2rem',
              border: '2px solid #667eea',
              borderRadius: '12px',
              cursor: 'pointer',
              background: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              width: '250px'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧠</div>
            <h3 style={{ 
              color: '#667eea', 
              marginBottom: '1rem',
              fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
            }}>Tryb Quiz</h3>
            <p style={{ 
              color: '#666', 
              fontSize: '0.9rem',
              fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
            }}>
              Wpisuj odpowiedzi na klawiaturze.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = shuffledCards[currentIndex];

  if (studyMode === 'flashcards') {
    return (
      <div style={{ 
        padding: '2rem', 
        maxWidth: '800px', 
        margin: '0 auto',
        fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
      }}>
        <h1 style={{
          fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
        }}>
          🃏 Fiszka {currentIndex + 1}/{shuffledCards.length}
        </h1>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          justifyContent: 'center'
        }}>
          <div style={{
            background: '#e7f3ff',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
          }}>
            ✅ {stats.correct}
          </div>
          <div style={{
            background: '#ffe7e7',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
          }}>
            ❌ {stats.incorrect}
          </div>
        </div>

        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            width: '100%',
            height: '300px',
            background: isFlipped ? '#28a745' : '#667eea',
            color: 'white',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            cursor: 'pointer',
            marginBottom: '2rem',
            fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
          }}
        >
          <div style={{ fontSize: '1.5rem', textAlign: 'center' }}>
            {isFlipped ? currentCard.back : currentCard.front}
          </div>
          {!isFlipped && (
            <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '1rem' }}>
              Kliknij aby zobaczyć odpowiedź
            </div>
          )}
        </div>

        {isFlipped && (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => markAnswer(false)}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
              }}
            >
              ❌ Nie wiedziałem
            </button>
            <button
              onClick={() => markAnswer(true)}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
              }}
            >
              ✅ Wiedziałem
            </button>
          </div>
        )}
      </div>
    );
  }

  if (studyMode === 'quiz') {
    const checkAnswer = () => {
      const correct = userAnswer.toLowerCase().trim() === currentCard.back.toLowerCase().trim();
      setIsCorrect(correct);
      setShowResult(true);

      markAnswer(correct);
    };

    return (
      <div style={{ 
        padding: '2rem', 
        maxWidth: '800px', 
        margin: '0 auto',
        fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
      }}>
        <h1 style={{
          fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
        }}>
          🧠 Quiz {currentIndex + 1}/{shuffledCards.length}
        </h1>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          justifyContent: 'center'
        }}>
          <div style={{
            background: '#e7f3ff',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
          }}>
            ✅ {stats.correct}
          </div>
          <div style={{
            background: '#ffe7e7',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
          }}>
            ❌ {stats.incorrect}
          </div>
        </div>

        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '2rem',
            color: '#333',
            fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
          }}>
            {currentCard.front}
          </h2>

          {!showResult ? (
            <div>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && userAnswer.trim() && checkAnswer()}
                placeholder="Wpisz swoją odpowiedź..."
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  padding: '1rem',
                  fontSize: '1rem',
                  border: '2px solid #e1e5e9',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                }}
                autoFocus
              />
              <br />
              <button
                onClick={checkAnswer}
                disabled={!userAnswer.trim()}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: userAnswer.trim() ? '#667eea' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: userAnswer.trim() ? 'pointer' : 'not-allowed',
                  fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                }}
              >
                Sprawdź
              </button>
            </div>
          ) : (
            <div style={{
              padding: '1rem',
              borderRadius: '8px',
              background: isCorrect ? '#d4edda' : '#f8d7da',
              border: `2px solid ${isCorrect ? '#28a745' : '#dc3545'}`
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                {isCorrect ? '🎉' : '😔'}
              </div>
              <div style={{
                fontWeight: 'bold',
                color: isCorrect ? '#155724' : '#721c24',
                fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
              }}>
                {isCorrect ? 'Brawo!' : `Poprawna odpowiedź: ${currentCard.back}`}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <div style={{
    fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
  }}>Coś poszło nie tak...</div>;
};

export default Study;