import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get('/admin/users');
                setUsers(res.data);
            } catch (err) {
                setError('Failed to fetch users.');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading users...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <div>
            <h1 style={{ color: '#FF6F00' }}>User Management</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Phone</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Role</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email Verified</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>KYC Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.name}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.phone}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.role}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email_verified ? 'Yes' : 'No'}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.kyc_status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagementPage;
