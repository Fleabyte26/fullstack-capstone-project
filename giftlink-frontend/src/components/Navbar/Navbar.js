import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AuthContext';
import { urlConfig } from '../../config';

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, userName, setUserName } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation(); // To highlight active link

  // Sync session storage with context on load
  useEffect(() => {
    const authTokenFromSession = sessionStorage.getItem('auth-token');
    const nameFromSession = sessionStorage.getItem('name');

    if (authTokenFromSession) {
      setIsLoggedIn(true);
      if (nameFromSession) setUserName(nameFromSession);
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, [setIsLoggedIn, setUserName]);

  const handleLogout = () => {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('email');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/app');
  };

  const profileSection = () => {
    navigate('/app/profile');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">{/* Keep branding link */}
        GiftLink
      </Link>

      <button 
        className="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarNav"
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {/* Home link */}
          <li className="nav-item">
            <Link 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
              to="/"
            >
              Home
            </Link>
          </li>

          {/* Gifts link */}
          <li className="nav-item">
            <Link 
              className={`nav-link ${location.pathname.startsWith('/gifts') ? 'active' : ''}`} 
              to="/gifts"
            >
              Gifts
            </Link>
          </li>

          {/* Conditional auth links */}
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <span 
                  className="nav-link" 
                  style={{ color: 'white', cursor: 'pointer' }} 
                  onClick={profileSection}
                >
                  Welcome, {userName}
                </span>
              </li>
              <li className="nav-item">
                <button className="nav-link login-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/app/login' ? 'active' : ''}`} 
                  to="/app/login"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === '/app/register' ? 'active' : ''}`} 
                  to="/app/register"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
