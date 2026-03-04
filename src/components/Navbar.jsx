import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, User, Briefcase, Settings, LogIn, LogOut, Info, MessageCircle } from 'lucide-react';
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
            @keyframes colorShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            @import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Righteous&family=Lobster&family=Pacifico&family=Dancing+Script:wght@700&family=Great+Vibes&family=Satisfy&family=Allura&family=Caveat:wght@700&display=swap');
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
        fontFamily: '"Caveat", cursive'
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
        transition: 'all 0.3s ease',
        fontSize: window.innerWidth <= 768 ? '0.85rem' : '1rem',
        padding: window.innerWidth <= 768 ? '0.5rem' : '0.5rem 1rem',
        borderRadius: '20px',
        backgroundColor: active ? 'rgba(102, 126, 234, 0.1)' : 'transparent'
    });

    const getHoverStyle = (active) => ({
        transform: 'scale(1.15)',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        color: active ? 'var(--color-primary)' : 'var(--color-primary)'
    });

    const getLeaveStyle = (active) => ({
        transform: 'scale(1)',
        backgroundColor: active ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
        color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)'
    });

    const logoIconStyle = {
        minWidth: window.innerWidth <= 768 ? 32 : 36,
        width: window.innerWidth <= 768 ? 32 : 36,
        height: window.innerWidth <= 768 ? 32 : 36,
        background: 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe, #00f2fe, #43e97b, #667eea)',
        backgroundSize: '400% 400%',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '900',
        fontSize: window.innerWidth <= 768 ? '1rem' : '1.1rem',
        color: '#ffffff',
        boxShadow: '0 3px 10px rgba(102, 126, 234, 0.3)',
        fontFamily: '"Kaushan Script", cursive',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        textShadow: '0 1px 3px rgba(0,0,0,0.2)',
        animation: 'colorShift 15s ease infinite'
    };

    const logoShineStyle = {
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)',
        animation: 'shine 5s ease-in-out infinite',
        pointerEvents: 'none'
    };



    return (
        <nav style={navStyle}>
            <a href="/" style={{...logoStyle, textDecoration: 'none'}}>
                <div style={logoIconStyle}>
                    <span style={{ position: 'relative', zIndex: 1, color: '#ffffff !important', WebkitTextFillColor: '#ffffff' }}>S!</span>
                </div>
                <span style={location.pathname === '/' ? {} : { color: 'var(--color-primary)' }}>
                    {window.innerWidth <= 768 ? 'SFU' : 'Solution For U'}
                </span>
            </a>

            <div style={linkContainerStyle}>
                {(!user || (user.role !== 'admin' && user.role !== 'worker')) && (
                    <a href="/" style={linkStyle(isActive('/'))} 
                        onMouseEnter={(e) => Object.assign(e.currentTarget.style, getHoverStyle(isActive('/')))} 
                        onMouseLeave={(e) => Object.assign(e.currentTarget.style, getLeaveStyle(isActive('/')))}>
                        <Home size={18} />
                        Home
                    </a>
                )}
                <a href="/about" style={linkStyle(isActive('/about'))} 
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, getHoverStyle(isActive('/about')))} 
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, getLeaveStyle(isActive('/about')))}>
                    <MessageCircle size={window.innerWidth <= 768 ? 16 : 18} />
                    About Us
                </a>
                {user ? (
                    <>
                        {user.role === 'admin' ? (
                            <a href="/admin" style={linkStyle(isActive('/admin'))} 
                                onMouseEnter={(e) => Object.assign(e.currentTarget.style, getHoverStyle(isActive('/admin')))} 
                                onMouseLeave={(e) => Object.assign(e.currentTarget.style, getLeaveStyle(isActive('/admin')))}>
                                <User size={window.innerWidth <= 768 ? 16 : 18} />
                                {window.innerWidth <= 768 ? '' : 'Admin Panel'}
                            </a>
                        ) : user.role === 'user' ? (
                            <a href="/user/dashboard" style={linkStyle(isActive('/user/dashboard'))} 
                                onMouseEnter={(e) => Object.assign(e.currentTarget.style, getHoverStyle(isActive('/user/dashboard')))} 
                                onMouseLeave={(e) => Object.assign(e.currentTarget.style, getLeaveStyle(isActive('/user/dashboard')))}>
                                <User size={window.innerWidth <= 768 ? 16 : 18} />
                                {window.innerWidth <= 768 ? '' : 'Dashboard'}
                            </a>
                        ) : null}
                        <NotificationIcon />
                        <button onClick={() => { logout(); navigate('/login'); }} 
                            style={{ ...linkStyle(false), cursor: 'pointer', background: 'none', border: 'none' }} 
                            onMouseEnter={(e) => Object.assign(e.currentTarget.style, getHoverStyle(false))} 
                            onMouseLeave={(e) => Object.assign(e.currentTarget.style, getLeaveStyle(false))}>
                            <LogOut size={window.innerWidth <= 768 ? 16 : 18} />
                            {window.innerWidth <= 768 ? '' : 'Logout'}
                        </button>
                    </>
                ) : (
                    <a href="/login" style={linkStyle(isActive('/login'))} 
                        onMouseEnter={(e) => Object.assign(e.currentTarget.style, getHoverStyle(isActive('/login')))} 
                        onMouseLeave={(e) => Object.assign(e.currentTarget.style, getLeaveStyle(isActive('/login')))}>
                        <LogIn size={window.innerWidth <= 768 ? 16 : 18} />
                        {window.innerWidth <= 768 ? '' : 'Login'}
                    </a>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
