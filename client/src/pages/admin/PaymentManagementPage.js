import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import tableStyles from './Table.module.css';

const PaymentManagementPage = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await api.get('/admin/payments');
                setPayments(res.data);
            } catch (err) {
                setError('Failed to fetch payments.');
            } finally {
                setLoading(false);
            }
        };
      fetchPayments();
    }, []);

    if (loading) {
        return <div>Loading payments...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <div>
            <h1 style={{ color: 'var(--primary-orange)', marginBottom: '2rem' }}>Payment Management</h1>
            <div className={tableStyles.tableWrapper}>
                <table className={tableStyles.table}>
                    <thead>
                       <tr>
                            <th>Date</th>
                            <th>User</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Gateway</th>
                            <th>Reference</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment._id}>
                                <td>{new Date(payment.created_at).toLocaleString()}</td>
                                <td>{payment.user_id ? payment.user_id.name : 'N/A'} ({payment.user_id ? payment.user_id.email : 'N/A'})</td>
                                <td>{(payment.amount_minor / 100).toFixed(2)} {payment.amount_currency}</td>
                                <td>{payment.status}</td>
                                <td>{payment.gateway}</td>
                                <td>{payment.gateway_reference}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
               </div>
        </div>
    );
};

export default PaymentManagementPage;
