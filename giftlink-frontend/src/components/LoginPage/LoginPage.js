// Task 1: Import urlConfig from giftlink-frontend/src/config.js
import { urlConfig } from '../../config';
// Task 2: Import useAppContext giftlink-frontend/context/AuthContext.js
import { useAppContext } from '../../context/AuthContext';
// Task 3: Import useNavigate from react-router-dom to handle navigation after successful login
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './LoginPage.css';

export default function LoginPage() {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Task 4: State for incorrect password / login error
  const [incorrect, setIncorrect] = useState('');

  // Task 5: Local variables for navigate, bearerToken, setIsLoggedIn
  const navigate = useNavigate();
  const bearerToken = sessionStorage.getItem('auth-token');
  const { setIsLoggedIn } = useAppContext();

  // Task 6: Redirect to MainPage if already logged in
  useEffect(() => {
    if (bearerToken) {
      navigate('/app');
    }
  }, [bearerToken, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIncorrect(''); // reset error

    try {
      const response = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
        // Task 7: POST method
        method: 'POST',
        // Task 8: Headers
        headers: {
          'Content-Type': 'application/json',
          'Authorization': bearerToken ? `Bearer ${bearerToken}` : '',
        },
        // Task 9: Body
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (json.authtoken) {
        // Step 2: Set user details in sessionStorage
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('name', json.userName);
        sessionStorage.setItem('email', json.userEmail);

        // Step 3: Set user state to logged in
        setIsLoggedIn(true);

        // Step 4: Navigate to MainPage
        navigate('/app');
      } else {
        // Step 5: Clear inputs and show error message
        setEmail('');
        setPassword('');
        setIncorrect(json.error || 'Wrong password. Try again.');

        // Clear error message after 2 seconds
        setTimeout(() => setIncorrect(''), 2000);
      }
    } catch (e) {
      console.error('Error fetching login:', e.message);
      setIncorrect('Network error. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="login-card p-4 border rounded">
            <h2 className="text-center mb-4 font-weight-bold">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  required
                />
              </div>
              {/* Step 6: Display error message */}
              {incorrect && (
                <span style={{
                  color:'red',
                  height:'.5cm',
                  display:'block',
                  fontStyle:'italic',
                  fontSize:'12px'
                }}>
                  {incorrect}
                </span>
              )}
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <p className="mt-4 text-center">
              Don't have an account? <a href="/app/register" className="text-primary">Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
