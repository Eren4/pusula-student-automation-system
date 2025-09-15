import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";

function StudentManagement() {
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/student`);
                setStudents(response.data);
            } catch (err) {
                setError("Failed to fetch students.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleDeletion = async (studentId) => {
        if(window.confirm("Are you sure you want to do the delete operation?")) {
            try {
            await axios.delete(`http://localhost:5000/api/student/${studentId}`);
            setStudents(prevStudents => prevStudents.filter(s => s.studentId !== studentId));
        } catch (error) {
            console.error("Failed to delete teacher:", error);
        }
        }
    }

    if (loading) return <p>Loading grades...</p>;

    return(
        <div>
            <h2>Student Management</h2>

            <br/>

            {students.length === 0 ? (
                <p>There are no students currently.</p>
            ) : (
                <table border="1" cellPadding="8">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Student Surname</th>
                            <th>Student Email</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s, index) => (
                            <tr key={index}>
                                <td>{s.studentId}</td>
                                <td>{s.studentName}</td>
                                <td>{s.studentName}</td>
                                <td>{s.studentEmail}</td>
                                <td>
                                    <button type="button" onClick={() => {navigate("/edit-student", {state: { student: s }})}}>Edit</button>
                                </td>
                                <td>
                                    <button type="button" onClick={() => handleDeletion(s.studentId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <br/>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <br/>

            <button type="button" onClick={() => navigate("/add-student")}>Add Student</button>

            <br/><br/>

            <br/>

            <button type="button" onClick={() => {navigate("/admin-dashboard")}}>Back</button>
        </div>
    )
}

export default StudentManagement;