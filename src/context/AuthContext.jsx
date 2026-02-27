import React, { createContext, useState, useContext, useEffect } from 'react';
import { signIn, signUp } from '../services/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('sfu_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const { data, error } = await signIn(email, password);
        if (error) {
            return { success: false, message: error.message || 'Invalid email or password' };
        }
        
        const userData = {
            id: data.id,
            email: data.email,
            name: data.name,
            role: data.profiletype === 1 ? 'worker' : data.role || 'user'
        };
        
        setUser(userData);
        localStorage.setItem('sfu_user', JSON.stringify(userData));
        return { success: true };
    };

    const register = async (userData) => {
        const { data, error } = await signUp(userData.email, userData.password, userData.name, userData.role, userData.serviceType, userData.phone, userData.location);
        
        if (error) {
            return { success: false, message: error.message };
        }
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('sfu_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);