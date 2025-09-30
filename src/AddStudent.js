import React, { useState } from 'react';
import axios from 'axios';

const AddStudent = ({ token, onStudentAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:9091/students', // change to your actual backend endpoint
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setName('');
      setEmail('');
      setError('');
      onStudentAdded(response.data); // Notify parent to update list or UI
    } catch (err) {
      console.error(err);
      setError('Failed to add student.');
    }
  };

  return (
    <form onSubmit={handleAddStudent}>
      <h3>Add Student</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <br />
      <button type="submit">Add Student</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default AddStudent;
