import { useState } from 'react';
import './SavedCandidates.css';

interface Candidate {
  id: number;
  name: string;
  email: string;
  location: string;
  company: string;
  bio: string;
  image: string;
}

interface SavedCandidatesProps {
  candidates: Candidate[];
  savedCandidates: number[];
  toggleSaveCandidate: (id: number) => void;
}

const SavedCandidates = ({ 
  candidates, 
  savedCandidates, 
  toggleSaveCandidate 
}: SavedCandidatesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter candidates to show only saved ones
  const savedCandidatesList = candidates.filter(candidate => 
    savedCandidates.includes(candidate.id)
  );

  // Pagination logic
  const itemsPerPage = Math.ceil(savedCandidatesList.length / 2); // Split into 2 pages
  const totalPages = 2;
  
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return savedCandidatesList.slice(startIndex, endIndex);
  };

  return (
    <div className="saved-candidates">
      <h1>Potential Candidates</h1>
      {savedCandidatesList.length === 0 ? (
        <p className="no-candidates">No potential candidates yet.</p>
      ) : (
        <>
          <div className="candidates-table-container">
            <table className="candidates-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Bio</th>
                  <th>Reject</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentPageData().map(candidate => (
                  <tr key={candidate.id} className="candidate-row">
                    <td className="image-cell">
                      {candidate.image && (
                        <img 
                          src={candidate.image} 
                          alt={candidate.name} 
                          className="candidate-image"
                        />
                      )}
                    </td>
                    <td className="name-cell">
                      <span className="name">{candidate.name}</span>
                    </td>
                    <td>{candidate.location}</td>
                    <td className="email-cell">
                      <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
                    </td>
                    <td>{candidate.company}</td>
                    <td>{candidate.bio}</td>
                    <td>
                      <button
                        onClick={() => toggleSaveCandidate(candidate.id)}
                        className="reject-button"
                        aria-label="Remove candidate"
                      >
                        −
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <button 
              className="pagination-button"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              1
            </button>
            <button 
              className="pagination-button"
              onClick={() => setCurrentPage(2)}
              disabled={currentPage === 2}
            >
              2
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SavedCandidates; 