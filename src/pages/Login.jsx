import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Eye, EyeOff, ArrowRight, Sparkles, Facebook, Instagram, Youtube, Twitter, Linkedin } from 'lucide-react';
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

            {/* Footer */}
            <div className="login-footer">
                <div className="footer-top">
                    <div className="footer-column">
                        <h3>POPULAR LOCATIONS</h3>
                        <a href="https://www.google.com/maps/search/Bangalore,+India" target="_blank" rel="noopener noreferrer">Bangalore</a>
                        <a href="https://www.google.com/maps/search/Mumbai,+India" target="_blank" rel="noopener noreferrer">Mumbai</a>
                        <a href="https://www.google.com/maps/search/Delhi,+India" target="_blank" rel="noopener noreferrer">Delhi</a>
                        <a href="https://www.google.com/maps/search/Hyderabad,+India" target="_blank" rel="noopener noreferrer">Hyderabad</a>
                    </div>
                    <div className="footer-column">
                        <h3>TRENDING SERVICES</h3>
                        <Link to="/services?search=Plumber">Plumber</Link>
                        <Link to="/services?search=Electrician">Electrician</Link>
                        <Link to="/services?search=Carpenter">Carpenter</Link>
                        <Link to="/services?search=Painter">Painter</Link>
                    </div>
                    <div className="footer-column">
                        <h3>ABOUT US</h3>
                        <Link to="/about">About Solution For U</Link>
                        <Link to="/about#contact">Contact Us</Link>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <div className="footer-social">
                            <span>Follow Us</span>
                            <div className="social-icons">
                                <div className="social-icon" style={{ backgroundColor: '#1877f2' }}><Facebook size={20} /></div>
                                <div className="social-icon" style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}><Instagram size={20} /></div>
                                <div className="social-icon" style={{ backgroundColor: '#ff0000' }}><Youtube size={20} /></div>
                                <div className="social-icon" style={{ backgroundColor: '#000' }}><Twitter size={20} /></div>
                                <div className="social-icon" style={{ backgroundColor: '#25d366' }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                </div>
                                <div className="social-icon" style={{ backgroundColor: '#0077b5' }}><Linkedin size={20} /></div>
                            </div>
                        </div>
                        <div className="footer-copyright">
                            <span>All rights reserved © 2026 Solution For U</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
