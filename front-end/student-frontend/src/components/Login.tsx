import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

            const registeredRole = response.data.role;
            sessionStorage.setItem("id", response.data.id);
            sessionStorage.setItem("email", response.data.email);
            sessionStorage.setItem("name", response.data.name);
            sessionStorage.setItem("surname", response.data.surname);
            
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
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div>
            <h2>Log In</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Log In</button>
                <div>
                    <br></br>
                    <label>Want to sign up?</label>
                    <button type="button" onClick={() => {sessionStorage.clear(); navigate("/register")}}>Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default Login;