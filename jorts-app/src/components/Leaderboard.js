import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null); // Track any errors

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:5001/leaderboard');
        setLeaderboard(response.data.leaderboard);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
        setError('Failed to load leaderboard. Please try again later.');
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {leaderboard.map((fit, index) => (
            <li key={index}>{fit.outfitName}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;

