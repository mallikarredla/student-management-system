// src/components/StudentList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:9091";

const StudentList = ({ token }) => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", course: "" });
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({ name: "", email: "", course: "" });

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE}/students`, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      setStudents(response.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add new student
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/students`, form, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      setForm({ name: "", email: "", course: "" });
      fetchStudents();
    } catch (err) {
      console.error("Error adding student:", err);
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`${API_BASE}/students/${id}`, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      fetchStudents();
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  // Start inline editing
  const startEditing = (student) => {
    setEditingId(student.id);
    setEditingData({ name: student.name, email: student.email, course: student.course });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
  };

  // Save inline update
  const saveEdit = async (id) => {
    try {
      const response = await axios.put(`${API_BASE}/students/${id}`, editingData, {
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
      });
      setStudents(students.map((s) => (s.id === id ? response.data : s)));
      setEditingId(null);
    } catch (err) {
      console.error("Error updating student:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Students</h2>

      {/* Add Student Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{ marginRight: 10 }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={{ marginRight: 10 }}
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
          required
          style={{ marginRight: 10 }}
        />
        <button type="submit">Add Student</button>
      </form>

      {/* Students Table */}
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No students found
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>
                  {editingId === student.id ? (
                    <input
                      type="text"
                      value={editingData.name}
                      onChange={(e) => setEditingData({ ...editingData, name: e.target.value })}
                    />
                  ) : (
                    student.name
                  )}
                </td>
                <td>
                  {editingId === student.id ? (
                    <input
                      type="email"
                      value={editingData.email}
                      onChange={(e) => setEditingData({ ...editingData, email: e.target.value })}
                    />
                  ) : (
                    student.email
                  )}
                </td>
                <td>
                  {editingId === student.id ? (
                    <input
                      type="text"
                      value={editingData.course}
                      onChange={(e) => setEditingData({ ...editingData, course: e.target.value })}
                    />
                  ) : (
                    student.course
                  )}
                </td>
                <td>
                  {editingId === student.id ? (
                    <>
                      <button onClick={() => saveEdit(student.id)}>Save</button>
                      <button onClick={cancelEditing} style={{ marginLeft: 5 }}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEditing(student)}>Edit</button>
                      <button onClick={() => handleDelete(student.id)} style={{ marginLeft: 5 }}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
