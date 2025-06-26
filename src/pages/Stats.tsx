import React from 'react';
import { useFlashcards } from '../context/FlashcardContext';
import { Link } from 'react-router-dom';

const Stats: React.FC = () => {
  const { 
    flashcards, 
    studySessions, 
    getTotalCardsStudied, 
    getStreakDays, 
    getWeeklyStats, 
    getCategoryStats 
  } = useFlashcards();

  const totalCards = flashcards.length;
  const totalStudied = getTotalCardsStudied();
  const streak = getStreakDays();
  const weeklyStats = getWeeklyStats();
  const categoryStats = getCategoryStats();

  const averageAccuracy = studySessions.length > 0 
    ? Math.round(studySessions.reduce((total, session) => total + session.accuracy, 0) / studySessions.length)
    : 0;

  const today = new Date().toISOString().split('T')[0];
  const todaySessions = studySessions.filter(session => session.date.startsWith(today));
  const todayCards = todaySessions.reduce((total, session) => total + session.totalCards, 0);

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '1000px', 
      margin: '0 auto',
      fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '3rem',
        fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
      }}>
        <h1 style={{
          fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
        }}>📊 Twoje Statystyki</h1>
        <Link 
          to="/study" 
          style={{
            padding: '0.75rem 1.5rem',
            background: '#667eea',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '500',
            fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
          }}
        >
          Rozpocznij naukę
        </Link>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
        }}>
          <div style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '0.5rem',
            fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
          }}>
            {totalCards}
          </div>
          <div style={{ 
            fontSize: '1rem', 
            opacity: 0.9,
            fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
          }}>
            Fiszek w bibliotece
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 4px 15px rgba(240, 147, 251, 0.3)'
        }}>
          <div style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '0.5rem',
            fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
          }}>
            {totalStudied}
          </div>
          <div style={{ 
            fontSize: '1rem', 
            opacity: 0.9,
            fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
          }}>
            Łącznie przeczytanych
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          color: 'white',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 4px 15px rgba(79, 172, 254, 0.3)'
        }}>
          <div style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '0.5rem',
            fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
          }}>
            {streak}
          </div>
          <div style={{ 
            fontSize: '1rem', 
            opacity: 0.9,
            fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
          }}>
            Dni z rzędu
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          color: 'white',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 4px 15px rgba(67, 233, 123, 0.3)'
        }}>
          <div style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '0.5rem',
            fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
          }}>
            {averageAccuracy}%
          </div>
          <div style={{ 
            fontSize: '1rem', 
            opacity: 0.9,
            fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
          }}>
            Średnia dokładność
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '12px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h2 style={{ 
          marginBottom: '1.5rem', 
          color: '#333',
          fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
        }}>📈 Aktywność w tym tygodniu</h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', overflowX: 'auto' }}>
          {weeklyStats.map((day, index) => {
            const dayName = new Date(day.date).toLocaleDateString('pl-PL', { weekday: 'short' });
            const isToday = day.date === today;
            
            return (
              <div 
                key={day.date}
                style={{
                  minWidth: '100px',
                  textAlign: 'center',
                  padding: '1rem',
                  background: isToday ? '#f0f8ff' : '#f8f9fa',
                  borderRadius: '8px',
                  border: isToday ? '2px solid #667eea' : '1px solid #e1e5e9'
                }}
              >
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: '#666', 
                  marginBottom: '0.5rem',
                  fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                }}>
                  {dayName}
                </div>
                <div style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  color: day.cardsStudied > 0 ? '#667eea' : '#ccc',
                  marginBottom: '0.5rem',
                  fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                }}>
                  {day.cardsStudied}
                </div>
                <div style={{ 
                  fontSize: '0.7rem', 
                  color: '#999',
                  fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                }}>
                  {day.cardsStudied > 0 ? `${day.averageAccuracy}%` : '-'}
                </div>
              </div>
            );
          })}
        </div>

        {todayCards > 0 && (
          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1rem', 
            background: '#e7f3ff', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <strong style={{
              fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
            }}>
              🎉 Dzisiaj przećwiczyłeś już {todayCards} fiszek!
            </strong>
          </div>
        )}
      </div>

      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '12px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <h2 style={{ 
          marginBottom: '1.5rem', 
          color: '#333',
          fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
        }}>📚 Statystyki według kategorii</h2>
        
        {Object.keys(categoryStats).length > 0 ? (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {Object.entries(categoryStats).map(([category, stats]) => (
              <div 
                key={category}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e1e5e9'
                }}
              >
                <div>
                  <h3 style={{ 
                    margin: '0 0 0.5rem 0', 
                    fontSize: '1.1rem',
                    fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                  }}>
                    {category}
                  </h3>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '0.9rem', 
                    color: '#666',
                    fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                  }}>
                    {flashcards.filter(card => card.category === category).length} fiszek
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ 
                    fontSize: '1.2rem', 
                    fontWeight: 'bold', 
                    color: '#667eea',
                    fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                  }}>
                    {stats.studied}
                  </div>
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: '#999',
                    fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                  }}>
                    przećwiczonych
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ 
            color: '#666', 
            textAlign: 'center', 
            padding: '2rem',
            fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
          }}>
            Rozpocznij naukę aby zobaczyć statystyki kategorii.
          </p>
        )}
      </div>

      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '12px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          marginBottom: '1.5rem', 
          color: '#333',
          fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
        }}>🕐 Ostatnie sesje nauki</h2>
        
        {studySessions.length > 0 ? (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {studySessions
              .slice(-5)
              .reverse()
              .map((session) => (
                <div 
                  key={session.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #e1e5e9'
                  }}
                >
                  <div>
                    <div style={{ 
                      fontWeight: 'bold', 
                      marginBottom: '0.25rem',
                      fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                    }}>
                      {session.mode === 'quiz' ? '🧠 Tryb Quiz' : '🃏 Tryb Fiszek'}
                    </div>
                    <div style={{ 
                      fontSize: '0.9rem', 
                      color: '#666',
                      fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                    }}>
                      {new Date(session.date).toLocaleDateString('pl-PL', { 
                        day: 'numeric', 
                        month: 'short', 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: 'bold',
                      fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                    }}>
                      {session.correctAnswers}/{session.totalCards}
                    </div>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: session.accuracy >= 80 ? '#28a745' : session.accuracy >= 60 ? '#ffc107' : '#dc3545',
                      fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                    }}>
                      {session.accuracy}% poprawnych
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ 
              color: '#666', 
              marginBottom: '1rem',
              fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
            }}>
              Nie masz jeszcze żadnych sesji nauki.
            </p>
            <Link 
              to="/study" 
              style={{
                padding: '0.75rem 1.5rem',
                background: '#667eea',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
              }}
            >
              Rozpocznij pierwszą sesję
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;