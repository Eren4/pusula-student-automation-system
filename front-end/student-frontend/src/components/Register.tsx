import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={console.log("Hello")}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div>
                    <label>Surname:</label>
                    <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                </div>

                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <div>
                    <label>Confirm password:</label>
                    <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required />
                </div>

                <div>
                    <input type='radio' id='student' name='role' value='Student' defaultChecked />
                    <label htmlFor='student'>Student</label>

                    <input type='radio' id='teacher' name='role' value='Teacher' />
                    <label htmlFor='teacher'>Teacher</label>
                    
                    <input type='radio' id='admin' name='role' value='Admin' />
                    <label htmlFor='admin'>Admin</label>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit">Sign Up</button>

                <div>
                    <br></br>
                    <label>Already have an account?</label>
                    <button type="button" onClick={() => navigate("/login")}>Log In</button>
                </div>
            </form>
        </div>
    );
}

export default Register;