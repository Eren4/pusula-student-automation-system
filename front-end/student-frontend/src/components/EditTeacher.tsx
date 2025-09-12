import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EditTeacher() {
    const navigate = useNavigate();
    const location = useLocation();

    const teacher = location.state?.teacher;

    const [error, setError] = useState(null);

    const [teacherName, setTeacherName] = useState("");
    const [teacherSurname, setTeacherSurname] = useState("");
    const [teacherEmail, setTeacherEmail] = useState("");
    const [teacherPassword, setTeacherPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        if (teacher) {
            setTeacherName(teacher.teacherName);
            setTeacherSurname(teacher.teacherSurname);
            setTeacherEmail(teacher.teacherEmail);
            setTeacherPassword(teacher.teacherPassword);
        }
    }, [teacher]);

    const handleUpdate = async () => {
        const updatedTeacher = {
            teacherEmail: teacherEmail,
            teacherName: teacherName,
            teacherSurname: teacherSurname,
            teacherPassword: teacherPassword
        }

        try {
            await axios.put(`http://localhost:5000/api/teacher/${teacher.teacherId}`, updatedTeacher);
            alert("Teacher update success!");
            navigate("/teacher-management");
        } catch (err) {
            setError("Error in updating teacher");
            console.error("Failed to update teacher:", err);
        }
    }

    return(
        <div>
            <h2>Edit Teacher</h2>

            <br /><br />

            <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
            }}>
                <label>Teacher email:</label>
                <input type="email"
                        maxLength={50}
                        value={teacherEmail}
                        onChange={(e) => setTeacherEmail(e.target.value)}
                        required/>
                
                <br /><br />

                <label>Teacher name:</label>
                <input type="text"
                        maxLength={50}
                        value={teacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                        required/>
                
                <br /><br />

                <label>Teacher surname:</label>
                <input type="text"
                        maxLength={50}
                        value={teacherSurname}
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

                <button type="submit">Update</button>
            </form>

            <br />

            <button type="button" onClick={() => {navigate("/teacher-management")}}>Back</button>
        </div>
    );
}

export default EditTeacher;