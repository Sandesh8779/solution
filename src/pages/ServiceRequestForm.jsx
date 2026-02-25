import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, FileText, MapPin, User, Phone } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../services/mockData';

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

    const serviceName = SERVICE_CATEGORIES.find(s => s.id === serviceId)?.name || 'General Service';

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

    const inputStyle = {
        width: '100%',
        padding: '0.75rem 0.75rem 0.75rem 2.5rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        fontSize: '1rem',
        marginBottom: '1rem'
    };

    return (
        <div style={{ maxWidth: '600px', margin: '3rem auto', padding: '2rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'white', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)' }}>
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
    );
};

export default ServiceRequestForm;