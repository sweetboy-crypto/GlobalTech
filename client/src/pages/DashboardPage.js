import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import TermsModal from '../components/TermsModal';

const DashboardPage = () => {
    const { user, reloadUser } = useAuth();
    const [packages, setPackages] = useState([]);
    const [message, setMessage] = useState('');

    const needsToAcceptTerms = user && !user.terms_acceptance?.accepted;

    useEffect(() => {
        // Do not fetch packages if the user needs to accept terms
        if (user && !needsToAcceptTerms) {
            const fetchPackages = async () => {
                try {
                    const res = await api.get('/packages');
                    setPackages(res.data);
                } catch (err) {
                    setMessage('Could not fetch packages.');
                }
            };
            fetchPackages();
        }
    }, [user, needsToAcceptTerms]);

    return (
        <>
            {needsToAcceptTerms && <TermsModal onAccept={reloadUser} />}
            <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', filter: needsToAcceptTerms ? 'blur(5px)' : 'none' }}>
                <h1 style={{ color: '#FF6F00' }}>Dashboard</h1>
                <p>Welcome to your dashboard. Here you can manage your packages.</p>


            <h2 style={{ color: '#000000' }}>Your Packages</h2>
            {message && <p style={{ color: 'red' }}>{message}</p>}
            {packages.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {packages.map(pkg => (
                        <li key={pkg._id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '5px' }}>
                            <Link to={`/track/${pkg.tracking_code}`} style={{ textDecoration: 'none', color: '#FF6F00', fontWeight: 'bold' }}>
                                {pkg.tracking_code}
                            </Link>
                            <p style={{ margin: '5px 0 0', color: '#333' }}>Status: {pkg.current_status}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have not created any packages yet.</p>
            )}
            </div>
        </>
    );
};

export default DashboardPage;
