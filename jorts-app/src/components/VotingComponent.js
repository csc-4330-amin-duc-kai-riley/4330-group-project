import React, { useState } from 'react';
import axios from 'axios';

const VotingComponent = () => {
  const [fits, setFits] = useState([{ id: 1, url: 'fit1.jpg' }, { id: 2, url: 'fit2.jpg' }]);

  const handleVote = async (selectedFit) => {
    await axios.post('http://localhost:5000/vote', { fit1: fits[0], fit2: fits[1], selectedFit });
    // Optionally, refresh for new fits
  };

  return (
    <div>
      <img src={fits[0].url} onClick={() => handleVote(fits[0].id)} alt="Fit 1" />
      <img src={fits[1].url} onClick={() => handleVote(fits[1].id)} alt="Fit 2" />
    </div>
  );
};

export default VotingComponent;
