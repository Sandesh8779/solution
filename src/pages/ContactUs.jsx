import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { createContactMessage } from '../services/supabase';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await createContactMessage(formData);
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', subject: '', message: '' });
            }, 3000);
        } catch (error) {
            console.error('Error saving message:', error);
            alert('Failed to send message. Please try again.');
        }
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '2rem auto',
        padding: '2rem'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
        gap: '2rem',
        marginTop: '2rem'
    };

    const cardStyle = {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
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

    const infoItemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: 'var(--color-bg-primary)',
        borderRadius: 'var(--radius-md)',
        marginBottom: '1rem'
    };

    return (
        <div style={containerStyle}>
            <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Contact Us</h1>
            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                We'd love to hear from you. Send us a message!
            </p>

            <div style={gridStyle}>
                <div style={cardStyle}>
                    <h2 style={{ marginBottom: '1.5rem' }}>Get in Touch</h2>
                    
                    {submitted && (
                        <div style={{
                            backgroundColor: '#f0fdf4',
                            color: '#16a34a',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: '1rem',
                            textAlign: 'center'
                        }}>
                            Message sent successfully! We'll get back to you soon.
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Your name"
                                style={inputStyle}
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="your@email.com"
                                style={inputStyle}
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Subject</label>
                            <input
                                type="text"
                                name="subject"
                                required
                                placeholder="How can we help?"
                                style={inputStyle}
                                value={formData.subject}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
                            <textarea
                                name="message"
                                required
                                placeholder="Your message..."
                                style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }}
                                value={formData.message}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <Send size={18} />
                            Send Message
                        </button>
                    </form>
                </div>

                <div>
                    <div style={cardStyle}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Contact Information</h2>
                        
                        <div style={infoItemStyle}>
                            <Mail size={24} style={{ color: 'var(--color-primary)' }} />
                            <div>
                                <div style={{ fontWeight: 600 }}>Email</div>
                                <div style={{ color: 'var(--color-text-secondary)' }}>amitdyavanal342@gmail.com</div>
                                <div style={{ color: 'var(--color-text-secondary)' }}>Varunb@gmail.com</div>
                            </div>
                        </div>

                        <div style={infoItemStyle}>
                            <Phone size={24} style={{ color: 'var(--color-primary)' }} />
                            <div>
                                <div style={{ fontWeight: 600 }}>Phone</div>
                                <div style={{ color: 'var(--color-text-secondary)' }}>(+91) 8618378779</div>
                                <div style={{ color: 'var(--color-text-secondary)' }}>(+91) 9591282452</div>
                            </div>
                        </div>

                        <div style={infoItemStyle}>
                            <MapPin size={24} style={{ color: 'var(--color-primary)' }} />
                            <div>
                                <div style={{ fontWeight: 600 }}>Address</div>
                                <div style={{ color: 'var(--color-text-secondary)' }}>Beside Saralaya Hospital, Near Reva Circle, Bagalur Main Road, Kattigenahalli, Sathanur, Bengaluru - 560063</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ ...cardStyle, marginTop: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Business Hours</h3>
                        <div style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                            <div><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</div>
                            <div><strong>Saturday:</strong> 10:00 AM - 4:00 PM</div>
                            <div><strong>Sunday:</strong> Closed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
