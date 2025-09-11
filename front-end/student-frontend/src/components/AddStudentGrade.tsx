import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function AddStudentGrade() {
    const navigate = useNavigate();

    const teacherId = sessionStorage.getItem("id");

    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);

    const [error, setError] = useState(null);

    const [selectedCourseId, setSelectedCourseId] = useState("");
    const [selectedStudentId, setSelectedStudentId] = useState("");
    const [studentGrade, setStudentGrade] = useState("");
    const [studentAbsence, setStudentAbsence] = useState("");
    const [studentComment, setStudentComment] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/teacher/${teacherId}/course`);
                setCourses(response.data);
            } catch (err) {
                setError("Failed to fetch courses.");
                console.error(err);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/student`);
                setStudents(response.data);
            } catch (err) {
                setError("Failed to fetch students.");
                console.error(err);
            }
        };

        fetchStudents();
    }, []);

    const handleAdd = async () => {
        if (!selectedCourseId || !selectedStudentId) {
            alert("Please fill all required fields.");
            return;
        }

        if(studentGrade > 100 || studentGrade < 0) {
            alert("Please enter a grade between 0 and 100.");
            return;
        }

        if(studentAbsence > 14 || studentAbsence < 0) {
            alert("Please enter a valid absence.");
            return;
        }

        if(studentComment.length > 50) {
            alert("Please enter a simple comment");
            return;
        }

        const newGrade = {
            courseId: parseInt(selectedCourseId),
            studentId: parseInt(selectedStudentId),
            studentGrade: parseInt(studentGrade),
            studentAbsence: parseInt(studentAbsence) || 0,
            studentComment: studentComment || "",
        };

        try {
            await axios.post("http://localhost:5000/api/grade", newGrade);
            alert("Student addition success!");
            navigate("/teacher-grading");
        } catch (err) {
            setError("Error in adding grade");
            console.error("Failed to add grade:", err);
        }
    }

    return(
        <div>
            <h2>Student Creation</h2>

            <br /><br />

            <label>
                To which course do you want to add the student?{" "}
                <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                >
                    <option value="">-- Select a course --</option>
                    {courses.map((course) => (
                        <option key={course.courseId} value={course.courseId}>
                            {course.courseName}
                        </option>
                    ))}
                </select>
            </label>

            <br /><br />

            <label>
                Which student?{" "}
                <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                >
                    <option value="">-- Select a student --</option>
                    {students.map((student) => (
                        <option key={student.studentId} value={student.studentId}>
                            {student.studentName} {student.studentSurname}
                        </option>
                    ))}
                </select>
            </label>

            <br /><br />

            <label>
                Student grade:
                <input type='number'
                        placeholder='0-100'
                        max="100"
                        value={studentGrade}
                        onChange={(e) => setStudentGrade(e.target.value)}/>
            </label>

            <br /><br />

            <label>
                Student absence:
                <input type='number'
                        placeholder='0-14'
                        max="14"
                        value={studentAbsence}
                        onChange={(e) => setStudentAbsence(e.target.value)}/>
            </label>

            <br /><br />

            <label>
                Student comment:
                <input type='text'
                        value={studentComment}
                        onChange={(e) => setStudentComment(e.target.value)}/>
            </label>

            <br /><br />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <br /><br />

            <button type="button" onClick={handleAdd}>Add</button>

            <br /><br />

            <button type="button" onClick={() => {navigate("/teacher-grading")}}>Back</button>
        </div>
    )
}

export default AddStudentGrade;