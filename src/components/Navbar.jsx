import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, User, Briefcase, Settings, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationIcon from './NotificationIcon';
import React from 'react';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // Add CSS animation for gradient text
    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    const isActive = (path) => location.pathname === path;

    // Inline styles for simplicity in this file, ideally move to components.css later
    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: window.innerWidth <= 768 ? '0.75rem 1rem' : '1rem 2rem',
        backgroundColor: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-sm)'
    };

    const logoStyle = {
        fontSize: window.innerWidth <= 768 ? '1.2rem' : '1.5rem',
        fontWeight: '700',
        ...(location.pathname === '/' ? {
            background: 'linear-gradient(-45deg, var(--color-primary), var(--color-primary-hover), #3b82f6, #8b5cf6)',
            backgroundSize: '400% 400%',
            animation: 'gradientShift 8s ease infinite',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
        } : {
            color: 'var(--color-primary)'
        }),
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontFamily: 'var(--font-heading)'
    };

    const linkContainerStyle = {
        display: 'flex',
        gap: window.innerWidth <= 768 ? '0.25rem' : '1.5rem',
        flexWrap: 'wrap',
        alignItems: 'center'
    };

    const linkStyle = (active) => ({
        display: 'flex',
        alignItems: 'center',
        gap: window.innerWidth <= 768 ? '0.25rem' : '0.5rem',
        textDecoration: 'none',
        color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
        fontWeight: active ? '600' : '500',
        transition: 'color 0.2s',
        fontSize: window.innerWidth <= 768 ? '0.85rem' : '1rem',
        padding: window.innerWidth <= 768 ? '0.5rem' : '0'
    });

    return (
        <nav style={navStyle}>
            <Link to="/" style={logoStyle}>
                <div style={{ width: window.innerWidth <= 768 ? 20 : 24, height: window.innerWidth <= 768 ? 20 : 24, background: 'var(--color-primary)', borderRadius: 6 }}></div>
                {window.innerWidth <= 768 ? 'SFU' : 'Solution For U'}
            </Link>

            <div style={linkContainerStyle}>
                {(!user || (user.role !== 'admin' && user.role !== 'worker')) && (
                    <Link to="/" style={linkStyle(isActive('/'))}>
                        <Home size={18} />
                        Home
                    </Link>
                )}
                {user ? (
                    <>
                        {user.role === 'admin' ? (
                            <Link to="/admin" style={linkStyle(isActive('/admin'))}>
                                <User size={window.innerWidth <= 768 ? 16 : 18} />
                                {window.innerWidth <= 768 ? '' : 'Admin Panel'}
                            </Link>
                        ) : user.role === 'user' ? (
                            <Link to="/user/dashboard" style={linkStyle(isActive('/user/dashboard'))}>
                                <User size={window.innerWidth <= 768 ? 16 : 18} />
                                {window.innerWidth <= 768 ? '' : 'Dashboard'}
                            </Link>
                        ) : null}
                        <NotificationIcon />
                        <button onClick={() => { logout(); navigate('/login'); }} style={{ ...linkStyle(false), cursor: 'pointer', background: 'none', border: 'none' }}>
                            <LogOut size={window.innerWidth <= 768 ? 16 : 18} />
                            {window.innerWidth <= 768 ? '' : 'Logout'}
                        </button>
                    </>
                ) : (
                    <Link to="/login" style={{ ...linkStyle(isActive('/login')), color: 'var(--color-primary)' }}>
                        <LogIn size={window.innerWidth <= 768 ? 16 : 18} />
                        {window.innerWidth <= 768 ? '' : 'Login'}
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
