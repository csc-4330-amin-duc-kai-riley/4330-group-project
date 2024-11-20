import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isSignup ? '/signup' : '/login';
      const response = await axios.post(`http://localhost:5001${endpoint}`, { email, password });

      // Save the token to localStorage and set the user in the state
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user); // This will make the app display the other components

    } catch (err) {
      console.error('Auth Error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>

      <button type="button" onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? 'Already have an account? Login' : 'New here? Sign Up'}
      </button>
    </form>
  );
};

export default Auth;

