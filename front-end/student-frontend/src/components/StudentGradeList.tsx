import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentGradeList() {
    const navigate = useNavigate();
    const studentId = sessionStorage.getItem("id");
    const studentName = sessionStorage.getItem("name");
    const studentSurname = sessionStorage.getItem("surname");

    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/student/${studentId}/grades`);
                setGrades(response.data);
            } catch (err) {
                setError("Failed to fetch grades.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchGrades();
    }, [studentId]);

    if (loading) return <p>Loading grades...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Course and grade list for {studentName} {studentSurname}</h2>

            <br/>

            {grades.length === 0 ? (
                <p>There are no grades for {studentName} {studentSurname} currently.</p>
            ) : (
                <table border="1" cellPadding="8">
                    <thead>
                        <tr>
                            <th>Course Id</th>
                            <th>Student Id</th>
                            <th>Grade</th>
                            <th>Absence</th>
                            <th>Comment</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <br/>

            <button type="button" onClick={() => {navigate("/student-dashboard")}}>Back</button>
        </div>
    );
}

export default StudentGradeList;
