import React, { useState } from 'react';
import api from '../services/api';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        secret_key: '',
    });
    const [message, setMessage] = useState('');

    const { name, email, phone, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await api.post('/users/register', formData);
            setMessage('Registration successful! Please check your email to verify your account.');
        } catch (err) {
            setMessage(err.response.data.msg || 'An error occurred');
        }
    };

    return (
        <div style={{ backgroundColor: '#FFFFFF', color: '#000000', padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h1 style={{ color: '#FF6F00' }}>Sign Up</h1>
            {message && <p>{message}</p>}
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                        style={{ margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }}
                    />
                </div>
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
                        type="text"
                        placeholder="Phone Number"
                        name="phone"
                        value={phone}
                        onChange={onChange}
                        required
                        style={{ margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Your Account Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        minLength="6"
                        required
                        style={{ margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Admin Creation Key (optional)"
                        name="secret_key"
                        value={formData.secret_key}
                        onChange={onChange}
                        style={{ margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }}
                    />
                </div>
                <input type="submit" value="Sign Up" style={{ backgroundColor: '#FF6F00', color: '#FFFFFF', padding: '10px 20px', border: 'none', cursor: 'pointer', width: '100%' }} />
            </form>
        </div>
    );
};

export default SignupPage;
