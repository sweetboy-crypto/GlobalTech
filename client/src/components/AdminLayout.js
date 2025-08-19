import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
    const linkStyle = {
        display: 'block',
        padding: '10px 15px',
        margin: '5px 0',
        textDecoration: 'none',
        color: '#000000',
        backgroundColor: '#e9e9e9',
        borderRadius: '5px'
    };

    return (
        <div style={{ display: 'flex' }}>
            <aside style={{ width: '220px', padding: '20px', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
                <h2 style={{ color: '#FF6F00' }}>Admin Menu</h2>
                <nav>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li><Link to="/admin" style={linkStyle}>Dashboard</Link></li>
                        <li><Link to="/admin/users" style={linkStyle}>Users</Link></li>
                        <li><Link to="/admin/payments" style={linkStyle}>Payments</Link></li>
                        <li><Link to="/admin/packages" style={linkStyle}>Packages</Link></li>
                    </ul>
                </nav>
            </aside>
            <main style={{ flex: 1, padding: '20px' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
