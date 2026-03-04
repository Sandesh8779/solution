import React, { useState } from 'react';
import { CheckCircle, Users, Shield, Clock, Award, Target, Zap, Home, Wrench, Droplet, Hammer, Paintbrush, Sparkles, Flame, Mail, Phone, MapPin, Send, Wind, Tv, Refrigerator, WashingMachine, Fan } from 'lucide-react';
import { createContactMessage } from '../services/supabase';
import './AboutUs.css';

const AboutUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [currentMessage, setCurrentMessage] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const whyChooseRef = React.useRef(null);

    const messages = [
        { text: 'Stay connected with us for your Solution!❤️', gradient: 'linear-gradient(135deg, #002f34 0%, #004d56 100%)' },
        { text: 'Thank you for visiting our Site..🙏', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessage(prev => (prev + 1) % messages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    React.useEffect(() => {
        const stepInterval = setInterval(() => {
            setActiveStep(prev => (prev + 1) % 4);
        }, 1500);
        return () => clearInterval(stepInterval);
    }, []);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (whyChooseRef.current) {
            observer.observe(whyChooseRef.current);
        }

        return () => {
            if (whyChooseRef.current) {
                observer.unobserve(whyChooseRef.current);
            }
        };
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Save to database
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

    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Hero Section */}
            <section id="about-solution" style={{
                background: 'linear-gradient(-45deg, var(--color-primary), var(--color-primary-hover), #3b82f6, #8b5cf6)',
                color: 'white',
                padding: '4rem 1rem',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: window.innerWidth <= 768 ? '2rem' : '3rem', marginBottom: '1rem' }}>About Solution For U</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}>
                        Your trusted partner for professional home services and maintenance solutions
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="container" style={{ padding: '4rem 1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Our Mission</h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                            At Solution For U, we bridge the gap between homeowners and skilled professionals. Our platform is designed to make home maintenance effortless, reliable, and affordable.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                            We believe everyone deserves access to quality home services without the hassle of endless searching. That's why we've created a seamless platform connecting you with verified, experienced professionals in your area.
                        </p>
                        <div style={{ backgroundColor: '#f0f9ff', padding: '1.5rem', borderRadius: '12px', marginTop: '1.5rem', border: '2px solid var(--color-primary)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                <Clock size={24} style={{ color: 'var(--color-primary)' }} />
                                <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', margin: 0 }}>Worker Availability</h3>
                            </div>
                            <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#1f2937', marginBottom: '0.5rem' }}>
                                <strong>Service Hours:</strong> Monday to Saturday, 8:00 AM - 6:00 PM
                            </p>
                            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--color-text-secondary)' }}>
                                Our dedicated team of professionals is available during these hours to provide you with prompt and efficient service. For emergency services, please contact our support team.
                            </p>
                        </div>
                    </div>
                    <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '1.5rem' }}>
                        <h3 style={{ color: 'white', textAlign: 'center', marginBottom: '1rem', fontSize: '1.3rem' }}>Our Services</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem' }}>
                            {[
                                { emoji: '💡', title: 'Electrical' },
                                { emoji: '🚰', title: 'Plumbing' },
                                { emoji: '🪚', title: 'Carpentry' },
                                { emoji: '🖌️', title: 'Painting' },
                                { emoji: '✨', title: 'Cleaning' },
                                { emoji: '🔥', title: 'Gas Pipeline' },
                                { emoji: '❄️', title: 'AC Repair' },
                                { emoji: '🔧', title: 'Appliance' },
                                { emoji: '🏠', title: 'Home Repair' },
                                { emoji: '📺', title: 'Electronics' },
                                { emoji: '🛡️', title: 'Security' },
                                { emoji: '➕', title: 'More...' }
                            ].map((service, idx) => (
                                <div key={idx} style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '8px', padding: '0.8rem', textAlign: 'center', transition: 'transform 0.3s', cursor: 'pointer' }}>
                                    <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>
                                        {service.emoji}
                                    </div>
                                    <p style={{ fontSize: '0.7rem', fontWeight: '600', color: '#1f2937' }}>{service.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section ref={whyChooseRef} style={{ backgroundColor: 'var(--color-bg-primary)', padding: '4rem 1rem' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '3rem' }}>Why Choose Us</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(4, 1fr)', gap: '2rem' }}>
                        <div className={`why-choose-card ${isVisible ? 'visible' : ''}`} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', textAlign: 'center' }}>
                            <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'white' }}>
                                <Shield size={30} />
                            </div>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Verified Professionals</h3>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                                All our service providers are thoroughly vetted, background-checked, and verified to ensure your safety and satisfaction.
                            </p>
                        </div>

                        <div className={`why-choose-card ${isVisible ? 'visible' : ''}`} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', textAlign: 'center' }}>
                            <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'white' }}>
                                <Clock size={30} />
                            </div>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Quick Response</h3>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                                Get instant quotes and same-day service availability. We understand your time is valuable and emergencies can't wait.
                            </p>
                        </div>

                        <div className={`why-choose-card ${isVisible ? 'visible' : ''}`} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', textAlign: 'center' }}>
                            <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'white' }}>
                                <Award size={30} />
                            </div>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Quality Guaranteed</h3>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                                We stand behind every service with our satisfaction guarantee. If you're not happy, we'll make it right.
                            </p>
                        </div>

                        <div className={`why-choose-card ${isVisible ? 'visible' : ''}`} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', textAlign: 'center' }}>
                            <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'white' }}>
                                <Users size={30} />
                            </div>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>24/7 Support</h3>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                                Our dedicated support team is available round the clock to assist you with any queries or concerns.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Offer */}
            <section className="container" style={{ padding: '4rem 1rem' }}>
                <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '3rem' }}>Comprehensive Home Services</h2>
                <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
                    {[
                        { icon: <Zap size={24} />, title: 'Electrical Services', desc: 'Licensed electricians for installations, repairs, and maintenance' },
                        { icon: <Droplet size={24} />, title: 'Plumbing Solutions', desc: 'Expert plumbers for leaks, installations, and emergency repairs' },
                        { icon: <Hammer size={24} />, title: 'Carpenter Work', desc: 'Skilled carpenters for furniture, repairs, and custom woodwork' },
                        { icon: <Paintbrush size={24} />, title: 'Painting Services', desc: 'Professional painters for interior and exterior projects' },
                        { icon: <Sparkles size={24} />, title: 'Cleaning Services', desc: 'Thorough cleaning for homes, offices, and specialized areas' },
                        { icon: <Flame size={24} />, title: 'Gas Pipeline Services', desc: 'Certified technicians for gas line installation and repairs' }
                    ].map((service, index) => (
                        <div key={index} className="service-card-hover" style={{ display: 'flex', gap: '1rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)', transition: 'all 0.3s ease', cursor: 'pointer' }}>
                            <div style={{ color: 'var(--color-primary)', flexShrink: 0, transition: 'transform 0.3s ease' }}>
                                {service.icon}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', transition: 'color 0.3s ease' }}>{service.title}</h3>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>{service.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '3rem 1rem' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }}>
                        <div>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>150+</h3>
                            <p style={{ opacity: 0.9 }}>Happy Customers</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>25+</h3>
                            <p style={{ opacity: 0.9 }}>Verified Professionals</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>500+</h3>
                            <p style={{ opacity: 0.9 }}>Services Completed</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>4.8/5</h3>
                            <p style={{ opacity: 0.9 }}>Average Rating</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="container" style={{ padding: '4rem 1rem' }}>
                <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '3rem' }}>How It Works</h2>
                <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(4, 1fr)', gap: '2rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div className={`how-it-works-circle ${activeStep === 0 ? 'active' : ''} ${activeStep > 0 ? 'completed' : ''}`}>
                            1
                        </div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Choose Your Service</h3>
                        <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                            Browse our wide range of home services and select what you need
                        </p>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <div className={`how-it-works-circle ${activeStep === 1 ? 'active' : ''} ${activeStep > 1 ? 'completed' : ''}`}>
                            2
                        </div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Get Matched</h3>
                        <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                            We connect you with verified professionals in your area instantly
                        </p>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <div className={`how-it-works-circle ${activeStep === 2 ? 'active' : ''} ${activeStep > 2 ? 'completed' : ''}`}>
                            3
                        </div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Relax & Enjoy</h3>
                        <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                            Sit back while our professionals deliver quality service at your doorstep
                        </p>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <div className={`how-it-works-circle ${activeStep === 3 ? 'active' : ''}`}>
                            4
                        </div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Pay After Work</h3>
                        <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                            Pay only after the work is completed to your satisfaction
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Us Section */}
            <section className="about-contact-section" id="contact">
                <div className="about-contact-container">
                    <div className="about-contact-content">
                        <div className="about-contact-left">
                            <h1 className="about-contact-heading">Get In Touch</h1>
                            <p className="about-contact-subheading">For any support or inquiries, please contact our partner support team :</p>
                            
                            <div className="about-contact-info-cards">
                                <div className="about-info-card">
                                    <div className="about-icon-wrapper">
                                        <Phone size={24} />
                                    </div>
                                    <div className="about-info-content">
                                        <h3>Phone</h3>
                                        <p>(+91) 8618378779</p>
                                        <p>(+91) 9591282452</p>
                                    </div>
                                </div>

                                <div className="about-info-card">
                                    <div className="about-icon-wrapper">
                                        <Mail size={24} />
                                    </div>
                                    <div className="about-info-content">
                                        <h3>Email</h3>
                                        <a href="mailto:amitdyavanal342@gmail.com">amitdyavanal342@gmail.com</a>
                                        <a href="mailto:Varunb@gmail.com">varunvarunb2@gmail.com</a>
                                    </div>
                                </div>

                                <div className="about-info-card">
                                    <div className="about-icon-wrapper">
                                        <MapPin size={24} />
                                    </div>
                                    <div className="about-info-content">
                                        <h3>Address</h3>
                                        <p>Beside Saralaya Hospital, Near Reva Circle, Bagalur Main Road, Kattigenahalli, Sathanur, Bengaluru - 560063</p>
                                    </div>
                                </div>

                                <div className="about-info-card">
                                    <div className="about-icon-wrapper">
                                        <Clock size={24} />
                                    </div>
                                    <div className="about-info-content">
                                        <h3>Business Hours</h3>
                                        <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</p>
                                        <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM</p>
                                        <p><strong>Sunday:</strong> Closed</p>
                                    </div>
                                </div>

                                <div className="about-stay-connected-card" style={{ background: messages[currentMessage].gradient }}>
                                    <p>{messages[currentMessage].text}</p>
                                </div>
                            </div>
                        </div>

                        <div className="about-contact-right">
                            <div className="about-contact-image-wrapper">
                                <img 
                                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop" 
                                    alt="Business Team" 
                                    className="about-contact-top-image"
                                />
                            </div>
                            
                            <div className="about-contact-form-card">
                                <h2>Send us a message</h2>
                                
                                {submitted && (
                                    <div className="about-success-message">
                                        Message sent successfully! We'll get back to you soon.
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="about-contact-form">
                                    <div>
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            placeholder="Your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="your@email.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label>Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            required
                                            placeholder="How can we help?"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label>Message</label>
                                        <textarea
                                            name="message"
                                            required
                                            placeholder="Your message..."
                                            value={formData.message}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <button type="submit" className="about-submit-btn">
                                        <Send size={18} />
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
