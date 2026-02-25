import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, MapPin } from 'lucide-react';
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

    const containerStyle = {
        maxWidth: '400px',
        margin: '4rem auto',
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'white',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--color-border)'
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
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>I want to...</label>
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
                            Find Help
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
                            Offer Services
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
    );
};

export default Register;
