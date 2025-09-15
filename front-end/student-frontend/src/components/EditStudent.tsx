import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EditStudent() {
    const navigate = useNavigate();
    const location = useLocation();

    const student = location.state?.student;

    const [error, setError] = useState(null);

    const [studentName, setStudentName] = useState("");
    const [studentSurname, setStudentSurname] = useState("");
    const [studentEmail, setStudentEmail] = useState("");
    const [studentPassword, setStudentPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        if (student) {
            setStudentName(student.studentName);
            setStudentSurname(student.studentSurname);
            setStudentEmail(student.studentEmail);
            setStudentPassword(student.studentPassword);
        }
    }, [student]);

    const handleUpdate = async () => {
        const updatedStudent = {
            studentEmail: studentEmail,
            studentName: studentName,
            studentSurname: studentSurname,
            studentPassword: studentPassword
        }

        try {
            await axios.put(`http://localhost:5000/api/student/${student.studentId}`, updatedStudent);
            alert("Student update success!");
            navigate("/student-management");
        } catch (err) {
            if(err.response.status === 409) {
                setError("Student with same email already exists");
                console.error("Student with same email already exists:", err);
            }
            else {
                setError("Error in updating student");
                console.error("Failed to update student:", err);
            }
        }
    }

    return(
        <div>
            <h2>Edit Student</h2>

            <br /><br />

            <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
            }}>
                <label>Student email:</label>
                <input type="email"
                        maxLength={50}
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        required/>
                
                <br /><br />

                <label>Student name:</label>
                <input type="text"
                        maxLength={50}
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required/>
                
                <br /><br />

                <label>Student surname:</label>
                <input type="text"
                        maxLength={50}
                        value={studentSurname}
                        onChange={(e) => setStudentSurname(e.target.value)}
                        required/>

                <br /><br />

                <label>Student password:</label>
                <input type="password"
                        maxLength={50}
                        onChange={(e) => setStudentPassword(e.target.value)}
                        required/>
                
                <br /><br />

                <label>Confirm password:</label>
                <input type="password"
                            maxLength={50}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required/>

                <br /><br />

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit">Update</button>
            </form>

            <br />

            <button type="button" onClick={() => {navigate("/student-management")}}>Back</button>
        </div>
    );
}

export default EditStudent;