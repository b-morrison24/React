import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService'; // API call

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const userData = await register({ name, email, password });
            console.log('Registered:', userData);
            // Redirect or handle successful signup
            nav('/login');
        } catch (error) {
            console.error('Signup failed', error);
        }
    };

    return (
        <>
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Signup</button>
        </form>
        </>
    );
}
