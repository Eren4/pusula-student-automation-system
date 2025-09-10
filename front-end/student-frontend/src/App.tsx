import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import StudentDashboard from './components/StudentDashboard.tsx';
import TeacherDashboard from './components/TeacherDashboard.tsx';
import './App.css';

function App() {
  const userRole = localStorage.getItem('userRole');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            userRole === 'Admin' ? <AdminDashboard /> :
            userRole === 'Student' ? <StudentDashboard /> :
            userRole === 'Teacher' ? <TeacherDashboard /> :
            <Navigate to="/login" />
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
