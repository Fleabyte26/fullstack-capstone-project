import React, { useState } from 'react';
// Step 1 - Task 1
import { urlConfig } from '../../config';
// Step 1 - Task 2
import { useAppContext } from '../../context/AuthContext';
// Step 1 - Task 3
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Step 1 - Task 4
  const [showerr, setShowerr] = useState('');

  // Step 1 - Task 5
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();

  const handleRegister = async (e) => {
    e.preventDefault();
    setShowerr(''); // reset error at start

    try {
      const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
        method: 'POST', // Step 1 - Task 6
        headers: { 'Content-Type': 'application/json' }, // Step 1 - Task 7
        body: JSON.stringify({ firstName, lastName, email, password }), // Step 1 - Task 8
      });

      const json = await response.json(); // Step 2 - Task 1

      if (json.authtoken) {
        // Step 2 - Task 2
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('name', firstName);
        sessionStorage.setItem('email', json.email);

        // Step 2 - Task 3
        setIsLoggedIn(true);

        // Step 2 - Task 4
        navigate('/app');
      } else if (json.error) {
        // Step 2 - Task 5
        setShowerr(json.error);
      }
    } catch (e) {
      setShowerr('Network error. Please try again.');
      console.error('Error fetching details: ' + e.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="register-card p-4 border rounded">
            <h2 className="text-center mb-4 font-weight-bold">Register</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  className="form-control"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  className="form-control"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
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
                {/* Step 2 - Task 6: Display error */}
                {showerr && <div className="text-danger mt-1">{showerr}</div>}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-3">Register</button>
            </form>
            <p className="mt-4 text-center">
              Already a member? <a href="/app/login" className="text-primary">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
