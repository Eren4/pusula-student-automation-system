import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";

function TeacherManagement() {
    const navigate = useNavigate();

    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/teacher`);
                setTeachers(response.data);
            } catch (err) {
                setError("Failed to fetch teachers.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTeachers();
    }, []);

    const handleDeletion = async (teacherId) => {
        if(window.confirm("Are you sure you want to do the delete operation?")) {
            try {
            await axios.delete(`http://localhost:5000/api/teacher/${teacherId}`);
            // window.location.reload();
            setTeachers(prevTeachers => prevTeachers.filter(t => t.teacherId !== teacherId));
        } catch (error) {
            if(error.response.status === 409) {
                setError("Please delete the courses of that teacher first.");
            }
            console.error("Failed to delete teacher:", error);
        }
        }
    }

    if (loading) return <p>Loading grades...</p>;

    return(
        <div>
            <h2>Teacher Management</h2>

            <br/>

            {teachers.length === 0 ? (
                <p>There are no teachers currently.</p>
            ) : (
                <table border="1" cellPadding="8">
                    <thead>
                        <tr>
                            <th>Teacher ID</th>
                            <th>Teacher Name</th>
                            <th>Teacher Surname</th>
                            <th>Teacher Email</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((t, index) => (
                            <tr key={index}>
                                <td>{t.teacherId}</td>
                                <td>{t.teacherName}</td>
                                <td>{t.teacherSurname}</td>
                                <td>{t.teacherEmail}</td>
                                <td>
                                    <button type="button" onClick={() => {navigate("/edit-teacher", {state: { teacher: t }})}}>Edit</button>
                                </td>
                                <td>
                                    <button type="button" onClick={() => handleDeletion(t.teacherId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <br/>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <br/>

            <button type="button" onClick={() => navigate("/add-teacher")}>Add Teacher</button>

            <br/><br/>

            <button type="button" onClick={() => {navigate("/admin-dashboard")}}>Back</button>
        </div>
    )
}

export default TeacherManagement;