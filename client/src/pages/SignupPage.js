import React, { useState } from 'react';
import api from '../services/api';
import styles from './AuthForm.module.css';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        secret_key: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const { name, email, phone, password, secret_key } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await api.post('/users/register', formData);
            setMessage('Registration successful! Please check your email to verify your account.');
        } catch (err) {
            setError(err.response?.data?.msg || 'An error occurred');
        }
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.authCard}>
                <h1 className={styles.authTitle}>Sign Up</h1>
                {message && <p className={`${styles.message} ${styles.success}`}>{message}</p>}
                {error && <p className={`${styles.message} ${styles.error}`}>{error}</p>}
                <form onSubmit={onSubmit}>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={onChange}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            name="phone"
                            value={phone}
                            onChange={onChange}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="password"
                            placeholder="Your Account Password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            minLength="6"
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="password"
                            placeholder="Admin Creation Key (optional)"
                            name="secret_key"
                            value={secret_key}
                            onChange={onChange}
                            className={styles.input}
                        />
                    </div>
                    <button type="submit" className={styles.button}>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
