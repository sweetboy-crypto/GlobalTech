import React from 'react';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ status }) => {
    const getProgress = () => {
        switch (status) {
            case 'NotYetInTransit':
                return { width: '5%', text: 'Pending' };
            case 'InTransit':
                return { width: '50%', text: 'In Transit' };
            case 'Delayed':
            case 'EncounteredIssue':
                return { width: '50%', text: status, delayed: true };
            case 'Delivered':
                return { width: '100%', text: 'Delivered', delivered: true };
            default:
                return { width: '0%', text: '' };
        }
    };
  const progress = getProgress();

    const fillerClasses = [
        styles.filler,
        progress.delayed && styles.fillerDelayed,
        progress.delivered && styles.fillerDelivered,
    ].filter(Boolean).join(' ');

    return (
        <div className={styles.progressBarContainer}>
            <div className={fillerClasses} style={{ width: progress.width }}>
                {progress.text}
            </div>
        </div>
    );
};

export default ProgressBar;
