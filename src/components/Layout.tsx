import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo} style={{
            fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
          }}>
            <span className={styles.logoIcon}>🎴</span>
            Language Flashcards
          </Link>
          
          <nav className={styles.nav}>
            <Link 
              to="/" 
              className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
              style={{
                fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
              }}
            >
              Strona główna
            </Link>
            <Link 
              to="/library" 
              className={`${styles.navLink} ${isActive('/library') ? styles.active : ''}`}
              style={{
                fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
              }}
            >
              Biblioteka
            </Link>
            <Link 
              to="/study" 
              className={`${styles.navLink} ${isActive('/study') ? styles.active : ''}`}
              style={{
                fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
              }}
            >
              Nauka
            </Link>
            <Link 
              to="/add" 
              className={`${styles.navLink} ${isActive('/add') ? styles.active : ''}`}
              style={{
                fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
              }}
            >
              Dodaj fiszkę
            </Link>
            <Link 
              to="/stats" 
              className={`${styles.navLink} ${isActive('/stats') ? styles.active : ''}`}
              style={{
                fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
              }}
            >
              Statystyki
            </Link>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          {children}
        </div>
      </main>

      <footer className={styles.footer} style={{
        fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
      }}>
        <div className={styles.container}>
          <p>&copy; 2024 Language Flashcards. Zbudowane z React i TypeScript.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;