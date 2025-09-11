import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function TeacherGrading() {
    const navigate = useNavigate();
    const teacherId = sessionStorage.getItem("id");
    const teacherName = sessionStorage.getItem("name");
    const teacherSurname = sessionStorage.getItem("surname");

    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/teacher/${teacherId}/courses/grades`);
                setGrades(response.data);
            } catch (err) {
                setError("Failed to fetch grades.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchGrades();
    }, [teacherId]);

    const handleDeletion = async (studentId, courseId) => {
        try {
            await axios.delete(`http://localhost:5000/api/grade/student/${studentId}/course/${courseId}`);
            window.location.reload();
            /*
            setGrades(prevGrades => prevGrades.filter(grade => grade.studentId !== studentId &&
                grade.courseId !== courseId
            ));
            */
        } catch (error) {
            console.error("Failed to delete grade:", error);
        }
    }

    if (loading) return <p>Loading grades...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return(
        <div>
            <h2>The students of {teacherName} {teacherSurname}</h2>

            {grades.length === 0 ? (
                <p>There are no available grades for {teacherName} {teacherSurname} currently.</p>
                ) : (
                <table border="1" cellPadding="8">
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Student ID</th>
                            <th>Student Grade</th>
                            <th>Student Absence</th>
                            <th>Student Comment</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map((g, index) => (
                            <tr key={index}>
                                <td>{g.courseId}</td>
                                <td>{g.studentId}</td>
                                <td>{g.studentGrade}</td>
                                <td>{g.studentAbsence}</td>
                                <td>{g.studentComment}</td>
                                <td>
                                    <button type="button" onClick={() => {}}>Edit</button>
                                </td>
                                <td>
                                    <button type="button" onClick={() => handleDeletion(g.studentId, g.courseId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <br/><br/>

            <button type="button" onClick={() => {navigate("/add-student-grade")}}>Add Student</button>

            <br/><br/>

            <button type="button" onClick={() => {navigate("/teacher-dashboard")}}>Back</button>
        </div>
    )
}

export default TeacherGrading;