import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/about') {
            if (location.hash === '#contact') {
                setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else if (location.hash === '#about-solution') {
                setTimeout(() => {
                    document.getElementById('about-solution')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    const handleAboutClick = (e) => {
        e.preventDefault();
        if (location.pathname === '/about') {
            document.getElementById('about-solution')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/about#about-solution');
        }
    };

    const handleContactClick = (e) => {
        e.preventDefault();
        if (location.pathname === '/about') {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/about#contact');
        }
    };
    const footerStyle = {
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid var(--color-border)',
        marginTop: 'auto'
    };

    const topSectionStyle = {
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '3rem 2rem',
        display: 'grid',
        gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(3, 1fr)',
        gap: '2rem'
    };

    const columnStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
    };

    const headingStyle = {
        fontWeight: '700',
        fontSize: '0.95rem',
        marginBottom: '0.5rem',
        color: 'var(--color-text-primary)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    };

    const linkStyle = {
        color: 'var(--color-text-secondary)',
        textDecoration: 'none',
        fontSize: '0.9rem',
        transition: 'color 0.2s',
        cursor: 'pointer'
    };

    const bottomSectionStyle = {
        backgroundColor: '#003f7f',
        padding: '2rem',
        color: 'white'
    };

    const bottomContentStyle = {
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
    };

    const socialIconStyle = {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'transform 0.2s'
    };

    const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad'];
    const services = ['Plumber', 'Electrician', 'Carpenter', 'Painter', 'Cleaning', 'AC Repair', 'Appliance Repair'];

    return (
        <footer style={footerStyle}>
            <div style={topSectionStyle}>
                <div style={columnStyle}>
                    <h3 style={headingStyle}>Popular Locations</h3>
                    {locations.slice(0, 4).map((location, idx) => (
                        <a key={idx} href={`https://www.google.com/maps/search/${location},+India`} target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>{location}</a>
                    ))}
                </div>

                <div style={columnStyle}>
                    <h3 style={headingStyle}>Trending Services</h3>
                    {services.slice(0, 4).map((service, idx) => (
                        <Link key={idx} to={`/services?search=${service}`} style={linkStyle} onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>{service}</Link>
                    ))}
                </div>

                <div style={columnStyle}>
                    <h3 style={headingStyle}>About Us</h3>
                    <Link to="/about#about-solution" onClick={handleAboutClick} style={linkStyle} onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>About Solution For U</Link>
                    <a href="/about#contact" onClick={handleContactClick} style={linkStyle} onMouseEnter={(e) => e.target.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>Contact Us</a>
                </div>
            </div>

            <div style={bottomSectionStyle}>
                <div style={bottomContentStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '0.9rem', color: '#ccc' }}>Follow Us</span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <div style={{ ...socialIconStyle, backgroundColor: '#1877f2' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                <Facebook size={20} />
                            </div>
                            <div style={{ ...socialIconStyle, background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                <Instagram size={20} />
                            </div>
                            <div style={{ ...socialIconStyle, backgroundColor: '#ff0000' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                <Youtube size={20} />
                            </div>
                            <div style={{ ...socialIconStyle, backgroundColor: '#000' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                <Twitter size={20} />
                            </div>
                            <div style={{ ...socialIconStyle, backgroundColor: '#25d366' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                            </div>
                            <div style={{ ...socialIconStyle, backgroundColor: '#0077b5' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                <Linkedin size={20} />
                            </div>
                        </div>
                    </div>

                    <div style={{ fontSize: '0.85rem', color: '#ccc' }}>
                        All rights reserved © 2026 Solution For U
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
