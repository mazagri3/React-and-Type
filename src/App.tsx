// Created by Obi Mazagri
// This is the main App component that sets up routing and layout

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import CandidateList from './components/CandidateList';
import SavedCandidates from './components/SavedCandidates';

interface Candidate {
  id: number;
  name: string;
  email: string;
  location: string;
  company: string;
  bio: string;
  image: string;
}

function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [savedCandidates, setSavedCandidates] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
  }, []);

  const handleAddCandidate = (newCandidate: Omit<Candidate, 'id'>) => {
    const newId = Math.max(...candidates.map(c => c.id), 0) + 1;
    const candidateWithId: Candidate = {
      ...newCandidate,
      id: newId
    };
    setCandidates(prev => [...prev, candidateWithId]);
  };

  const toggleSaveCandidate = (id: number) => {
    setSavedCandidates(prev => {
      const newSaved = prev.includes(id)
        ? prev.filter(candidateId => candidateId !== id)
        : [...prev, id];
      localStorage.setItem('savedCandidates', JSON.stringify(newSaved));
      return newSaved;
    });
  };

  const handleDeleteCandidate = (id: number) => {
    setCandidates(prev => prev.filter(candidate => candidate.id !== id));
    // Also remove from saved candidates if it was saved
    setSavedCandidates(prev => {
      const newSaved = prev.filter(candidateId => candidateId !== id);
      localStorage.setItem('savedCandidates', JSON.stringify(newSaved));
      return newSaved;
    });
  };

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/saved" className="nav-link">Saved Candidates</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={
            <CandidateList 
              candidates={candidates}
              onAddCandidate={handleAddCandidate}
              savedCandidates={savedCandidates}
              toggleSaveCandidate={toggleSaveCandidate}
              onDeleteCandidate={handleDeleteCandidate}
            />
          } />
          <Route path="/saved" element={
            <SavedCandidates 
              candidates={candidates}
              savedCandidates={savedCandidates}
              toggleSaveCandidate={toggleSaveCandidate}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 