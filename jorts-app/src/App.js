import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import VotePage from './components/VotePage';
import UploadPage from './components/UploadPage';
import AboutPage from './components/AboutPage';  // Import AboutPage
import CreateAccountPage from './components/CreateAccountPage'; // Import CreateAccountPage
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Welcome to JORTS</h1>
          <nav>
            <Link to="/" className="nav-link">Vote</Link>
            <Link to="/upload" className="nav-link">Upload Outfit</Link>
            <Link to="/about" className="nav-link">About</Link> {/* Add About Link */}
            <Link to="/create-account" className="nav-link">Create Account</Link> {/* Add Create Account Link */}
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<VotePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/about" element={<AboutPage />} /> {/* Add About Route */}
          <Route path="/create-account" element={<CreateAccountPage />} /> {/* Add Create Account Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
