// Task 1: Import urlConfig from `giftlink-frontend/src/config.js`
import { urlConfig } from '../../config';

// Task 2: Import useAppContext `giftlink-frontend/context/AuthContext.js`
import { useAppContext } from '../../context/AuthContext';

// Task 3: Import useNavigate from `react-router-dom` to handle navigation after successful registration.
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

export default function RegisterPage() {
  // useState for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Task 4: Include a state for error message
  const [showerr, setShowerr] = useState('');

  // Task 5: Create a local variable for `navigate` and `setIsLoggedIn`
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();

  const handleRegister = async (e) => {
    e.preventDefault();
    setShowerr(''); // reset error

    try {
      // Step 1: API call to backend
      const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
        method: 'POST', // Task 6: POST method
        headers: {      // Task 7: headers
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ // Task 8: body with user details
          firstName,
          lastName,
          email,
          password,
        }),
      });

      // Task 1 (Step 2): Access JSON data from backend
      const json = await response.json();

      if (response.ok && json.authtoken) {
        // Task 2: Set user details in session storage
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('name', firstName);
        sessionStorage.setItem('email', json.email);

        // Task 3: Set the state of user to logged in
        setIsLoggedIn(true);

        // Task 4: Navigate to MainPage after login
        navigate('/app');
      } else {
        // Task 5: Set error message if registration fails
        setShowerr(json.error || 'Registration failed. Please try again.');
      }
    } catch (e) {
      // Task 6: Display error message to end user
      setShowerr('Network error. Please try again.');
      console.error('Error fetching details: ' + e.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* Task 6: Display error message */}
      {showerr && <div className="text-danger">{showerr}</div>}
      <button type="submit">Register</button>
    </form>
  );
}
