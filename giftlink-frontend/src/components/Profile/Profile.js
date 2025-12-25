import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AuthContext';
import { urlConfig } from '../../config';

export default function Profile() {
  const { userName, setUserName } = useAppContext();
  const [editMode, setEditMode] = useState(false);
  const [nameInput, setNameInput] = useState(userName || '');
  const [changed, setChanged] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('auth-token');
    if (!token) {
      navigate('/app/login');
    }
  }, [navigate]);

  const handleSubmit = async () => {
    const authtoken = sessionStorage.getItem('auth-token');
    const email = sessionStorage.getItem('email');
    const payload = { name: nameInput };

    try {
      const response = await fetch(`${urlConfig.backendUrl}/api/auth/update`, {
        // Task 1: set method
        method: 'PUT',
        // Task 2: set headers
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          "Email": email,
        },
        // Task 3: set body
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const updatedDetails = await response.json();
        // Task 4: set the new name in AppContext
        setUserName(nameInput);
        // Task 5: set user name in session
        sessionStorage.setItem("name", nameInput);
        setChanged("Name Changed Successfully!");
        setEditMode(false);
        setTimeout(() => setChanged(""), 1000);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (e) {
      console.log("Error updating details: " + e.message);
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div>
        <label>Name:</label>
        {editMode ? (
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        ) : (
          <span>{userName}</span>
        )}
      </div>
      <div>
        <label>Email:</label>
        <span>{sessionStorage.getItem('email')}</span>
      </div>
      {changed && <div style={{ color: 'green' }}>{changed}</div>}
      <div>
        {editMode ? (
          <button onClick={handleSubmit}>Save</button>
        ) : (
          <button onClick={() => setEditMode(true)}>Edit</button>
        )}
      </div>
    </div>
  );
}
