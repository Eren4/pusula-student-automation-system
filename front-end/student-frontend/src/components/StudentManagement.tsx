import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";

function StudentManagement() {
    const navigate = useNavigate();

    return(
        <div>
            <h2>Student Management</h2>

            <br/>

            <button type="button" onClick={() => {navigate("/admin-dashboard")}}>Back</button>
        </div>
    )
}

export default StudentManagement;