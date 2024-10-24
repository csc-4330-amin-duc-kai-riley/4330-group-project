import React, { useState, useEffect } from 'react';
import '../App.css';

const exampleImages = [
  'https://via.placeholder.com/150?text=Outfit+1',
  'https://via.placeholder.com/150?text=Outfit+2',
  'https://via.placeholder.com/150?text=Outfit+3',
  'https://via.placeholder.com/150?text=Outfit+4',
  'https://via.placeholder.com/150?text=Outfit+5',
  'https://via.placeholder.com/150?text=Outfit+6',
  'https://via.placeholder.com/150?text=Outfit+7',
  'https://via.placeholder.com/150?text=Outfit+8',
  'https://via.placeholder.com/150?text=Outfit+9',
  'https://via.placeholder.com/150?text=Outfit+10',
];

function VotePage() {
  const [votes, setVotes] = useState({});
  const [currentOutfitIndex, setCurrentOutfitIndex] = useState(0); // Track the current outfit index
  const [hasVoted, setHasVoted] = useState(false);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');

  // Load votes and comments from localStorage for persistence
  useEffect(() => {
    const storedVotes = JSON.parse(localStorage.getItem('votes')) || {};
    const storedComments = JSON.parse(localStorage.getItem('comments')) || {};
    setVotes(storedVotes);
    setComments(storedComments);

    if (storedVotes[`page_${currentOutfitIndex}`]) {
      setHasVoted(true); // Disable voting if already voted on this page
    } else {
      setHasVoted(false); // Allow voting on new pages
    }
  }, [currentOutfitIndex]);

  const currentOutfits = [
    exampleImages[currentOutfitIndex],
    exampleImages[currentOutfitIndex + 1],
  ];

  const handleVote = (fit) => {
    if (!hasVoted) {
      const newVotes = { ...votes };
      const outfitKey = `page_${currentOutfitIndex}`;
      
      if (!newVotes[outfitKey]) {
        newVotes[outfitKey] = { fit1: 0, fit2: 0 };
      }

      if (fit === 1) {
        newVotes[outfitKey].fit1 += 1;
      } else {
        newVotes[outfitKey].fit2 += 1;
      }

      setVotes(newVotes);
      setHasVoted(true);
      localStorage.setItem('votes', JSON.stringify(newVotes)); // Persist votes
    }
  };

  const handlePostComment = () => {
    if (newComment.trim()) {
      const outfitKey = `page_${currentOutfitIndex}`;
      const newComments = { ...comments };

      if (!newComments[outfitKey]) {
        newComments[outfitKey] = [];
      }

      newComments[outfitKey].push(newComment);
      setComments(newComments);
      setNewComment('');

      localStorage.setItem('comments', JSON.stringify(newComments)); // Persist comments
    }
  };

  const handleNextPage = () => {
    if (currentOutfitIndex + 2 < exampleImages.length) {
      setCurrentOutfitIndex(currentOutfitIndex + 2);
      setNewComment('');
    }
  };

  const handlePreviousPage = () => {
    if (currentOutfitIndex - 2 >= 0) {
      setCurrentOutfitIndex(currentOutfitIndex - 2);
      setNewComment('');
    }
  };

  const totalVotes = votes[`page_${currentOutfitIndex}`]
    ? votes[`page_${currentOutfitIndex}`].fit1 + votes[`page_${currentOutfitIndex}`].fit2
    : 0;
  const fit1Percentage = totalVotes
    ? Math.round((votes[`page_${currentOutfitIndex}`].fit1 / totalVotes) * 100)
    : 0;
  const fit2Percentage = totalVotes
    ? Math.round((votes[`page_${currentOutfitIndex}`].fit2 / totalVotes) * 100)
    : 0;

  return (
    <div className="vote-section">
      <h2>Vote for the Best Outfit!</h2>
      <div className="outfit-container">
        <div className="outfit">
          <img src={currentOutfits[0]} alt="Fit 1" />
          <button
            onClick={() => handleVote(1)}
            disabled={hasVoted}
            style={{ display: hasVoted ? 'none' : 'block' }}
          >
            Pick Fit 1
          </button>
        </div>
        <div className="outfit">
          <img src={currentOutfits[1]} alt="Fit 2" />
          <button
            onClick={() => handleVote(2)}
            disabled={hasVoted}
            style={{ display: hasVoted ? 'none' : 'block' }}
          >
            Pick Fit 2
          </button>
        </div>
      </div>

      {/* Show vote results only if user has voted */}
      {hasVoted && (
        <div className="vote-results">
          <h3>Results</h3>
          <p>Fit 1: {fit1Percentage}%</p>
          <p>Fit 2: {fit2Percentage}%</p>
        </div>
      )}

      <section className="comment-section">
        <h3>Add a Comment</h3>
        <textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handlePostComment}>Post Comment</button>

        <div className="comment-list">
          <h4>Comments</h4>
          {/* Show comments for the current page */}
          {comments[`page_${currentOutfitIndex}`]?.map((comment, index) => (
            <div key={index} className="comment">
              <p>{comment}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pagination-section" style={{ marginTop: "20px" }}>
        <button className="prev-page-button" onClick={handlePreviousPage}>
          Previous Page
        </button>
        <button className="next-page-button" onClick={handleNextPage}>
          Next Page
        </button>
      </section>
    </div>
  );
}

export default VotePage;
