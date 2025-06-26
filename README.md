# Language Flashcards

Aplikacja do nauki słówek metodą fiszek zbudowana w React z TypeScript.

## 🚀 Funkcje

- **Dodawanie fiszek** - Twórz własne fiszki z słówkami w różnych językach
- **Biblioteka fiszek** - Przeglądaj, filtruj i zarządzaj swoimi fiszkami
- **Sesje nauki** - Interaktywne sesje nauki z systemem oceniania
- **Statystyki** - Śledź swój postęp i analizuj wyniki
- **Kategorie** - Organizuj fiszki według kategorii
- **Poziomy trudności** - Oznaczaj fiszki jako łatwe, średnie lub trudne
- **Responsywny design** - Działa na wszystkich urządzeniach

## 🛠️ Technologie

- **React 18** - Biblioteka UI
- **TypeScript** - Typowanie statyczne
- **React Router** - Routing
- **CSS Modules** - Stylowanie komponentów
- **LocalStorage** - Przechowywanie danych lokalnie

## 📁 Struktura projektu

```
language-flashcards/
├─ public/
│   └─ flashcards.json          # Przykładowe dane
├─ src/
│   ├─ api/
│   │   └─ flashcards.ts        # API do zarządzania fiszkami
│   ├─ components/
│   │   ├─ Layout.tsx           # Layout aplikacji
│   │   ├─ Flashcard.tsx        # Komponent fiszki
│   │   ├─ AddForm.tsx          # Formularz dodawania fiszek
│   │   ├─ StatsChart.tsx       # Wykresy statystyk
│   │   ├─ CanvasPractice.tsx   # Interaktywna plansza do pisania
│   │   └─ Loader.tsx           # Komponenty ładowania
│   ├─ hooks/
│   │   └─ useFlashcards.ts     # Custom hook do zarządzania fiszkami
│   ├─ pages/
│   │   ├─ Home.tsx             # Strona główna
│   │   ├─ Library.tsx          # Biblioteka fiszek
│   │   ├─ Add.tsx              # Dodawanie fiszek
│   │   └─ Stats.tsx            # Statystyki
│   ├─ styles/
│   │   └─ globals.css          # Globalne style
│
```
