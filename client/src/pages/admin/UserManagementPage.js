import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import tableStyles from './Table.module.css';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const deleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            try {
                await api.delete(`/admin/users/${userId}`);
                setUsers(users.filter(user => user._id !== userId));
            } catch (err) {
                setError('Failed to delete user.');
            }
        }
    };

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
            <h1 style={{ color: 'var(--primary-orange)', marginBottom: '2rem' }}>User Management</h1>
            <div className={tableStyles.tableWrapper}>
                <table className={tableStyles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Email Verified</th>
                            <th>KYC Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                           {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.role}</td>
                                <td>{user.email_verified ? 'Yes' : 'No'}</td>
                                <td>{user.kyc_status}</td>
                                <td>
                                    <button style={{marginRight: '5px', cursor: 'pointer'}}>Edit</button>
                                    <button onClick={() => deleteUser(user._id)} style={{cursor: 'pointer', color: 'red'}}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
);
};

export default UserManagementPage;
