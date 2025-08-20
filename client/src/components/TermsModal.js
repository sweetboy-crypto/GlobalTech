import React, { useState } from 'react';
import api from '../services/api';

const TermsModal = ({ onAccept }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState('');

    const handleAccept = async () => {
        if (isChecked) {
            try {
                await api.post('/users/accept-terms');
                onAccept();
            } catch (err) {
                setError('Could not accept terms. Please try again.');
            }
        }
    };

    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        modal: {
            backgroundColor: '#FFFFFF',
            padding: '30px',
            borderRadius: '10px',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
        },
        button: {
            backgroundColor: '#FF6F00',
            color: '#FFFFFF',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
            marginTop: '20px',
            opacity: isChecked ? 1 : 0.5,
        },
        checkboxContainer: {
            margin: '20px 0',
            textAlign: 'left',
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2 style={{ color: '#FF6F00' }}>Terms of Use</h2>
                <p>
                    I will not use ParcelSim Express to impersonate real couriers or to deceive others.
                    I consent to identity verification and audit logging.
                </p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div style={styles.checkboxContainer}>
                    <input type="checkbox" id="terms" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                    <label htmlFor="terms" style={{ marginLeft: '10px' }}>I accept the terms and conditions.</label>
                </div>
                <button onClick={handleAccept} disabled={!isChecked} style={styles.button}>
                    Accept and Continue
                </button>
            </div>
        </div>
    );
};

export default TermsModal;
