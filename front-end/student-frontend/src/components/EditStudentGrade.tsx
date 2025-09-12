import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EditStudentGrade() {
    const navigate = useNavigate();
    const location = useLocation();

    const grade = location.state?.grade;

    const [error, setError] = useState(null);

    const [studentGrade, setStudentGrade] = useState("");
    const [studentAbsence, setStudentAbsence] = useState("");
    const [studentComment, setStudentComment] = useState("");

    useEffect(() => {
        if (grade) {
        setStudentGrade(grade.studentGrade);
        setStudentAbsence(grade.studentAbsence);
        setStudentComment(grade.studentComment);
        }
    }, [grade]);

    const handleUpdate = async () => {
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

        const updatedGrade = {
            courseId: grade.courseId,
            studentId: grade.studentId,
            studentGrade: parseInt(studentGrade),
            studentAbsence: parseInt(studentAbsence) || 0,
            studentComment: studentComment || "",
        }

        try {
            await axios.put("http://localhost:5000/api/grade", updatedGrade);
            alert("Student update success!");
            navigate("/teacher-grading");
        } catch (err) {
            setError("Error in updating grade");
            console.error("Failed to update grade:", err);
        }
    }

    return(
        <div>
            <h2>Edit Student</h2>

            <br /><br />

            <label>
                Course name: {grade.courseName}
            </label>

            <br /><br />

            <label>
                Student full name: {grade.studentName} {grade.studentSurname}
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

            <button type="button" onClick={handleUpdate}>Update</button>

            <br /><br />

            <button type="button" onClick={() => {navigate("/teacher-grading")}}>Back</button>
        </div>
    );
}

export default EditStudentGrade;