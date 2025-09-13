import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EditCourse() {
    const navigate = useNavigate();
    const location = useLocation();

    const course = location.state?.course;

    const [teachers, setTeachers] = useState([]);
    const [courseName, setCourseName] = useState("");
    const [courseOngoing, setCourseOngoing] = useState(true);

    const[selectedTeacherId, setSelectedTeacherId] = useState();

    const [error, setError] = useState(null);

    useEffect(() => {
        if (course) {
            setCourseName(course.courseName);
            setCourseOngoing(course.courseOngoing);
            setSelectedTeacherId(course.teacherId);
        }
    }, [course]);

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

    const handleUpdate = async () => {
        const updatedCourse = {
            courseName: courseName,
            teacherId: selectedTeacherId,
            courseOngoing: courseOngoing
        }

        try {
            await axios.put(`http://localhost:5000/api/course/${course.courseId}`, updatedCourse);
            alert("Course update success!");
            navigate("/course-management");
        } catch (err) {
            setError("Error in updating course");
            console.error("Failed to update course:", err);
        }
    }

    return(
        <div>
            <h2>Edit Course</h2>

            <br /><br />

            <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
            }}>
                <label>Course name:</label>
                <input type="text"
                        value={courseName}
                        maxLength={50}
                        size={35}
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

                <button type="submit">Update</button>
            </form>

            <br />

            <button type="button" onClick={() => {navigate("/course-management")}}>Back</button>
        </div>
    );
}

export default EditCourse;