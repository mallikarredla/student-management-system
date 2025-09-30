
// src/App.js
import React, { useState, useEffect } from 'react';
import Login from './Login';
import StudentList from './StudentList';

function App() {
  // Initialize token from localStorage key 'jwtToken'
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));

  // Keep token in sync with localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('jwtToken', token);
    } else {
      localStorage.removeItem('jwtToken');
    }
  }, [token]);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="App">
      <StudentList token={token} setToken={setToken} />
    </div>
  );
}

export default App;
