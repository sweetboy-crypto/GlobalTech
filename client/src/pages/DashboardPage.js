import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DashboardPage = () => {
    const [packages, setPackages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { 'Authorization': `Bearer ${token}` } };
                const res = await axios.get('/api/packages', config);
                setPackages(res.data);
            } catch (err) {
                setMessage('Could not fetch packages.');
            }
        };
        fetchPackages();
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h1 style={{ color: '#FF6F00' }}>Dashboard</h1>
            <p>Welcome to your dashboard. Here you can manage your packages.</p>

            <Link to="/create-package">
                <button style={{ backgroundColor: '#FF6F00', color: '#FFFFFF', padding: '10px 20px', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>
                    Create New Package
                </button>
            </Link>

            <h2 style={{ color: '#000000' }}>Your Packages</h2>
            {message && <p style={{ color: 'red' }}>{message}</p>}
            {packages.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {packages.map(pkg => (
                        <li key={pkg._id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '5px' }}>
                            <Link to={`/track/${pkg.tracking_code}`} style={{ textDecoration: 'none', color: '#FF6F00', fontWeight: 'bold' }}>
                                {pkg.tracking_code}
                            </Link>
                            <p style={{ margin: '5px 0 0', color: '#333' }}>Status: {pkg.current_status}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have not created any packages yet.</p>
            )}
        </div>
    );
};

export default DashboardPage;
