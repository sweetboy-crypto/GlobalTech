import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const TrackingPage = () => {
    const { trackingCode: urlTrackingCode } = useParams();
    const navigate = useNavigate();
    const [inputTrackingCode, setInputTrackingCode] = useState('');
    const [packageDetails, setPackageDetails] = useState(null);
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState('');

    const fetchPackageDetails = async (code) => {
        setMessage('');
        setPackageDetails(null);
        setHistory([]);
        try {
            const res = await api.get(`/packages/track/${code}`);
            setPackageDetails(res.data.package);
            setHistory(res.data.history);
        } catch (err) {
            setMessage(err.response?.data?.msg || 'Package not found.');
        }
    };

    useEffect(() => {
        if (urlTrackingCode) {
            fetchPackageDetails(urlTrackingCode);
        }
    }, [urlTrackingCode]);

    const onSubmit = e => {
        e.preventDefault();
        if (inputTrackingCode) {
            navigate(`/track/${inputTrackingCode}`);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h1 style={{ color: '#FF6F00' }}>Track Your Package</h1>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Enter your tracking code"
                    value={inputTrackingCode}
                    onChange={e => setInputTrackingCode(e.target.value)}
                    required
                    style={{ width: 'calc(100% - 120px)', padding: '10px', boxSizing: 'border-box' }}
                />
                <input type="submit" value="Track" style={{ width: '100px', backgroundColor: '#FF6F00', color: '#FFFFFF', padding: '12px 20px', border: 'none', cursor: 'pointer' }} />
            </form>

            {message && <p style={{ color: 'red', marginTop: '20px' }}>{message}</p>}

            {packageDetails ? (
                <div style={{ marginTop: '30px' }}>
                    <h2 style={{ color: '#FF6F00' }}>Tracking Details for {packageDetails.tracking_code}</h2>
                    <p><strong>Status:</strong> {packageDetails.current_status}</p>
                    <p><strong>From:</strong> {packageDetails.origin_city}, {packageDetails.origin_country}</p>
                    <p><strong>To:</strong> {packageDetails.destination_city}, {packageDetails.destination_country}</p>

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
                urlTrackingCode && !message && <p>Loading details...</p>
            )}
        </div>
    );
};

export default TrackingPage;
