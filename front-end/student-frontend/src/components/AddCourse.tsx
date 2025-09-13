import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function AddCourse() {
    const navigate = useNavigate();

    const [teachers, setTeachers] = useState([]);
    const [courseName, setCourseName] = useState("");
    const [courseOngoing, setCourseOngoing] = useState(true);

    const[selectedTeacherId, setSelectedTeacherId] = useState();

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/teacher`);
                setTeachers(response.data);
            } catch (err) {
                setError("Failed to fetch teachers.");
                console.error(err);
            }
        };

        fetchTeachers();
    }, []);

    const handleAdd = async () => {
        const newCourse = {
            courseName: courseName,
            teacherId: selectedTeacherId,
            courseOngoing: courseOngoing
        };

        try {
            await axios.post("http://localhost:5000/api/course", newCourse);
            alert("Successfully added course!");
            navigate("/course-management");
        } catch (err) {
            setError("Error in adding course");
            console.error("Failed to add course:", err);
        }
    }

    return(
        <div>
            <h2>Add Course</h2>

            <br /><br />

            <form onSubmit={(e) => {
                e.preventDefault();
                handleAdd();
            }}>
                <label>Course name:</label>
                <input type="text"
                        maxLength={50}
                        onChange={(e) => setCourseName(e.target.value)}
                        required/>
                
                <br /><br />

                <label>
                    Teacher:{" "}
                    <select
                        value={selectedTeacherId}
                        onChange={(e) => setSelectedTeacherId(e.target.value)}
                    >
                        <option value="">-- Select a teacher --</option>
                        {teachers.map((teacher) => (
                            <option key={teacher.teacherId} value={teacher.teacherId}>
                                {teacher.teacherName} {teacher.teacherSurname}
                            </option>
                        ))}
                    </select>
                </label>
                
                <br /><br />

                <label>Will the course start right away?</label>
                <select
                    value={courseOngoing ? "Yes" : "No"}
                    onChange={(e) => setCourseOngoing(e.target.value === "Yes" ? true : false)}>
                        <option>Yes</option>
                        <option>No</option>
                </select>

                <br /><br />

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit">Add</button>
            </form>

            <br />

            <button type="button" onClick={() => {navigate("/course-management")}}>Back</button>
        </div>
    );
}

export default AddCourse;