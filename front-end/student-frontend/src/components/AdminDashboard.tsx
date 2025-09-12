import { useNavigate } from 'react-router-dom';

function AdminDashboard() {

  const navigate = useNavigate();
  const adminName = sessionStorage.getItem("name");

  return(
    <div>
      <h2>Welcome, {adminName}! Manage students, courses and teachers.</h2>

      <br/><br/>

      <button type="button" onClick={() => {navigate("/student-management")}}>Student Management</button>

      <br/><br/>

      <button type="button" onClick={() => {navigate("/course-management")}}>Course Management</button>

      <br/><br/>

      <button type="button" onClick={() => {navigate("/teacher-management")}}>Teacher Management</button>

      <br/><br/>

      <button type="button" onClick={() => {sessionStorage.clear(); navigate("/login")}}>Log Out</button>
    </div>
  ); 
}

export default AdminDashboard;