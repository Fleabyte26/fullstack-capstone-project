// giftlink-frontend/src/pages/LoginPage.js
import React, { useState, useEffect } from 'react';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [incorrect, setIncorrect] = useState('');

  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();
  const bearerToken = sessionStorage.getItem('auth-token');

  useEffect(() => {
    if (bearerToken) {
      navigate('/app');
    }
  }, [bearerToken, navigate]);

  const handleLogin = async () => {
    try {
      const res = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': bearerToken ? `Bearer ${bearerToken}` : '',
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('name', json.userName);
        sessionStorage.setItem('email', json.userEmail);

        setIsLoggedIn(true);
        navigate('/app');
      } else {
        setEmail('');
        setPassword('');
        setIncorrect(json.error || 'Login failed.');
        setTimeout(() => setIncorrect(''), 3000);
      }
    } catch (err) {
      console.error('Login error:', err);
      setIncorrect('Internal error. Try again.');
      setTimeout(() => setIncorrect(''), 3000);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="login-card p-4 border rounded">
            <h2 className="text-center mb-4 font-weight-bold">Login</h2>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span style={{
                color: 'red',
                height: '.5cm',
                display: 'block',
                fontStyle: 'italic',
                fontSize: '12px'
              }}>
                {incorrect}
              </span>
            </div>

            <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
              Login
            </button>

            <p className="mt-4 text-center">
              Not a member? <a href="/app/register" className="text-primary">Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
