import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, MapPin, Wrench, Zap, Droplets, Home, Hammer, Wind } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../services/mockData';
import { useNotifications } from '../context/NotificationContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        location: '',
        role: 'user',
        serviceType: '',
        phone: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const { addNotification } = useNotifications();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        const result = await register(formData);
        
        if (result.success) {
            // If it's a worker registration, send notification to admin
            if (formData.role === 'worker') {
                addNotification({
                    type: 'worker_registration',
                    title: 'New Worker Registration',
                    message: `${formData.name} registered as ${formData.serviceType} worker`,
                    targetRole: 'admin'
                });
            }
            
            alert('Account created successfully! Please login.');
            navigate('/login');
        } else {
            setError(result.message || 'Failed to create account');
        }
        
        setLoading(false);
    };

    const floatingIcons = [
        { Icon: Wrench,   top: '8%',  left: '5%',  size: 28, delay: '0s',   dur: '6s'  },
        { Icon: Zap,      top: '15%', left: '88%', size: 32, delay: '1s',   dur: '7s'  },
        { Icon: Droplets, top: '70%', left: '4%',  size: 26, delay: '2s',   dur: '5s'  },
        { Icon: Home,     top: '80%', left: '90%', size: 30, delay: '0.5s', dur: '8s'  },
        { Icon: Hammer,   top: '45%', left: '2%',  size: 24, delay: '1.5s', dur: '6.5s'},
        { Icon: Wind,     top: '55%', left: '92%', size: 28, delay: '3s',   dur: '7.5s'},
        { Icon: Wrench,   top: '30%', left: '93%', size: 22, delay: '2.5s', dur: '5.5s'},
        { Icon: Zap,      top: '88%', left: '50%', size: 26, delay: '1s',   dur: '6s'  },
    ];

    const containerStyle = {
        maxWidth: '420px',
        width: '100%',
        padding: '2.5rem 2rem',
        borderRadius: '1.25rem',
        backgroundColor: 'rgba(255,255,255,0.97)',
        boxShadow: '0 20px 60px rgba(15,118,110,0.18), 0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid rgba(15,118,110,0.12)',
        position: 'relative',
        zIndex: 1
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        fontSize: '1rem',
        marginBottom: '1rem'
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0F766E 0%, #0D9488 30%, #0ea5e9 70%, #0369a1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative blobs */}
            <div style={{
                position: 'absolute', top: '-80px', left: '-80px',
                width: '320px', height: '320px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)', pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute', bottom: '-100px', right: '-60px',
                width: '400px', height: '400px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)', pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)',
                width: '600px', height: '600px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.04)', pointerEvents: 'none'
            }} />

            {/* Floating service icons */}
            <style>{`
                @keyframes floatUp {
                    0%   { transform: translateY(0px) rotate(0deg); opacity: 0.18; }
                    50%  { transform: translateY(-22px) rotate(8deg); opacity: 0.32; }
                    100% { transform: translateY(0px) rotate(0deg); opacity: 0.18; }
                }
            `}</style>
            {floatingIcons.map(({ Icon, top, left, size, delay, dur }, i) => (
                <div key={i} style={{
                    position: 'absolute', top, left,
                    animation: `floatUp ${dur} ${delay} ease-in-out infinite`,
                    color: 'rgba(255,255,255,0.55)',
                    pointerEvents: 'none'
                }}>
                    <Icon size={size} />
                </div>
            ))}

        <div style={containerStyle}>
            <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Create Account</h1>
            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                Join Solution For U today
            </p>

            {error && (
                <div style={{
                    backgroundColor: '#fef2f2',
                    color: 'var(--color-error)',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="John Doe"
                        style={inputStyle}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        style={inputStyle}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="••••••••"
                        style={inputStyle}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Location</label>
                    <input
                        type="text"
                        name="location"
                        required
                        placeholder="City, Area"
                        style={inputStyle}
                        onChange={handleChange}
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>User Type :</label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <label style={{ flex: 1, cursor: 'pointer', padding: '0.75rem', border: formData.role === 'user' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', textAlign: 'center', backgroundColor: formData.role === 'user' ? 'var(--color-bg-primary)' : 'white' }}>
                            <input
                                type="radio"
                                name="role"
                                value="user"
                                checked={formData.role === 'user'}
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                            Customers
                        </label>
                        <label style={{ flex: 1, cursor: 'pointer', padding: '0.75rem', border: formData.role === 'worker' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', textAlign: 'center', backgroundColor: formData.role === 'worker' ? 'var(--color-bg-primary)' : 'white' }}>
                            <input
                                type="radio"
                                name="role"
                                value="worker"
                                checked={formData.role === 'worker'}
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                            Workers
                        </label>
                    </div>
                </div>

                {formData.role === 'worker' && (
                    <>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                placeholder="Your phone number"
                                style={inputStyle}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Service Type</label>
                            <select
                                name="serviceType"
                                required
                                style={inputStyle}
                                onChange={handleChange}
                            >
                                <option value="">Select your service</option>
                                {SERVICE_CATEGORIES.map((service) => (
                                    <option key={service.id} value={service.name}>
                                        {service.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>

            <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Login</Link>
            </div>
        </div>
        </div>
    );
};

export default Register;
