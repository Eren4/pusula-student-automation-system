import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TeacherDashboard() {
  const navigate = useNavigate();
  const teacherName = sessionStorage.getItem("name");
  const teacherSurname = sessionStorage.getItem("surname");

  return(
    <div>
      <h2>Welcome, {teacherName} {teacherSurname}! Manage your courses and grades.</h2>

      <button type="button" onClick={() => {navigate("/teacher-course-list")}}>Manage your courses</button>

      <br/><br/>

      <button type="button" onClick={() => {navigate("/teacher-grading")}}>Grade your students</button>

      <br/><br/>

      <button type="button" onClick={() => {sessionStorage.clear(); navigate("/login")}}>Log Out</button>
    </div>
  );
}

export default TeacherDashboard;