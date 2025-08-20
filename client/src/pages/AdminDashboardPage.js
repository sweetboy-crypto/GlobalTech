import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AdminDashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/admin/dashboard/stats');
                setStats(res.data);
            } catch (err) {
                setMessage('Could not fetch admin stats.');
            }
        };
        fetchStats();
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
            <h1 style={{ color: '#FF6F00' }}>Admin Dashboard</h1>
            {message && <p style={{ color: 'red' }}>{message}</p>}
            {stats ? (
                <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                    <div style={{ backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '5px' }}>
                        <h2 style={{ color: '#000000' }}>Total Users</h2>
                        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalUsers}</p>
                    </div>
                    <div style={{ backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '5px' }}>
                        <h2 style={{ color: '#000000' }}>Total Payments (NGN)</h2>
                        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalPayments.toLocaleString()}</p>
                    </div>
                    <div style={{ backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '5px' }}>
                        <h2 style={{ color: '#000000' }}>Total Packages</h2>
                        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalPackages}</p>
                    </div>
                </div>
            ) : (
                <p>Loading stats...</p>
            )}
        </div>
    );
};

export default AdminDashboardPage;
