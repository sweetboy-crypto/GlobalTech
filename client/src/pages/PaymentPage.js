import React, { useState } from 'react';
import api from '../services/api';

const PaymentPage = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        setMessage('');
        try {
            const res = await api.post('/payments/initiate');
            if (res.data.authorization_url) {
                window.location.href = res.data.authorization_url;
            }
        } catch (err) {
            setMessage(err.response?.data?.msg || 'An error occurred while initiating payment.');
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center', maxWidth: '500px', margin: 'auto' }}>
            <h1 style={{ color: '#FF6F00' }}>Buy a Tracking Code</h1>
            <p>Click the button below to pay ₦20,000 and get a new tracking code.</p>
            <button onClick={handlePayment} disabled={loading} style={{ backgroundColor: '#FF6F00', color: '#FFFFFF', padding: '15px 30px', border: 'none', cursor: 'pointer', fontSize: '18px', borderRadius: '5px' }}>
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
            {message && <p style={{ color: 'red', marginTop: '20px' }}>{message}</p>}
        </div>
    );
};

export default PaymentPage;
