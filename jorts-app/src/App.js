import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';
import UploadFitPic from './components/UploadFitPic';
import VotingComponent from './components/VotingComponent';
import Leaderboard from './components/Leaderboard';

function App() {
  const [user, setUser] = useState(null);

  // Check if a user token exists in localStorage (to handle automatic login if page is refreshed)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Assume the user is logged in if a token is found (for demo purposes)
      setUser({ token });
    }
  }, []);

  return (
    <div className="App">
      {!user ? (
        // If no user is logged in, show the Auth component
        <Auth setUser={setUser} />
      ) : (
        // If the user is logged in, show the rest of the app (landing page, upload, voting, leaderboard)
        <div>
          <LandingPage />
          <UploadFitPic />
          <VotingComponent />
          <Leaderboard />
        </div>
      )}
    </div>
  );
}

export default App;



/*
import React, { useState } from 'react';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {!user ? <Auth setUser={setUser} /> : <LandingPage />}
    </div>
  );
}

export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Using Routes instead of Switch
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
*/

