import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        const result = await login(email, password);
        setIsLoading(false);
        
        if (result.success) {
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

    return (
        <div className="login-container">
            {/* Animated Background */}
            <div className="login-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            <div style={{ display: 'flex', flex: 1, position: 'relative', zIndex: 1 }}>
                {/* Left Side - Branding */}
                <div className="login-left">
                    <div className="brand-content">
                        <div className="brand-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.25rem', width: '80px', height: '80px', background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)', borderRadius: '20px', border: '2px solid rgba(255, 255, 255, 0.3)', marginBottom: '2rem', paddingLeft: '0.5rem' }}>
                            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', fontFamily: '"Dancing Script", cursive' }}>S!</span>
                            <Sparkles size={20} style={{ color: '#fdfd0b' }} />
                        </div>
                        <h1 className="brand-title">
                            <span style={{ color: '#ff6b35' }}>S</span><span style={{ color: 'white' }}>olution</span> <span style={{ color: '#00008B' }}>F</span><span style={{ color: 'white' }}>or</span> <span style={{ color: '#10b981' }}>U</span>
                        </h1>
                        <p className="brand-subtitle">Your trusted partner for professional home services</p>
                        
                        <div className="features-list">
                            <div className="feature-item">
                                <div className="feature-icon">✓</div>
                                <span>Verified Professionals</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">✓</div>
                                <span>24/7 Customer Support</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">✓</div>
                                <span>Secure & Reliable</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="login-right">
                    <div className="login-card">
                        <div className="login-header">
                            <h2>Welcome Again, Friend!</h2>
                            <p>Login to access to your account</p>
                        </div>

                        {error && (
                            <div className="error-alert">
                                <AlertCircle size={18} />
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="input-group">
                                <label>Email Address</label>
                                <div className="input-wrapper">
                                    <Mail size={20} className="input-icon" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Password</label>
                                <div className="input-wrapper">
                                    <Lock size={20} className="input-icon" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="form-input"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="password-toggle"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="form-footer">
                                <Link to="/forgot-password" className="forgot-link">
                                    Forgot Password?
                                </Link>
                            </div>

                            <button 
                                type="submit" 
                                className={`login-button ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="loading-spinner"></span>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="signup-prompt">
                            <span>Don't have an account?</span>
                            <Link to="/register" className="signup-link">
                                Create Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Login;
