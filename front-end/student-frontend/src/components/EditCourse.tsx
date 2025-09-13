import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EditCourse() {
    const navigate = useNavigate();
    const location = useLocation();

    const course = location.state?.course;

    const [error, setError] = useState(null);

    return (
        <div>
            <h2>Edit Course</h2>

            <br />

            <button type="button" onClick={() => {navigate("/course-management")}}>Back</button>
        </div>
    );
}

export default EditCourse;