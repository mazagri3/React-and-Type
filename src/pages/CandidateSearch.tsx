// Created by Obi Mazagri
// This component implements the candidate search functionality
// It displays candidate information and allows saving/rejecting candidates

import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { User } from '../interfaces/User';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load a new candidate
  const loadNewCandidate = async () => {
    try {
      setLoading(true);
      const candidates = await searchGithub();
      if (candidates.length > 0) {
        setCurrentCandidate(candidates[0]);
      } else {
        setError('No more candidates available');
      }
    } catch (err) {
      setError('Failed to load candidate');
    } finally {
      setLoading(false);
    }
  };

  // Save candidate to localStorage
  const saveCandidate = () => {
    if (currentCandidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      savedCandidates.push(currentCandidate);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
      loadNewCandidate();
    }
  };

  // Load initial candidate
  useEffect(() => {
    loadNewCandidate();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!currentCandidate) return <div>No candidates available</div>;

  return (
    <div className="candidate-search">
      <h1>Candidate Search</h1>
      <div className="candidate-card">
        <img src={currentCandidate.avatar_url} alt={currentCandidate.login} />
        <h2>{currentCandidate.name || currentCandidate.login}</h2>
        <p>Username: {currentCandidate.login}</p>
        <p>Location: {currentCandidate.location || 'Not specified'}</p>
        <p>Email: {currentCandidate.email || 'Not available'}</p>
        <p>Company: {currentCandidate.company || 'Not specified'}</p>
        <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
          View GitHub Profile
        </a>
        <div className="actions">
          <button onClick={saveCandidate}>+ Save</button>
          <button onClick={loadNewCandidate}>- Skip</button>
        </div>
      </div>
    </div>
  );
};

export default CandidateSearch; 