import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentCallbackPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState('Your payment is being processed. You will receive a notification shortly.');

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const reference = query.get('trxref'); // Paystack uses trxref

        if (reference) {
            // You could verify the transaction status with your backend here
            // for a better user experience, but we rely on webhooks for confirmation.
            setMessage('Payment processing initiated. Please wait for confirmation.');
        } else {
            setMessage('Payment reference not found. Please contact support if you have been charged.');
        }

        // Redirect to a dashboard or home page after a few seconds
        setTimeout(() => {
            navigate('/create-package'); // Assuming a create package route exists
        }, 5000);

    }, [location, navigate]);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1 style={{ color: '#FF6F00' }}>Payment Processing</h1>
            <p>{message}</p>
            <p>You will be redirected automatically.</p>
        </div>
    );
};

export default PaymentCallbackPage;
