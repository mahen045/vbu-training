import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  // Fetch students from backend
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add a new student
  const addStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users', {
        name,
        email,
        age,
      });
      setStudents([...students, response.data]);
      setName('');
      setEmail('');
      setAge('');
    } catch (error) {
      console.error('Error adding student', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Student Management</h1>
      <form onSubmit={addStudent} className="mb-4">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div><br/>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div><br/>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div><br/>
        <button type="submit" className="btn btn-primary">Add Student</button>
      </form>
      <br/>
      <h2 className="text-center">Students List</h2>
      <ul className="list-group">
        {students.map((student) => (
          <li key={student.id} className="list-group-item">
            {student.name} - {student.email} - {student.age} years old
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
