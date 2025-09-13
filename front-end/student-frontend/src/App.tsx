import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import StudentDashboard from './components/StudentDashboard.tsx';
import TeacherDashboard from './components/TeacherDashboard.tsx';
import StudentGradeList from './components/StudentGradeList.tsx';
import TeacherCourseList from './components/TeacherCourseList.tsx';
import TeacherGrading from './components/TeacherGrading.tsx';
import AddStudentGrade from './components/AddStudentGrade.tsx';
import EditStudentGrade from './components/EditStudentGrade.tsx';
import TeacherManagement from './components/TeacherManagement.tsx';
import AddTeacher from './components/AddTeacher.tsx';
import EditTeacher from './components/EditTeacher.tsx';
import StudentManagement from './components/StudentManagement.tsx';
import CourseManagement from './components/CourseManagement.tsx';
import AddCourse from './components/AddCourse.tsx';
import EditCourse from './components/EditCourse.tsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-dashboard" element={<StudentDashboard />}/>
        <Route path="/teacher-dashboard" element={<TeacherDashboard />}/>
        <Route path="/admin-dashboard" element={<AdminDashboard />}/>
        <Route path="/student-grade-list" element={<StudentGradeList />}/>
        <Route path="/teacher-course-list" element={<TeacherCourseList />}/>
        <Route path="/teacher-grading" element={<TeacherGrading />}/>
        <Route path="/add-student-grade" element={<AddStudentGrade />}/>
        <Route path="/edit-student-grade" element={<EditStudentGrade />}/>
        <Route path="/teacher-management" element={<TeacherManagement />}/>
        <Route path="/add-teacher" element={<AddTeacher />}/>
        <Route path="/edit-teacher" element={<EditTeacher />}/>
        <Route path="/student-management" element={<StudentManagement />}/>
        <Route path="/course-management" element={<CourseManagement />}/>
        <Route path="/add-course" element={<AddCourse />}/>
        <Route path="/edit-course" element={<EditCourse />}/>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
