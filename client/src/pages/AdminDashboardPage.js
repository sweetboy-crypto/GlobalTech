import React, { useState, useEffect } from 'react';
import api from '../services/api';
import styles from './Dashboard.module.css'; // Use the new dashboard styles

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
        <div>
            <h1 className={styles.title} style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>
            {message && <p style={{ color: 'red' }}>{message}</p>}
            {stats ? (
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <h3>Total Users</h3>
                        <p>{stats.totalUsers}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Total Payments (NGN)</h3>
                        <p>{stats.totalPayments.toLocaleString()}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>Total Packages</h3>
                        <p>{stats.totalPackages}</p>
                    </div>
                </div>
            ) : (
                <p>Loading stats...</p>
            )}
        </div>
    );
};

export default AdminDashboardPage;
