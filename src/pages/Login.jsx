import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(email, password);
        if (result.success) {
            // Redirect based on user role
            const userData = JSON.parse(localStorage.getItem('sfu_user'));
            if (userData.role === 'admin') {
                navigate('/admin');
            } else if (userData.role === 'worker') {
                navigate('/worker/dashboard');
            } else {
                navigate('/');
            }
        } else {
            setError(result.message);
        }
    };

    const containerStyle = {
        maxWidth: '400px',
        margin: '4rem auto',
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'white',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--color-border)'
    };

    const inputGroupStyle = {
        marginBottom: '1rem'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: 500
    };

    const inputWrapperStyle = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    };

    const iconStyle = {
        position: 'absolute',
        left: '0.75rem',
        color: 'var(--color-text-secondary)'
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem 0.75rem 0.75rem 2.5rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s'
    };

    return (
        <div style={containerStyle}>
            <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Welcome Back</h1>
            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                Login to access your account
            </p>

            {error && (
                <div style={{
                    backgroundColor: '#fef2f2',
                    color: 'var(--color-error)',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <AlertCircle size={18} />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Email Address</label>
                    <div style={inputWrapperStyle}>
                        <Mail size={18} style={iconStyle} />
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div style={{ paddingBottom: '1.5rem' }}>
                    <label style={labelStyle}>Password</label>
                    <div style={inputWrapperStyle}>
                        <Lock size={18} style={iconStyle} />
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            style={inputStyle}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '0.75rem',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--color-text-secondary)'
                            }}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Sign In
                </button>
            </form>

            <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                Don't have an account? <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Sign up</Link>
            </div>

            <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                <Link to="/forgot-password" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Forgot Password?</Link>
            </div>
        </div>
    );
};

export default Login;
