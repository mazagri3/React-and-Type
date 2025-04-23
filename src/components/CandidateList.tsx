import { useState } from 'react';
import './CandidateList.css';
import AddCandidateForm from './AddCandidateForm';

interface Candidate {
  id: number;
  name: string;
  email: string;
  location: string;
  company: string;
  bio: string;
  image: string;
}

interface CandidateListProps {
  candidates: Candidate[];
  onAddCandidate: (candidate: Omit<Candidate, 'id'>) => void;
  savedCandidates: number[];
  toggleSaveCandidate: (id: number) => void;
  onDeleteCandidate?: (id: number) => void;
}

interface DeleteConfirmationProps {
  isOpen: boolean;
  candidateName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmation = ({ isOpen, candidateName, onConfirm, onCancel }: DeleteConfirmationProps) => {
  if (!isOpen) return null;

  return (
    <div className="delete-confirmation-overlay">
      <div className="delete-confirmation">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete {candidateName}?</p>
        <div className="confirmation-buttons">
          <button onClick={onConfirm} className="confirm-delete">Yes, Delete</button>
          <button onClick={onCancel} className="cancel-delete">No, Cancel</button>
        </div>
      </div>
    </div>
  );
};

const CandidateList = ({ 
  candidates, 
  onAddCandidate, 
  savedCandidates, 
  toggleSaveCandidate,
  onDeleteCandidate 
}: CandidateListProps) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    candidateId: number | null;
    candidateName: string;
  }>({
    isOpen: false,
    candidateId: null,
    candidateName: ''
  });

  const handleDeleteClick = (id: number, name: string) => {
    setDeleteConfirmation({
      isOpen: true,
      candidateId: id,
      candidateName: name
    });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmation.candidateId && onDeleteCandidate) {
      onDeleteCandidate(deleteConfirmation.candidateId);
    }
    setDeleteConfirmation({
      isOpen: false,
      candidateId: null,
      candidateName: ''
    });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({
      isOpen: false,
      candidateId: null,
      candidateName: ''
    });
  };

  return (
    <div className="candidate-list">
      <div className="main-header">
        <h1>Candidate Search App</h1>
        <div className="search-icon">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>
      {candidates.length > 0 && (
        <div className="candidates-grid">
          {candidates.map(candidate => (
            <div key={candidate.id} className="candidate-card">
              <div className="candidate-name-box">
                <h2>{candidate.name}</h2>
              </div>
              <div className="candidate-header">
                {candidate.image && (
                  <img 
                    src={candidate.image} 
                    alt={candidate.name} 
                    className="candidate-image"
                  />
                )}
              </div>
              <div className="candidate-info">
                <p className="location">
                  <span className="label">Location:</span>
                  <span className="value">{candidate.location}</span>
                </p>
                <p className="email">
                  <span className="label">Email:</span>
                  <span className="value">{candidate.email}</span>
                </p>
                <p className="company">
                  <span className="label">Company:</span>
                  <span className="value">{candidate.company}</span>
                </p>
                <p className="bio">
                  <span className="label">Bio:</span>
                  <span className="value">{candidate.bio}</span>
                </p>
              </div>
              <button
                onClick={() => toggleSaveCandidate(candidate.id)}
                className={`save-button ${savedCandidates.includes(candidate.id) ? 'saved' : ''}`}
              >
                {savedCandidates.includes(candidate.id) ? '−' : '+'}
              </button>
              <button
                onClick={() => handleDeleteClick(candidate.id, candidate.name)}
                className="delete-button"
                aria-label="Delete candidate"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      <AddCandidateForm onAddCandidate={onAddCandidate} />
      <DeleteConfirmation
        isOpen={deleteConfirmation.isOpen}
        candidateName={deleteConfirmation.candidateName}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default CandidateList; 