import React from 'react';
import { useFlashcards } from '../context/FlashcardContext';
import { Link } from 'react-router-dom';

const Library: React.FC = () => {
  const { flashcards, loading } = useFlashcards();

  if (loading) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
      }}>
        Ładowanie fiszek...
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '2rem',
      fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h1 style={{
          margin: 0,
          fontSize: '2.2rem',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: '"Inter", sans-serif'
        }}>
          Biblioteka fiszek
        </h1>
        <Link 
          to="/add" 
          style={{
            padding: '0.8rem 1.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '10px',
            fontWeight: '600',
            fontSize: '0.95rem',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s ease',
            fontFamily: '"Inter", sans-serif'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
          }}
        >
          + Dodaj fiszkę
        </Link>
      </div>

      {flashcards.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📚</div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '1rem',
            fontFamily: '"Inter", sans-serif'
          }}>
            Twoja biblioteka jest pusta
          </h3>
          <p style={{
            color: '#666',
            fontSize: '1.1rem',
            marginBottom: '2rem',
            lineHeight: 1.6,
            fontFamily: '"Inter", sans-serif'
          }}>
            Nie masz jeszcze żadnych fiszek w bibliotece. Zacznij naukę dodając swoją pierwszą fiszkę!
          </p>
          <Link 
            to="/add" 
            style={{ 
              color: 'white',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              textDecoration: 'none',
              padding: '1rem 2rem',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              display: 'inline-block',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
              fontFamily: '"Inter", sans-serif'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
            }}
          >
            Dodaj pierwszą fiszkę
          </Link>
        </div>
      ) : (
        <>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}>
            <p style={{
              margin: 0,
              fontSize: '1.1rem',
              color: '#333',
              fontWeight: '500',
              fontFamily: '"Inter", sans-serif'
            }}>
              Masz <strong style={{color: '#667eea'}}>{flashcards.length}</strong> fiszek w bibliotece
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '1.5rem'
          }}>
            {flashcards.map((flashcard) => (
              <div 
                key={flashcard.id} 
                style={{
                  border: '1px solid #e1e5e9',
                  borderRadius: '16px',
                  padding: '1.8rem',
                  background: 'white',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                }}
              >
                <div style={{ marginBottom: '1.2rem' }}>
                  <div style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: '700', 
                    marginBottom: '0.8rem',
                    color: '#333',
                    fontFamily: '"Inter", sans-serif'
                  }}>
                    {flashcard.front}
                  </div>
                  <div style={{ 
                    fontSize: '1.1rem', 
                    color: '#555',
                    marginBottom: '1.2rem',
                    lineHeight: 1.5,
                    fontFamily: '"Inter", sans-serif'
                  }}>
                    {flashcard.back}
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  fontSize: '0.85rem'
                }}>
                  <span style={{
                    background: '#f8f9fa',
                    color: '#495057',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '8px',
                    fontWeight: '500',
                    fontFamily: '"Inter", sans-serif'
                  }}>
                    {flashcard.category}
                  </span>
                  
                  <span style={{
                    background: flashcard.difficulty === 'easy' ? '#28a745' : 
                              flashcard.difficulty === 'medium' ? '#ffc107' : '#dc3545',
                    color: flashcard.difficulty === 'medium' ? '#000' : 'white',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    fontFamily: '"Inter", sans-serif'
                  }}>
                    {flashcard.difficulty === 'easy' ? 'Łatwy' : 
                     flashcard.difficulty === 'medium' ? 'Średni' : 'Trudny'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Library;