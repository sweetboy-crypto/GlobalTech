import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePackagePage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        origin_city: '',
        origin_country: '',
        destination_city: '',
        destination_country: '',
        sender_name: '',
        sender_email: '',
        receiver_name: '',
        receiver_email: '',
        receiver_phone: '',
        package_type: 'Document',
        current_status: 'NotYetInTransit'
    });
    const [message, setMessage] = useState('');

    const { ...allFields } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setMessage('');
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };
            const res = await axios.post('/api/packages', formData, config);
            setMessage('Package created successfully!');
            navigate(`/track/${res.data.tracking_code}`);
        } catch (err) {
            setMessage(err.response?.data?.msg || 'An error occurred');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h1 style={{ color: '#FF6F00' }}>Create New Package</h1>
            {message && <p style={{ color: 'red' }}>{message}</p>}
            <form onSubmit={onSubmit}>
                {Object.keys(allFields).map(field => (
                    <div key={field} style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', textTransform: 'capitalize' }}>
                            {field.replace('_', ' ')}
                        </label>
                        {field === 'package_type' ? (
                            <select name="package_type" value={formData.package_type} onChange={onChange} style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}>
                                <option value="Document">Document</option>
                                <option value="Small Parcel">Small Parcel</option>
                                <option value="Medium Parcel">Medium Parcel</option>
                                <option value="Large Parcel">Large Parcel</option>
                                <option value="Other">Other</option>
                            </select>
                        ) : field === 'current_status' ? (
                             <select name="current_status" value={formData.current_status} onChange={onChange} style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}>
                                <option value="NotYetInTransit">Not Yet in Transit</option>
                                <option value="InTransit">In Transit</option>
                                <option value="Delivered">Delivered</option>
                                <option value="EncounteredIssue">Encountered Issue</option>
                                <option value="Delayed">Delayed</option>
                            </select>
                        ) : (
                            <input
                                type={field.includes('email') ? 'email' : 'text'}
                                name={field}
                                value={formData[field]}
                                onChange={onChange}
                                required
                                style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                            />
                        )}
                    </div>
                ))}
                <input type="submit" value="Create Package & Get Tracking Code" style={{ backgroundColor: '#FF6F00', color: '#FFFFFF', padding: '15px 30px', border: 'none', cursor: 'pointer', width: '100%', fontSize: '16px' }} />
            </form>
        </div>
    );
};

export default CreatePackagePage;
