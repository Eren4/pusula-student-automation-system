import { useNavigate } from 'react-router-dom';

function StudentDashboard() {
  const navigate = useNavigate();
  const studentName = sessionStorage.getItem("name");
  const studentSurname = sessionStorage.getItem("surname");
  
  return(
    <div>
      <h2>Hello {studentName} {studentSurname}! Check out your courses and grades here.</h2>

      <button type="button" onClick={() => {navigate("/student-grade-list")}}>Check your grades</button>

      <br/><br/>

      <button type="button" onClick={() => {sessionStorage.clear(); navigate("/login")}}>Log Out</button>
    </div>
  );
}

export default StudentDashboard;