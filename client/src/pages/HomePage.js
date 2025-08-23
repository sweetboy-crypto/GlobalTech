import React from 'react';
import { Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import logo from '../assets/logo.svg'; 

const HomePage = () => {
    return (
        <div>
            <div style={{ 
                textAlign: 'center', 
                padding: '4rem 1rem', 
                background: 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
     <img src={logo} alt="ParcelSim Express Logo" style={{ height: '50px', marginBottom: '1rem' }} />

                <h1 style={{ fontSize: '3.5rem', color: 'var(--neutral-black)', marginBottom: '1rem' }}>
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
            </div>

            <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', padding: '4rem 1rem' }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <Player
                        autoplay
                        loop
                        src="https://lottie.host/e8a329e9-1b79-4269-8283-3b1065793fd3/v4Yg5nS2R0.json"
                        style={{ maxWidth: '400px', margin: '0 auto' }}
                    />
                </div>
                <div style={{ flex: 2, minWidth: '300px' }}>
                    <div style={{ maxWidth: '600px' }}>
                         <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ color: 'var(--primary-orange)', fontSize: '1.5rem' }}>Real-Time Tracking</h3>
                            <p>Provide your clients and team with up-to-the-minute tracking information on a clean, professional interface.</p>
                        </div>
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ color: 'var(--primary-orange)', fontSize: '1.5rem' }}>Secure & Private</h3>
                            <p>Your tracking data is private and internal to your ParcelSim account, designed with security and auditability in mind.</p>
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--primary-orange)', fontSize: '1.5rem' }}>Dedicated Support</h3>
                            <p>Our platform is backed by a commitment to reliability and support, ensuring your logistics run smoothly.</p>
                        </div>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
