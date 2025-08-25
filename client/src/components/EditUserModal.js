import React, { useState, useEffect } from 'react';
import api from '../services/api';
import styles from '../pages/AuthForm.module.css';

const EditUserModal = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', role: 'user', email_verified: false, kyc_status: 'none'
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '', email: user.email || '', phone: user.phone || '',
                role: user.role || 'user', email_verified: user.email_verified || false,
                kyc_status: user.kyc_status || 'none'
            });
        }
    }, [user]);
const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put(`/admin/users/${user._id}`, formData);
            onSave(res.data);
            onClose();
        } catch (error) {
            alert('Failed to update user.');
        }
    };

    if (!user) return null;
  return (
        <div className={styles.authContainer} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000 }}>
            <div className={styles.authCard} style={{ textAlign: 'left' }}>
                <h2 className={styles.authTitle} style={{ textAlign: 'center' }}>Edit User: {user.name}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}><label>Name</label><input type="text" name="name" value={formData.name} onChange={onChange} className={styles.input} /></div>
                    <div className={styles.formGroup}><label>Email</label><input type="email" name="email" value={formData.email} onChange={onChange} className={styles.input} /></div>
                    <div className={styles.formGroup}><label>Phone</label><input type="text" name="phone" value={formData.phone} onChange={onChange} className={styles.input} /></div>
                    <div className={styles.formGroup}><label>Role</label><select name="role" value={formData.role} onChange={onChange} className={styles.input}><option value="user">User</option><option value="admin">Admin</option></select></div>
                    <div className={styles.formGroup}><label>KYC Status</label><select name="kyc_status" value={formData.kyc_status} onChange={onChange} className={styles.input}><option value="none">None</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select></div>
                    <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'center' }}><input type="checkbox" name="email_verified" checked={formData.email_verified} onChange={onChange} id="email_verified_check" /><label htmlFor="email_verified_check" style={{ marginLeft: '10px' }}>Email Verified</label></div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}><button type="button" onClick={onClose} className={styles.button} style={{ backgroundColor: '#888' }}>Cancel</button><button type="submit" className={styles.button}>Save Changes</button></div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;
