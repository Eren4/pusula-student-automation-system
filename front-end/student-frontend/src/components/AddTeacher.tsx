import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function AddTeacher() {
    const navigate = useNavigate();

    const [teacherName, setTeacherName] = useState("");
    const [teacherSurname, setTeacherSurname] = useState("");
    const [teacherEmail, setTeacherEmail] = useState("");
    const [teacherPassword, setTeacherPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState(null);

    const handleAdd = async () => {
        if(teacherPassword !== confirmPassword) {
            setError("Passwords should match.");
            return;
        }

        const newTeacher = {
            teacherEmail: teacherEmail,
            teacherName: teacherName,
            teacherSurname: teacherSurname,
            teacherPassword: teacherPassword
        };

        try {
            await axios.post("http://localhost:5000/api/teacher", newTeacher);
            alert("Successfully added teacher!");
            navigate("/teacher-management");
        } catch (err) {
            if(err.response.status === 409) {
                setError("Teacher with same email already exists");
                console.error("Teacher with same email already exists:", err);
            }
            else {
                setError("Error in updating teacher");
                console.error("Failed to update teacher:", err);
            }
        }
    }

    return(
        <div>
            <h2>Add Teacher</h2>

            <br /><br />

            <form onSubmit={(e) => {
                e.preventDefault();
                handleAdd();
            }}>
                <label>Teacher email:</label>
                <input type="email"
                        maxLength={50}
                        onChange={(e) => setTeacherEmail(e.target.value)}
                        required/>
                
                <br /><br />

                <label>Teacher name:</label>
                <input type="text"
                        maxLength={50}
                        onChange={(e) => setTeacherName(e.target.value)}
                        required/>
                
                <br /><br />

                <label>Teacher surname:</label>
                <input type="text"
                        maxLength={50}
                        onChange={(e) => setTeacherSurname(e.target.value)}
                        required/>

                <br /><br />

                <label>Teacher password:</label>
                <input type="password"
                        maxLength={50}
                        onChange={(e) => setTeacherPassword(e.target.value)}
                        required/>
                
                <br /><br />

                <label>Confirm password:</label>
                <input type="password"
                            maxLength={50}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required/>

                <br /><br />

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit">Add</button>
            </form>

            <br />

            <button type="button" onClick={() => {navigate("/teacher-management")}}>Back</button>
        </div>
    );
}

export default AddTeacher;