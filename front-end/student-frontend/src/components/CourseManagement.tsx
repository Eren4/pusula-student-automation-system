import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";

function CourseManagement() {
    const navigate = useNavigate();
    
    return(
        <div>
            <h2>Course Management</h2>

            <br/>

            <button type="button" onClick={() => {navigate("/admin-dashboard")}}>Back</button>
        </div>
    )
}

export default CourseManagement;