import React, { useState } from 'react';
import { useFlashcards } from '../context/FlashcardContext';
import { useNavigate } from 'react-router-dom';

const Add: React.FC = () => {
  const { addFlashcard } = useFlashcards();
  const navigate = useNavigate();
  
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!frontText.trim()) {
      newErrors.frontText = 'Przód fiszki nie może być pusty';
    }
    if (!backText.trim()) {
      newErrors.backText = 'Tył fiszki nie może być pusty';
    }
    if (!category.trim()) {
      newErrors.category = 'Kategoria jest wymagana';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    addFlashcard({
      front: frontText.trim(),
      back: backText.trim(),
      category: category.trim(),
      difficulty: difficulty
    });
    
    setFrontText('');
    setBackText('');
    setCategory('');
    setDifficulty('medium');
    setErrors({});
    
    alert('Fiszka została dodana! 🎉');
    navigate('/library');
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '2rem auto', 
      padding: '2rem',
      fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <h1 style={{
        fontSize: '2.2rem',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '0.8rem',
        fontFamily: '"Inter", sans-serif'
      }}>
        Dodaj nową fiszkę
      </h1>
      <p style={{
        color: '#666',
        fontSize: '1.1rem',
        marginBottom: '2rem',
        lineHeight: 1.6,
        fontFamily: '"Inter", sans-serif'
      }}>
        Utwórz nową fiszkę do nauki. Wypełnij wszystkie pola i wybierz odpowiedni poziom trudności.
      </p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <div>
          <label htmlFor="frontText" style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            fontWeight: '600',
            color: '#333',
            fontSize: '0.95rem',
            fontFamily: '"Inter", sans-serif'
          }}>
            Przód fiszki *
          </label>
          <input
            type="text"
            id="frontText"
            value={frontText}
            onChange={(e) => setFrontText(e.target.value)}
            placeholder="np. Hello, Bonjour, Hola..."
            style={{
              width: '100%',
              padding: '0.9rem',
              border: errors.frontText ? '2px solid #dc3545' : '2px solid #e1e5e9',
              borderRadius: '10px',
              fontSize: '1rem',
              fontFamily: '"Inter", sans-serif',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              if (!errors.frontText) {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }
            }}
            onBlur={(e) => {
              if (!errors.frontText) {
                e.target.style.borderColor = '#e1e5e9';
                e.target.style.boxShadow = 'none';
              }
            }}
          />
          {errors.frontText && (
            <span style={{ 
              color: '#dc3545', 
              fontSize: '0.8rem', 
              fontWeight: '500',
              fontFamily: '"Inter", sans-serif'
            }}>
              {errors.frontText}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="backText" style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            fontWeight: '600',
            color: '#333',
            fontSize: '0.95rem',
            fontFamily: '"Inter", sans-serif'
          }}>
            Tył fiszki (tłumaczenie) *
          </label>
          <textarea
            id="backText"
            value={backText}
            onChange={(e) => setBackText(e.target.value)}
            placeholder="np. Cześć, Cześć (francuski), Cześć (hiszpański)..."
            rows={3}
            style={{
              width: '100%',
              padding: '0.9rem',
              border: errors.backText ? '2px solid #dc3545' : '2px solid #e1e5e9',
              borderRadius: '10px',
              fontSize: '1rem',
              fontFamily: '"Inter", sans-serif',
              resize: 'vertical',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              if (!errors.backText) {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }
            }}
            onBlur={(e) => {
              if (!errors.backText) {
                e.target.style.borderColor = '#e1e5e9';
                e.target.style.boxShadow = 'none';
              }
            }}
          />
          {errors.backText && (
            <span style={{ 
              color: '#dc3545', 
              fontSize: '0.8rem', 
              fontWeight: '500',
              fontFamily: '"Inter", sans-serif'
            }}>
              {errors.backText}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="category" style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            fontWeight: '600',
            color: '#333',
            fontSize: '0.95rem',
            fontFamily: '"Inter", sans-serif'
          }}>
            Kategoria *
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="np. Podstawowe, Czasowniki, Podróże"
            style={{
              width: '100%',
              padding: '0.9rem',
              border: errors.category ? '2px solid #dc3545' : '2px solid #e1e5e9',
              borderRadius: '10px',
              fontSize: '1rem',
              fontFamily: '"Inter", sans-serif',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              if (!errors.category) {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }
            }}
            onBlur={(e) => {
              if (!errors.category) {
                e.target.style.borderColor = '#e1e5e9';
                e.target.style.boxShadow = 'none';
              }
            }}
          />
          {errors.category && (
            <span style={{ 
              color: '#dc3545', 
              fontSize: '0.8rem', 
              fontWeight: '500',
              fontFamily: '"Inter", sans-serif'
            }}>
              {errors.category}
            </span>
          )}
        </div>

        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.8rem', 
            fontWeight: '600',
            color: '#333',
            fontSize: '0.95rem',
            fontFamily: '"Inter", sans-serif'
          }}>
            Poziom trudności *
          </label>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            {[
              { value: 'easy', label: 'Łatwy', color: '#28a745' },
              { value: 'medium', label: 'Średni', color: '#ffc107' },
              { value: 'hard', label: 'Trudny', color: '#dc3545' }
            ].map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => setDifficulty(level.value as 'easy' | 'medium' | 'hard')}
                style={{
                  padding: '0.8rem 1.5rem',
                  border: `2px solid ${difficulty === level.value ? level.color : '#e1e5e9'}`,
                  background: difficulty === level.value ? level.color : 'white',
                  color: difficulty === level.value ? (level.value === 'medium' ? '#000' : 'white') : '#333',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  fontFamily: '"Inter", sans-serif',
                  transition: 'all 0.3s ease',
                  minWidth: '90px'
                }}
                onMouseEnter={(e) => {
                  if (difficulty !== level.value) {
                    e.currentTarget.style.borderColor = level.color;
                    e.currentTarget.style.color = level.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (difficulty !== level.value) {
                    e.currentTarget.style.borderColor = '#e1e5e9';
                    e.currentTarget.style.color = '#333';
                  }
                }}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          style={{
            padding: '1.1rem 2rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.05rem',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '1rem',
            fontFamily: '"Inter", sans-serif',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s ease'
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
          Dodaj fiszkę
        </button>
      </form>

      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        borderRadius: '16px',
        border: '1px solid #dee2e6'
      }}>
        <h3 style={{
          fontSize: '1.3rem',
          fontWeight: '600',
          marginBottom: '1rem',
          color: '#333',
          fontFamily: '"Inter", sans-serif'
        }}>
          💡 Wskazówki
        </h3>
        <ul style={{
          margin: 0,
          paddingLeft: '1.2rem',
          lineHeight: 1.7,
          color: '#555',
          fontFamily: '"Inter", sans-serif'
        }}>
          <li style={{marginBottom: '0.5rem'}}>
            <strong>Przód fiszki:</strong> Wpisz słowo lub wyrażenie w języku, którego się uczysz
          </li>
          <li style={{marginBottom: '0.5rem'}}>
            <strong>Tył fiszki:</strong> Wpisz tłumaczenie lub wyjaśnienie
          </li>
          <li style={{marginBottom: '0.5rem'}}>
            <strong>Kategoria:</strong> Grupuj podobne fiszki razem (np. "Czasowniki", "Podróże")
          </li>
          <li>
            <strong>Poziom trudności:</strong> Pomaga w organizacji nauki od podstaw do zaawansowanych
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Add;