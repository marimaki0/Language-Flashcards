import React from 'react';
import { Link } from 'react-router-dom';
import { useFlashcards } from '../context/FlashcardContext';

const Home: React.FC = () => {
  const { flashcards, getTotalCardsStudied, getStreakDays } = useFlashcards();
  const totalStudied = getTotalCardsStudied();
  const streak = getStreakDays();

  return (
    <div style={{ 
      padding: '1rem 2rem 3rem 2rem',  
      maxWidth: '1000px', 
      margin: '0 auto',
      fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}> 
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: '700',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.8rem', 
          lineHeight: 1.2,
          marginTop: '0.5rem' 
        }}>
          Witaj w Language Flashcards!
        </h1>
        
        <p style={{ 
          fontSize: '1.2rem',  
          color: '#666', 
          marginBottom: '2.5rem',  
          maxWidth: '600px',
          margin: '0 auto 2.5rem auto',
          lineHeight: 1.6
        }}>
          Naucz się języków obcych efektywnie dzięki nowoczesnym fiszkom. 
          Śledź postępy i osiągnij swoje cele językowe!
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',  
          marginBottom: '2.5rem', 
          flexWrap: 'wrap'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 20%, #764ba2 100%)',
            color: 'white',
            padding: '1.2rem 1.8rem',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
            minWidth: '130px' 
          }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>
              {flashcards.length}
            </div>
            <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>
              Twoich fiszek
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            padding: '1.2rem 1.8rem',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(240, 147, 251, 0.3)',
            minWidth: '130px'
          }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>
              {totalStudied}
            </div>
            <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>
              Przećwiczonych
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            padding: '1.2rem 1.8rem',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(79, 172, 254, 0.3)',
            minWidth: '130px'
          }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>
              {streak}
            </div>
            <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>
              Dni z rzędu
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {flashcards.length > 0 ? (
            <Link 
              to="/study"
              style={{
                padding: '1.1rem 2.2rem',  
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                fontSize: '1.05rem',
                fontWeight: '600',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
              }}
            >
              🚀 Rozpocznij naukę
            </Link>
          ) : (
            <Link 
              to="/add"
              style={{
                padding: '1.1rem 2.2rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                fontSize: '1.05rem',
                fontWeight: '600',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
              }}
            >
              ✨ Dodaj pierwszą fiszkę
            </Link>
          )}
          
          <Link 
            to="/library"
            style={{
              padding: '1.1rem 2.2rem',
              background: 'white',
              color: '#667eea',
              textDecoration: 'none',
              borderRadius: '12px',
              fontSize: '1.05rem',
              fontWeight: '600',
              border: '2px solid #667eea',
              transition: 'all 0.3s ease',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#667eea';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#667eea';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            📚 Przeglądaj bibliotekę
          </Link>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.8rem',
        marginTop: '3rem'
      }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          textAlign: 'center',
          transition: 'transform 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🧠</div>
          <h3 style={{ 
            fontSize: '1.3rem', 
            fontWeight: '600', 
            color: '#333', 
            marginBottom: '0.8rem',
            fontFamily: '"Inter", sans-serif'
          }}>
            Inteligentna nauka
          </h3>
          <p style={{ 
            color: '#666', 
            lineHeight: 1.6,
            fontFamily: '"Inter", sans-serif'
          }}>
            Dwa tryby nauki: klasyczne fiszki i interaktywny quiz. 
            Wybierz najlepszy sposób dla siebie.
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          textAlign: 'center',
          transition: 'transform 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📈</div>
          <h3 style={{ 
            fontSize: '1.3rem', 
            fontWeight: '600', 
            color: '#333', 
            marginBottom: '0.8rem',
            fontFamily: '"Inter", sans-serif'
          }}>
            Śledzenie postępów
          </h3>
          <p style={{ 
            color: '#666', 
            lineHeight: 1.6,
            fontFamily: '"Inter", sans-serif'
          }}>
            Monitoruj swoje osiągnięcia, sprawdzaj statystyki 
            i buduj motywujące serie nauki.
          </p>
        </div>

        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          textAlign: 'center',
          transition: 'transform 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
          <h3 style={{ 
            fontSize: '1.3rem', 
            fontWeight: '600', 
            color: '#333', 
            marginBottom: '0.8rem',
            fontFamily: '"Inter", sans-serif'
          }}>
            Personalizacja
          </h3>
          <p style={{ 
            color: '#666', 
            lineHeight: 1.6,
            fontFamily: '"Inter", sans-serif'
          }}>
            Twórz własne kategorie fiszek, ustaw poziomy trudności 
            i dostosuj naukę do swoich potrzeb.
          </p>
        </div>
      </div>

      {flashcards.length === 0 && (
        <div style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          padding: '2.5rem',
          borderRadius: '20px',
          textAlign: 'center',
          marginTop: '2.5rem',
          boxShadow: '0 8px 32px rgba(240, 147, 251, 0.3)'
        }}>
          <h3 style={{ 
            fontSize: '1.6rem', 
            fontWeight: '600', 
            marginBottom: '1rem',
            fontFamily: '"Inter", sans-serif'
          }}>
            🌟 Rozpocznij swoją przygodę z językami!
          </h3>
          <p style={{ 
            fontSize: '1rem', 
            marginBottom: '2rem',
            opacity: 0.9,
            lineHeight: 1.6,
            fontFamily: '"Inter", sans-serif'
          }}>
            Każdy ekspert był kiedyś początkującym. Dodaj swoją pierwszą fiszkę 
            i zacznij budować swoją wiedzę językową już dziś!
          </p>
          <Link 
            to="/add"
            style={{
              padding: '1rem 2rem',
              background: 'white',
              color: '#f5576c',
              textDecoration: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              display: 'inline-block',
              transition: 'all 0.3s ease',
              fontFamily: '"Inter", sans-serif'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(255,255,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Zaczynamy! 🚀
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;