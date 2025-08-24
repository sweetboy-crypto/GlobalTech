import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import tableStyles from './Table.module.css';

const PackageManagementPage = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await api.get('/admin/packages');
                setPackages(res.data);
            } catch (err) {
                setError('Failed to fetch packages.');
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    if (loading) {
        return <div>Loading packages...</div>;
    }
  if (loading) {
        return <div>Loading packages...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <div>
      <h1 style={{ color: 'var(--primary-orange)', marginBottom: '2rem' }}>Package Management</h1>
            <div className={tableStyles.tableWrapper}>
                <table className={tableStyles.table}>
                    <thead>
                        <tr>
                            <th>Created</th>
                            <th>Tracking Code</th>
                            <th>Owner</th>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.map(pkg => (
                            <tr key={pkg._id}>
                                <td>{new Date(pkg.created_at).toLocaleDateString()}</td>
                                <td>{pkg.tracking_code}</td>
                                <td>{pkg.user_id ? pkg.user_id.name : 'N/A'}</td>
                                <td>{`${pkg.origin_city}, ${pkg.origin_country}`}</td>
                                <td>{`${pkg.destination_city}, ${pkg.destination_country}`}</td>
                                <td>{pkg.current_status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
    );
};

export default PackageManagementPage;
