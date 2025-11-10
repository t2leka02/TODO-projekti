
import { useState } from 'react';
import { useUser } from '../context/useUser';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(email, password);
            alert('Registration successful! You are now logged in.');
            navigate('/'); 
        } catch (error) {
            alert('Registration failed. Email might be in use.');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a onClick={() => navigate('/login')}>Login here</a></p>
        </div>
    );
}