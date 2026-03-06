import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Eye, EyeOff, ArrowRight, Sparkles, Facebook, Instagram, Youtube, Twitter, Linkedin, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import './Login.css';

const TestimonialsSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    const testimonials = [
        {
            id: 1,
            rating: 4,
            date: '10th Nov',
            text: 'Olx has worked very well for me. I am very happy with your services and would like to give this experience a high rating. Thank you!',
            name: 'Mohd Sakib'
        },
        {
            id: 2,
            rating: 5,
            date: '20th Oct',
            text: 'It is a very good application for buying and selling your second hand products. I sold my Car, Dhokla machine and many things here I also purchased many goods from here, I love to use this application. It is a proud product of #India.',
            name: 'Divyaraj Champavat'
        },
        {
            id: 3,
            rating: 5,
            date: '7th Oct',
            text: 'Wonderful app if you are in a big city. Very easy interface, just need to be precise to the probable customers and it will be a good experience.',
            name: 'Rajvir Jhala'
        },
        {
            id: 4,
            rating: 5,
            date: '15th Sep',
            text: 'Great platform for finding reliable professionals. The service quality exceeded my expectations!',
            name: 'Priya Sharma'
        },
        {
            id: 5,
            rating: 4,
            date: '3rd Sep',
            text: 'Quick response and professional service. Highly recommend for home repairs and maintenance.',
            name: 'Amit Kumar'
        }
    ];

    const scroll = (direction) => {
        if (direction === 'left') {
            setCurrentIndex(prev => Math.max(0, prev - 1));
        } else {
            setCurrentIndex(prev => Math.min(testimonials.length - 1, prev + 1));
        }
    };

    React.useEffect(() => {
        if (sliderRef.current) {
            const cardWidth = sliderRef.current.children[0]?.offsetWidth || 0;
            const gap = 24;
            sliderRef.current.scrollTo({
                left: currentIndex * (cardWidth + gap),
                behavior: 'smooth'
            });
        }
    }, [currentIndex]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => {
                if (prev >= testimonials.length - 3) return 0;
                return prev + 1;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <div style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto' }}>
            <button
                onClick={() => scroll('left')}
                disabled={currentIndex === 0}
                style={{
                    position: 'absolute',
                    left: '-20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                    opacity: currentIndex === 0 ? 0.5 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <ChevronLeft size={24} />
            </button>

            <div
                ref={sliderRef}
                style={{
                    display: 'flex',
                    gap: '24px',
                    overflowX: 'hidden',
                    scrollBehavior: 'smooth',
                    padding: '10px'
                }}
            >
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        style={{
                            minWidth: window.innerWidth <= 768 ? '100%' : 'calc(33.333% - 16px)',
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '24px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={20}
                                    fill={i < testimonial.rating ? '#fbbf24' : 'none'}
                                    color='#fbbf24'
                                />
                            ))}
                            <span style={{ marginLeft: '8px', color: '#6b7280', fontSize: '14px' }}>
                                {testimonial.date}
                            </span>
                        </div>
                        <p style={{ color: '#374151', fontSize: '15px', lineHeight: '1.6', fontStyle: 'italic', margin: 0 }}>
                            {testimonial.text}
                        </p>
                        <p style={{ fontWeight: 600, color: '#111827', margin: 0 }}>
                            {testimonial.name}
                        </p>
                    </div>
                ))}
            </div>

            <button
                onClick={() => scroll('right')}
                disabled={currentIndex >= testimonials.length - 3}
                style={{
                    position: 'absolute',
                    right: '-20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    cursor: currentIndex >= testimonials.length - 3 ? 'not-allowed' : 'pointer',
                    opacity: currentIndex >= testimonials.length - 3 ? 0.5 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

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

            {/* Testimonials Section */}
            <section style={{ backgroundColor: '#f8f9fa', padding: '4rem 0', position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
                    <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '3rem', fontWeight: 700 }}>What Our Users Say</h2>
                    <TestimonialsSlider />
                </div>
            </section>
        </div>
    );
};

export default Login;
