import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";

function CourseManagement() {
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/course`);
                setCourses(response.data);
            } catch (err) {
                setError("Failed to fetch courses.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleDeletion = async (courseId) => {
        if(window.confirm("Are you sure you want to do the delete operation?")) {
            try {
            await axios.delete(`http://localhost:5000/api/course/${courseId}`);
            setCourses(prevCourses => prevCourses.filter(c => c.courseId !== courseId));
        } catch (error) {
            console.error("Failed to delete course:", error);
        }
        }
    }

    if (loading) return <p>Loading grades...</p>;
    
    return(
        <div>
            <h2>Course Management</h2>

            <br/>

            {courses.length === 0 ? (
                <p>There are no courses currently.</p>
            ) : (
                <table border="1" cellPadding="8">
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th>Teacher</th>
                            <th>Course Ongoing</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((c, index) => (
                            <tr key={index}>
                                <td>{c.courseId}</td>
                                <td>{c.courseName}</td>
                                <td>{c.teacherName} {c.teacherSurname}</td>
                                <td>{String(c.courseOngoing) === "true" ? "Yes" : "No"}</td>
                                <td>
                                    <button type="button" onClick={() => {navigate("/edit-course", {state: { course: c }})}}>Edit</button>
                                </td>
                                <td>
                                    <button type="button" onClick={() => handleDeletion(c.courseId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <br/>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <br/>

            <button type="button" onClick={() => navigate("/add-course")}>Add Course</button>

            <br/><br/>

            <button type="button" onClick={() => {navigate("/admin-dashboard")}}>Back</button>
        </div>
    )
}

export default CourseManagement;