// Created by Obi Mazagri
// This is the main App component that sets up routing and layout

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import CandidateSearch from './pages/CandidateSearch';
import SavedCandidates from './pages/SavedCandidates';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<CandidateSearch />} />
            <Route path="/saved" element={<SavedCandidates />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 