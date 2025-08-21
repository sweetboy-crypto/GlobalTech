import React from 'react';
import { Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import logo from '../assets/logo.svg';

const HomePage = () => {
    return (
        <div className="container" style={{ textAlign: 'center', paddingTop: '2rem', paddingBottom: '2rem' }}>
            <img src={logo} alt="ParcelSim Express Logo" style={{ height: '50px', marginBottom: '1rem' }} />

            <h1 style={{ fontSize: '3rem', color: 'var(--neutral-black)', marginBottom: '1rem' }}>
                Reliable, Secure, and On-Time.
            </h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem auto', color: 'var(--dark-gray)' }}>
                Welcome to ParcelSim Express, your trusted partner for creating and managing internal tracking for packages. Our platform is built for security, reliability, and ease of use.
            </p>

            <div style={{ margin: '2rem 0' }}>
                <Link to="/signup">
                    <button style={{
                        backgroundColor: 'var(--primary-orange)',
                        color: 'var(--neutral-white)',
                        padding: '15px 30px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        borderRadius: '5px'
                    }}>
                        Get Started
                    </button>
                </Link>
            </div>

            <Player
                autoplay
                loop
                src="https://lottie.host/b0b8c67a-c603-492c-8187-a2c8e31bf4a6/v5hCh3kSzA.json" // A different, suitable animation
                style={{ height: '300px', width: '300px', margin: '0 auto' }}
            />

            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '4rem', flexWrap: 'wrap' }}>
                <div style={{ maxWidth: '300px' }}>
                    <h3 style={{ color: 'var(--primary-orange)' }}>Real-Time Tracking</h3>
                    <p>Provide your clients and team with up-to-the-minute tracking information on a clean, professional interface.</p>
                </div>
                <div style={{ maxWidth: '300px' }}>
                    <h3 style={{ color: 'var(--primary-orange)' }}>Secure & Private</h3>
                    <p>Your tracking data is private and internal to your ParcelSim account, designed with security and auditability in mind.</p>
                </div>
                <div style={{ maxWidth: '300px' }}>
                    <h3 style={{ color: 'var(--primary-orange)' }}>Dedicated Support</h3>
                    <p>Our platform is backed by a commitment to reliability and support, ensuring your logistics run smoothly.</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
