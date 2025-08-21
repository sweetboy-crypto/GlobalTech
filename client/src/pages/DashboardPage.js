import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import TermsModal from '../components/TermsModal';
import styles from './Dashboard.module.css'; // Use the new dashboard styles

const DashboardPage = () => {
    const { user, reloadUser } = useAuth();
    const [packages, setPackages] = useState([]);
    const [message, setMessage] = useState('');

    const needsToAcceptTerms = user && !user.terms_acceptance?.accepted;

    useEffect(() => {
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
            <div className={styles.dashboardContainer} style={{ filter: needsToAcceptTerms ? 'blur(5px)' : 'none' }}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Your Dashboard</h1>
                    <Link to="/payment" className={styles.button}>
                        Buy New Tracking Code
                    </Link>
                </div>

                {user && <p style={{ border: '1px solid #FF6F00', padding: '10px', backgroundColor: '#fff0e6', marginBottom: '2rem', borderRadius: '5px' }}><b>Your role:</b> {user.role}</p>}

                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Your Packages</h2>
                {message && <p style={{ color: 'red' }}>{message}</p>}
                {packages.length > 0 ? (
                    <ul className={styles.packageList}>
                        {packages.map(pkg => (
                            <li key={pkg._id} className={styles.packageItem}>
                                <div>
                                    <Link to={`/track/${pkg.tracking_code}`} className={styles.trackingCode}>
                                        {pkg.tracking_code}
                                    </Link>
                                    <p style={{ margin: '5px 0 0', color: '#555' }}>To: {pkg.receiver_name} in {pkg.destination_city}</p>
                                </div>
                                <span className={styles.status} style={{ backgroundColor: '#e9e9e9', color: '#333' }}>
                                    {pkg.current_status}
                                </span>
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
