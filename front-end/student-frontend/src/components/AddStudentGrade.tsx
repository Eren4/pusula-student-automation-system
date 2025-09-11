import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddStudentGrade() {
    const navigate = useNavigate();

    return(
        <div>
            <h2>Student addition</h2>

            <br/><br/>

            <button type="button" onClick={() => {}}>Add</button>

            <br/><br/>

            <button type="button" onClick={() => {navigate("/teacher-grading")}}>Back</button>
        </div>
    )
}

export default AddStudentGrade;