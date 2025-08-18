import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header style={{ backgroundColor: '#000000', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to={user ? "/dashboard" : "/"} style={{ color: '#FF6F00', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold' }}>
                ParcelSim Express
            </Link>
            <nav>
                <Link to="/track" style={{ color: '#FFFFFF', textDecoration: 'none', margin: '0 10px' }}>Track Package</Link>
                {user ? (
                    <>
                        {user.role === 'admin' && (
                            <Link to="/admin" style={{ color: '#FF6F00', textDecoration: 'none', margin: '0 10px' }}>Admin</Link>
                        )}
                        <Link to="/dashboard" style={{ color: '#FFFFFF', textDecoration: 'none', margin: '0 10px' }}>Dashboard</Link>
                        <button onClick={handleLogout} style={{ color: '#FFFFFF', textDecoration: 'none', margin: '0 10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1em' }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: '#FFFFFF', textDecoration: 'none', margin: '0 10px' }}>Login</Link>
                        <Link to="/signup" style={{ color: '#FFFFFF', textDecoration: 'none', margin: '0 10px' }}>Sign Up</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
