import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function TeacherCourseList() {
    const navigate = useNavigate();
    const teacherId = sessionStorage.getItem("id");
    const teacherName = sessionStorage.getItem("name");
    const teacherSurname = sessionStorage.getItem("surname");

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updateMessage, setUpdateMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/teacher/${teacherId}/course`);
                setCourses(response.data);
            } catch (err) {
                setError("Failed to fetch courses.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [teacherId]);

    const handleUpdate = async () => {
        try {
            // Loop over each course and send a PUT request
            for (const course of courses) {
                await axios.put(`http://localhost:5000/api/course/${course.courseId}`, {
                    courseName: course.courseName,
                    teacherId: course.teacherId,
                    courseOngoing: course.courseOngoing
                });
            }
            const response = await axios.get(`http://localhost:5000/api/teacher/${teacherId}/course`);
            setCourses(response.data);
            setUpdateMessage("Course statuses updated successfully.");
        } catch (err) {
            console.error(err);
            alert("Failed to update courses.");
        }
    };

    const handleCheckboxChange = (index) => {
        const updatedCourses = [...courses];
        updatedCourses[index].courseOngoing = !updatedCourses[index].courseOngoing;
        setCourses(updatedCourses);
    };

    if (loading) return <p>Loading grades...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return(
        <div>
            <h2>Course list for {teacherName} {teacherSurname}</h2>

            <br/>

            {courses.length === 0 ? (
                <p>There are no courses for {teacherName} {teacherSurname} currently.</p>
                ) : (
                <table border="1" cellPadding="8">
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Is course ongoing?</th>
                            <th>Ongoing Checkbox</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((c, index) => (
                            <tr key={index}>
                                <td>{c.courseName}</td>
                                <td>{String(c.courseOngoing)}</td>
                                <td>
                                    <input type='checkbox'
                                        checked={c.courseOngoing}
                                        onChange={() => handleCheckboxChange(index)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {updateMessage && <p style={{ color: 'green' }}>{updateMessage}</p>}

            <br/>

            <button type="button" onClick={handleUpdate}>Update</button>

            <br/><br/>

            <button type="button" onClick={() => {navigate("/teacher-dashboard")}}>Back</button>
        </div>
    );
}

export default TeacherCourseList;