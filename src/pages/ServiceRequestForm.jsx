import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, FileText, MapPin, User, Phone, Tag, IndianRupee, Wrench, Zap, Droplets, Home, Hammer, Wind } from 'lucide-react';
import { SERVICE_CATEGORIES, SERVICE_DETAILS } from '../services/mockData';

const ServiceRequestForm = () => {
    const { serviceId } = useParams();
    const { services, addRequest } = useData();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: '',
        details: '',
        date: '',
        location: user?.location || ''
    });

    const serviceCategory = SERVICE_CATEGORIES.find(s => s.id === serviceId);
    const serviceName = serviceCategory?.name || 'General Service';
    const serviceDetails = SERVICE_DETAILS[serviceId];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please login to submit a request');
            navigate('/login');
            return;
        }

        try {
            await addRequest({
                user_id: user.id,
                service_type: serviceName,
                name: formData.name,
                phone: formData.phone,
                details: formData.details,
                date: formData.date,
                location: formData.location,
                status: 'pending'
            });
            navigate('/');
        } catch (error) {
            alert('Error submitting request');
        }
    };

    const floatingIcons = [
        { Icon: Wrench,   top: '8%',  left: '5%',  size: 28, delay: '0s',   dur: '6s'   },
        { Icon: Zap,      top: '15%', left: '88%', size: 32, delay: '1s',   dur: '7s'   },
        { Icon: Droplets, top: '70%', left: '4%',  size: 26, delay: '2s',   dur: '5s'   },
        { Icon: Home,     top: '80%', left: '90%', size: 30, delay: '0.5s', dur: '8s'   },
        { Icon: Hammer,   top: '45%', left: '2%',  size: 24, delay: '1.5s', dur: '6.5s' },
        { Icon: Wind,     top: '55%', left: '92%', size: 28, delay: '3s',   dur: '7.5s' },
        { Icon: Wrench,   top: '30%', left: '93%', size: 22, delay: '2.5s', dur: '5.5s' },
        { Icon: Zap,      top: '88%', left: '50%', size: 26, delay: '1s',   dur: '6s'   },
    ];

    React.useEffect(() => {
        const style = document.createElement('style');
        style.id = 'srf-animations';
        style.textContent = `
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            @keyframes float {
                0%, 100% { transform: translate(0,0) scale(1); }
                33% { transform: translate(30px,-50px) scale(1.1); }
                66% { transform: translate(-20px,20px) scale(0.9); }
            }
            @keyframes floatUp {
                0%   { transform: translateY(0px) rotate(0deg); opacity: 0.18; }
                50%  { transform: translateY(-22px) rotate(8deg); opacity: 0.32; }
                100% { transform: translateY(0px) rotate(0deg); opacity: 0.18; }
            }
        `;
        if (!document.getElementById('srf-animations')) document.head.appendChild(style);
        return () => document.getElementById('srf-animations')?.remove();
    }, []);

    const inputStyle = {
        width: '100%',
        padding: '0.75rem 0.75rem 0.75rem 2.5rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        fontSize: '1rem',
        marginBottom: '1rem'
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            {/* Login-style animated background */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 25%, #667eea 50%, #764ba2 75%, #1a1a1a 100%)',
                backgroundSize: '400% 400%',
                animation: 'gradientShift 15s ease infinite',
                zIndex: 0
            }} />
            <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'linear-gradient(135deg,#ffffff,#e0e0e0)', filter: 'blur(80px)', opacity: 0.4, top: '-10%', left: '-10%', animation: 'float 20s infinite ease-in-out', zIndex: 0 }} />
            <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'linear-gradient(135deg,#667eea,#764ba2)', filter: 'blur(80px)', opacity: 0.4, bottom: '-10%', right: '-10%', animation: 'float 20s 7s infinite ease-in-out', zIndex: 0 }} />
            <div style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', background: 'linear-gradient(135deg,#2d2d2d,#1a1a1a)', filter: 'blur(80px)', opacity: 0.4, top: '50%', left: '50%', animation: 'float 20s 14s infinite ease-in-out', zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', padding: '3rem 1rem', display: 'grid', gridTemplateColumns: serviceCategory ? '1fr 1.4fr' : '1fr', gap: '1.5rem', alignItems: 'start' }}>

            {/* Left: Service Info Panel */}
            {serviceCategory && (
                <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.18)', minHeight: '520px', display: 'flex', flexDirection: 'column' }}>
                    {/* Background image with overlay */}
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${serviceCategory.image})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.45)' }} />
                    {/* Gradient overlay */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(0,80,80,0.7) 0%, rgba(0,0,0,0.85) 100%)' }} />

                    {/* Decorative circles */}
                    <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: -30, left: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />

                    {/* Content */}
                    <div style={{ position: 'relative', zIndex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%', gap: '1.25rem' }}>
                        {/* Service image thumbnail */}
                        <div style={{ width: 72, height: 72, borderRadius: '16px', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.3)', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                            <img src={serviceCategory.image} alt={serviceName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                        </div>

                        <div>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Service Details</p>
                            <h2 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.2, margin: 0 }}>{serviceName}</h2>
                        </div>

                        {serviceDetails && (
                            <>
                                <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>
                                    {serviceDetails.description}
                                </p>

                                {/* Type badge */}
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.4rem 0.9rem', borderRadius: '999px', width: 'fit-content' }}>
                                    <Tag size={13} style={{ color: '#7dd3fc' }} />
                                    <span style={{ color: '#7dd3fc', fontSize: '0.82rem', fontWeight: 600 }}>{serviceDetails.type}</span>
                                </div>

                                {/* Price card */}
                                <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '14px', padding: '1rem 1.25rem' }}>
                                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 0.3rem' }}>Price Range</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <IndianRupee size={18} style={{ color: '#86efac' }} />
                                        <span style={{ color: '#86efac', fontSize: '1.3rem', fontWeight: 700 }}>{serviceDetails.priceRange}</span>
                                    </div>
                                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', margin: '0.4rem 0 0' }}>💡 {serviceDetails.priceNote}</p>
                                </div>
                            </>
                        )}

                        {/* Availability */}
                        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '0.75rem 1rem' }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80', flexShrink: 0 }} />
                            <div>
                                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Worker Availability</p>
                                <p style={{ color: 'white', fontSize: '0.88rem', fontWeight: 600, margin: 0 }}>Mon – Sat &nbsp;|&nbsp; 8:00 AM – 6:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        {/* Right: Form */}
        <div style={{ padding: '2rem', borderRadius: '20px', backgroundColor: 'white', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', border: '1px solid var(--color-border)' }}>
            <h1 style={{ marginBottom: '1.5rem', fontSize: '1.75rem' }}>Request {serviceName}</h1>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', top: '0.9rem', left: '0.75rem', color: 'var(--color-text-secondary)' }} />
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your full name"
                                style={inputStyle}
                            />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Phone Number</label>
                        <div style={{ position: 'relative' }}>
                            <Phone size={18} style={{ position: 'absolute', top: '0.9rem', left: '0.75rem', color: 'var(--color-text-secondary)' }} />
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Your phone number"
                                style={inputStyle}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Describe the problem</label>
                    <div style={{ position: 'relative' }}>
                        <FileText size={18} style={{ position: 'absolute', top: '0.9rem', left: '0.75rem', color: 'var(--color-text-secondary)' }} />
                        <textarea
                            name="details"
                            required
                            value={formData.details}
                            onChange={handleChange}
                            placeholder="Example: My kitchen sink is leaking..."
                            style={{ ...inputStyle, paddingLeft: '2.5rem', minHeight: '120px', resize: 'vertical' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Preferred Date</label>
                        <div style={{ position: 'relative' }}>
                            <Calendar size={18} style={{ position: 'absolute', top: '0.9rem', left: '0.75rem', color: 'var(--color-text-secondary)' }} />
                            <input
                                type="date"
                                name="date"
                                required
                                value={formData.date}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Location</label>
                        <div style={{ position: 'relative' }}>
                            <MapPin size={18} style={{ position: 'absolute', top: '0.9rem', left: '0.75rem', color: 'var(--color-text-secondary)' }} />
                            <input
                                type="text"
                                name="location"
                                required
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Your address"
                                style={inputStyle}
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                    Submit Request
                </button>
            </form>
        </div>
        </div>
        </div>
    );
};

export default ServiceRequestForm;