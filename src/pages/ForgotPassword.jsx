import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../services/supabase';

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // 1: Email, 2: New Password, 3: Success
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const emailLower = email.toLowerCase();
            console.log('Checking email:', emailLower);
            
            // Check in users table (for admin and regular users)
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('*')
                .ilike('email', emailLower)
                .maybeSingle();
            
            if (userData) {
                console.log('Found in users table:', userData);
                setStep(2);
                setLoading(false);
                return;
            }

            // Check in workers table
            const { data: workerData, error: workerError } = await supabase
                .from('workers')
                .select('*')
                .ilike('email', emailLower)
                .maybeSingle();
            
            if (workerData) {
                console.log('Found in workers table:', workerData);
                setStep(2);
                setLoading(false);
                return;
            }

            console.log('User error:', userError);
            console.log('Worker error:', workerError);
            setError(`Email '${emailLower}' not found in database.`);
            setLoading(false);
        } catch (error) {
            console.error('Error checking email:', error);
            setError('Database connection error.');
            setLoading(false);
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setError('');

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        
        try {
            const emailLower = email.toLowerCase();
            
            // Try to update in users table
            const { data: userData } = await supabase
                .from('users')
                .update({ password: newPassword })
                .ilike('email', emailLower)
                .select();
            
            if (userData && userData.length > 0) {
                setStep(3);
                setLoading(false);
                return;
            }

            // Try to update in workers table
            const { data: workerData } = await supabase
                .from('workers')
                .update({ password: newPassword })
                .ilike('email', emailLower)
                .select();
            
            if (workerData && workerData.length > 0) {
                setStep(3);
                setLoading(false);
                return;
            }

            setError('Failed to update password');
            setLoading(false);
        } catch (error) {
            setError('Failed to update password');
            setLoading(false);
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

    // Step 1: Email Input
    if (step === 1) {
        return (
            <div style={containerStyle}>
                <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Forgot Password</h1>
                <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                    Enter your email address to reset your password
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

                <form onSubmit={handleEmailSubmit}>
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

                    <button 
                        type="submit" 
                        className="btn btn-primary" 
                        style={{ width: '100%', marginBottom: '1rem' }}
                        disabled={loading}
                    >
                        {loading ? 'Checking...' : 'Continue'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', fontSize: '0.9rem' }}>
                    Remember your password? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Sign in</Link>
                </div>
            </div>
        );
    }

    // Step 2: New Password Input
    if (step === 2) {
        return (
            <div style={containerStyle}>
                <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Reset Password</h1>
                <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                    Enter your new password for {email}
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

                <form onSubmit={handlePasswordReset}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>New Password</label>
                        <div style={inputWrapperStyle}>
                            <Lock size={18} style={iconStyle} />
                            <input
                                type={showNewPassword ? "text" : "password"}
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="••••••••"
                                style={inputStyle}
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '0.75rem',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--color-text-secondary)'
                                }}
                            >
                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div style={{ paddingBottom: '1.5rem' }}>
                        <label style={labelStyle}>Confirm New Password</label>
                        <div style={inputWrapperStyle}>
                            <Lock size={18} style={iconStyle} />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                style={inputStyle}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '0.75rem',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--color-text-secondary)'
                                }}
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary" 
                        style={{ width: '100%', marginBottom: '1rem' }}
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Reset Password'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', fontSize: '0.9rem' }}>
                    <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Back to Login</Link>
                </div>
            </div>
        );
    }

    // Step 3: Success Message
    return (
        <div style={containerStyle}>
            <div style={{ textAlign: 'center' }}>
                <CheckCircle size={64} style={{ color: 'var(--color-success)', marginBottom: '1rem' }} />
                <h1 style={{ marginBottom: '0.5rem', color: 'var(--color-success)' }}>Password Reset Successful</h1>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                    Your password has been successfully updated. You can now login with your new password.
                </p>
                
                <button 
                    onClick={() => navigate('/login')}
                    className="btn btn-primary" 
                    style={{ width: '100%' }}
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;