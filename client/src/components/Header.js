import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Header.module.css';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        navigate('/login');
    };
    const closeMenu = () => setIsOpen(false);

    const NavLinks = () => (
        <>
            <Link to="/track" onClick={closeMenu}>Track Package</Link>
            {user ? (
                <>
                    {user.role === 'admin' && (
                        <Link to="/admin" className={styles.adminLink} onClick={closeMenu}>Admin</Link>
                    )}
                    <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login" onClick={closeMenu}>Login</Link>
                    <Link to="/signup" onClick={closeMenu}>Sign Up</Link>
                </>
            )}
        </>
    );
return (
        <header className={styles.header}>
            <Link to={user ? "/dashboard" : "/"} className={styles.logo}>
                ParcelSim Express
            </Link>

            {/* Desktop Navigation */}
            <nav className={styles.navLinks}>
                <NavLinks />
            </nav>
            
            {/* Hamburger Icon */}
            <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
                <div />
                <div />
                <div />
            </button>

            {/* Mobile Navigation */}
            <nav className={`${styles.mobileNav} ${isOpen ? styles.open : ''}`}>
                <NavLinks />
            </nav>
        </header>
    );
};

export default Header;
