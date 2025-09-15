import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function AddStudent() {
    const navigate = useNavigate();

    const [studentName, setStudentName] = useState("");
    const [studentSurname, setStudentSurname] = useState("");
    const [studentEmail, setStudentEmail] = useState("");
    const [studentPassword, setStudentPassword] = useState("");
    const [studentConfirmPassword, setStudentConfirmPassword] = useState("");

    const [error, setError] = useState("");

    const handleAdd = async () => {
        if(studentPassword !== studentConfirmPassword) {
            setError("Passwords should match.");
            return;
        }

        const newStudent = {
            studentName: studentName,
            studentSurname: studentSurname,
            studentEmail: studentEmail,
            studentPassword: studentPassword
        };

        try {
            await axios.post("http://localhost:5000/api/student", newStudent);
            alert("Successfully added student!");
            navigate("/student-management");
        } catch (err) {
            if(err.response.status === 409) {
                setError("Student with same email already exists");
                console.error("Student with same email already exists:", err);
            }
            else {
                setError("Error in adding student");
                console.error("Failed to add student:", err);
            }
        }
    }

    return(
        <div>
            <h2>Add Student</h2>

            <br /><br />

            <form onSubmit={(e) => {
                e.preventDefault();
                handleAdd();
            }}>
                <label>Student email:</label>
                <input type="text"
                        maxLength={50}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        required/>

                <br /><br />

                <label>Student name:</label>
                <input type="text"
                        maxLength={50}
                        onChange={(e) => setStudentName(e.target.value)}
                        required/>

                <br /><br />

                <label>Student surname:</label>
                <input type="text"
                        maxLength={50}
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
                        onChange={(e) => setStudentConfirmPassword(e.target.value)}
                        required/>
                
                <br /><br />

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit">Add</button>
            </form>

            <br />

            <button type="button" onClick={() => {navigate("/student-management")}}>Back</button>
        </div>
    );
}

export default AddStudent;