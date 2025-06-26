import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FlashcardProvider } from './context/FlashcardContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Library from './pages/Library'; 
import Add from './pages/Add';
import Study from './pages/Study'; 
import Stats from './pages/Stats';

function App() {
  return (
    <FlashcardProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/add" element={<Add />} />
          <Route path="/study" element={<Study />} /> {/* NOWY ROUTE */}
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </Layout>
    </FlashcardProvider>
  );
}

export default App;