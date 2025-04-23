// Created by Obi Mazagri
// This component displays the list of saved candidates
// It allows viewing and removing saved candidates

import { useState, useEffect } from 'react';
import { User } from '../interfaces/User';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<User[]>([]);

  // Load saved candidates from localStorage
  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(candidates);
  }, []);

  // Remove a candidate from the saved list
  const removeCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.id !== id);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  if (savedCandidates.length === 0) {
    return <div>No saved candidates yet</div>;
  }

  return (
    <div className="saved-candidates">
      <h1>Saved Candidates</h1>
      <div className="candidates-list">
        {savedCandidates.map(candidate => (
          <div key={candidate.id} className="candidate-card">
            <img src={candidate.avatar_url} alt={candidate.login} />
            <h2>{candidate.name || candidate.login}</h2>
            <p>Username: {candidate.login}</p>
            <p>Location: {candidate.location || 'Not specified'}</p>
            <p>Email: {candidate.email || 'Not available'}</p>
            <p>Company: {candidate.company || 'Not specified'}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              View GitHub Profile
            </a>
            <button onClick={() => removeCandidate(candidate.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedCandidates; 