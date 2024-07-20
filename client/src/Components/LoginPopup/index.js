import React, { useState } from 'react';
import { X } from 'lucide-react';
import Cookies from 'js-cookie';
import './index.css';
import Loader from '../Loader'

const LoginPopup = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State for managing loader visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true)
    console.log({ email, password });

    try {
      const url = "https://sri-mandir-app-clone.onrender.com/login";

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log(data.token, "data");
      Cookies.set('jwt_token', data.token, { expires: 7 }); // Store token for 7 days
      onLoginSuccess();
      onClose();
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleOnClickRegister = async() => {
    setLoading(true)
    console.log({email, password})

    try {
      const url = "https://sri-mandir-app-clone.onrender.com/register";

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log(data.token, "data");
      Cookies.set('jwt_token', data.token, { expires: 7 }); // Store token for 7 days
      onLoginSuccess();
      onClose();
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false); // Hide loader
    }
  }

  return (
    <div className="login-popup-overlay">
      {loading && <Loader />} {/* Show loader if loading */}
      <div className="login-popup">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        <h2>Login</h2>
        <p>email: gnani@gmail.com</p>
        <p>password: 1234</p>
        <p>Initial request to server will take 1 min to complete</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">Log In</button>
          <button type="button" onClick={handleOnClickRegister} className="login-button" style={{marginTop: "5px" }}>Register</button>
          
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
