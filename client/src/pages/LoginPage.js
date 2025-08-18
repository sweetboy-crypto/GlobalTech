import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setMessage(err.response?.data?.msg || 'An error occurred');
        }
    };

    return (
        <div style={{ backgroundColor: '#FFFFFF', color: '#000000', padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h1 style={{ color: '#FF6F00' }}>Login</h1>
            {message && <p>{message}</p>}
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                        style={{ margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        minLength="6"
                        required
                        style={{ margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }}
                    />
                </div>
                <input type="submit" value="Login" style={{ backgroundColor: '#FF6F00', color: '#FFFFFF', padding: '10px 20px', border: 'none', cursor: 'pointer', width: '100%' }} />
            </form>
        </div>
    );
};

export default LoginPage;
