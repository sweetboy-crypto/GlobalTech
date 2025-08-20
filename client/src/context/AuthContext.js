import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const res = await api.get('/users/me');
                setUser(res.data);
            } catch (err) {
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        loadUser();
    }, []);

    const login = async (email, password) => {
        const body = { email, password };
        const res = await api.post('/users/login', body);
        localStorage.setItem('token', res.data.token);
        // The interceptor will now use this new token for subsequent requests
        const userRes = await api.get('/users/me');
        setUser(userRes.data);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        logout,
        reloadUser: loadUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
