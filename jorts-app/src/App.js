import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import VotePage from './components/VotePage';
import UploadPage from './components/UploadPage';
import AboutPage from './components/AboutPage';
import CreateAccountPage from './components/CreateAccountPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Welcome to JORTS</h1>
          <nav>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/create-account" className="nav-link">Create Account</Link>
            <Link to="/upload" className="nav-link">Upload Outfit</Link>
            <Link to="/" className="nav-link">Vote</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<VotePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

