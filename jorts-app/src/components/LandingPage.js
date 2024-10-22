import React from 'react';

const LandingPage = () => {
  return (
    <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
      <h1>Welcome to JORTS</h1>
      <p style={{ fontSize: '20px', color: '#555' }}>
        Join Others, Rate Today’s Styles!
      </p>
      <p style={{ maxWidth: '600px', margin: '20px auto', color: '#666' }}>
        JORTS is the new social media platform where you upload your daily fits, vote on others' outfits, and share your fashion knowledge with the community.
      </p>
      <div>
        <button style={{ marginRight: '10px' }}>Get Started</button>
        <button>Learn More</button>
      </div>
    </div>
  );
};

export default LandingPage;
