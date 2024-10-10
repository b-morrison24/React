import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/authService'; // API call
import useAuth from '../../hooks/useAuth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {loginUser} = useAuth();
    const nav = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const userData = await login({ email, password });
            if (userData) {
                loginUser(userData)
                localStorage.setItem('authToken', userData.token);
                console.log('Logged in:', userData);
                // Redirect to products page
                nav('/dashboard');
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
                <Link to={'/signup'}>Register</Link>
            </form>
        </>
    );
}
