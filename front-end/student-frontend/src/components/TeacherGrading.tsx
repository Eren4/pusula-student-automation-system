import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function TeacherGrading() {
    const navigate = useNavigate();
    const teacherId = sessionStorage.getItem("id");
    const teacherName = sessionStorage.getItem("name");
    const teacherSurname = sessionStorage.getItem("surname");

    return(
        <div>
            <h2>The students of {teacherName} {teacherSurname}</h2>

            <br/><br/>

            <button type="button" onClick={() => {navigate("/teacher-dashboard")}}>Back</button>
        </div>
    )
}

export default TeacherGrading;