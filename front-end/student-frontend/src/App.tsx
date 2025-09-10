import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

function Login() {
  return <h2>Login Page</h2>;
}

function Register() {
  return <h2>Register Page</h2>;
}

function AdminDashboard() {
  return <h2>Admin Dashboard</h2>;
}

function StudentDashboard() {
  return <h2>Student Dashboard</h2>;
}

function TeacherDashboard() {
  return <h2>Teacher Dashboard</h2>;
}

function App() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard"
        element={
          isAuthenticated ? (
            userRole === 'admin' ? <AdminDashboard /> :
            userRole === 'student' ? <StudentDashboard /> :
            userRole === 'teacher' ? <TeacherDashboard /> :
            <Navigate to="/login" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
