import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard.tsx';
import StudentDashboard from './StudentDashboard.tsx';
import TeacherDashboard from './TeacherDashboard.tsx';

function Register() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [role, setRole] = useState('Student');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if(password !== passwordConfirm) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                 name,
                 surname,
                 email,
                 password,
                 role
            });

            const registeredRole = response.data.role || role;
            if (registeredRole === "Student") {
                navigate("/student-dashboard");
            } else if (registeredRole === "Teacher") {
                navigate("/teacher-dashboard");
            } else if (registeredRole === "Admin") {
                navigate("/admin-dashboard");
            }
        }
        catch (err) {
            console.error(err);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                {role !== "Admin" && (
                    <div>
                        <label>Surname:</label>
                        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                    </div>
                )}

                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <div>
                    <label>Confirm password:</label>
                    <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required />
                </div>

                <div>
                    <input type='radio' id='admin' name='role' value='Admin' checked={role === 'Admin'} onChange={(e) => setRole(e.target.value)} />
                    <label htmlFor='admin'>Admin</label>

                    <input type='radio' id='teacher' name='role' value='Teacher' checked={role === 'Teacher'} onChange={(e) => setRole(e.target.value)} />
                    <label htmlFor='teacher'>Teacher</label>

                    <input type='radio' id='student' name='role' value='Student' checked={role === 'Student'} onChange={(e) => setRole(e.target.value)} />
                    <label htmlFor='student'>Student</label>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit">Sign Up</button>

                <div>
                    <br></br>
                    <label>Already have an account?</label>
                    <button type="button" onClick={() => {sessionStorage.clear(); navigate("/login")}}>Log In</button>
                </div>
            </form>
        </div>
    );
}

export default Register;