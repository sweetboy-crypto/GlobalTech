import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PackageDetailPage = () => {
    const { trackingCode } = useParams();
    const [packageDetails, setPackageDetails] = useState(null);
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState('');
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {
                const res = await axios.get(`/api/packages/track/${trackingCode}`);
                setPackageDetails(res.data.package);
                setHistory(res.data.history);

                // Check if the logged-in user is the owner
                const token = localStorage.getItem('token');
                if (token) {
                    const config = { headers: { 'Authorization': `Bearer ${token}` } };
                    const userRes = await axios.get('/api/users/me', config);
                    if (userRes.data._id === res.data.package.user_id) {
                        setIsOwner(true);
                    }
                }
            } catch (err) {
                setMessage(err.response?.data?.msg || 'An error occurred');
            }
        };
        fetchPackageDetails();
    }, [trackingCode]);

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            {message && <p style={{ color: 'red' }}>{message}</p>}
            {packageDetails ? (
                <div>
                    <h1 style={{ color: '#FF6F00' }}>Package Details</h1>
                    <p><strong>Tracking Code:</strong> {packageDetails.tracking_code}</p>
                    <p><strong>Status:</strong> {packageDetails.current_status}</p>

                    {isOwner && (
                        <div style={{ margin: '20px 0' }}>
                            <button style={{ backgroundColor: '#000000', color: '#FFFFFF', padding: '10px 20px', border: 'none', cursor: 'pointer', marginRight: '10px' }}>
                                Edit Details
                            </button>
                            <button style={{ backgroundColor: '#000000', color: '#FFFFFF', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
                                Update Status
                            </button>
                        </div>
                    )}

                    <h3 style={{ color: '#FF6F00', marginTop: '30px' }}>History</h3>
                     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map(item => (
                                <tr key={item._id}>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(item.timestamp).toLocaleString()}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.new_status}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.note}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Loading package details...</p>
            )}
        </div>
    );
};

export default PackageDetailPage;
