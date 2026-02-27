import React, { useState } from 'react';
import { Search, ArrowRight, Star } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../services/mockData';
import { Link } from 'react-router-dom';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    const heroTexts = [
        {
            title: "Expert Help for\nEvery Home Problem",
            subtitle: "Connect with top-rated local professionals for repairs, cleaning, and maintenance. Trusted by thousands of households."
        },
        {
            title: "Professional Services\nAt Your Doorstep",
            subtitle: "Get instant access to skilled workers for all your home maintenance needs. Quality service guaranteed."
        },
        {
            title: "Reliable Solutions\nFor Every Need",
            subtitle: "From electrical work to plumbing, painting to cleaning - we've got you covered with expert professionals."
        },
        {
            title: "Your Home Care\nExperts",
            subtitle: "Connecting homeowners with trusted professionals for quick, reliable, and affordable home services."
        }
    ];

    // Change text every 4 seconds
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Add CSS animation for gradient
    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            .hero-text {
                animation: fadeInUp 0.8s ease-out;
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    const heroStyle = {
        background: 'linear-gradient(-45deg, var(--color-primary), var(--color-primary-hover), #3b82f6, #8b5cf6)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 8s ease infinite',
        color: 'white',
        padding: window.innerWidth <= 768 ? '3rem 1rem' : '6rem 1rem',
        textAlign: 'center',
        borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
        marginBottom: window.innerWidth <= 768 ? '2rem' : '4rem',
        position: 'relative',
        overflow: 'hidden'
    };

    const searchContainerStyle = {
        display: 'flex',
        gap: '0.5rem',
        maxWidth: '600px',
        margin: '2rem auto 0',
        background: 'white',
        padding: '0.5rem',
        borderRadius: 'var(--radius-full)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        flexDirection: window.innerWidth <= 768 ? 'column' : 'row'
    };

    const inputStyle = {
        flex: 1,
        border: 'none',
        padding: window.innerWidth <= 768 ? '0.75rem 1rem' : '0.75rem 1.5rem',
        outline: 'none',
        fontSize: window.innerWidth <= 768 ? '0.9rem' : '1rem',
        borderRadius: 'var(--radius-full)'
    };

    return (
        <div>
            {/* Hero Section */}
            <section style={heroStyle}>
                <div className="container">
                    <h1 key={currentTextIndex} className="hero-text" style={{ fontSize: window.innerWidth <= 768 ? '2rem' : '3.5rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.1, color: 'white' }}>
                        {heroTexts[currentTextIndex].title.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                {index < heroTexts[currentTextIndex].title.split('\n').length - 1 && <br />}
                            </React.Fragment>
                        ))}
                    </h1>
                    <p key={`subtitle-${currentTextIndex}`} className="hero-text" style={{ fontSize: window.innerWidth <= 768 ? '1rem' : '1.25rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
                        {heroTexts[currentTextIndex].subtitle}
                    </p>

                    <div style={searchContainerStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '1rem', color: 'var(--color-text-secondary)' }}>
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="What do you need help with?"
                            style={inputStyle}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button 
                            className="btn btn-primary" 
                            style={{ borderRadius: 'var(--radius-full)', paddingInline: window.innerWidth <= 768 ? '1.5rem' : '2rem', width: window.innerWidth <= 768 ? '100%' : 'auto' }}
                            onClick={() => {
                                if (searchTerm.trim()) {
                                    // Filter categories based on search term
                                    const matchedCategories = SERVICE_CATEGORIES.filter(cat => 
                                        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
                                    );
                                    if (matchedCategories.length > 0) {
                                        // Navigate to first matched service
                                        window.location.href = `/service/${matchedCategories[0].id}`;
                                    } else {
                                        alert(`No services found for "${searchTerm}". Try searching for: Electrician, Plumber, Carpenter, Cleaner, Painter, Repair`);
                                    }
                                } else {
                                    alert('Please enter a service type to search');
                                }
                            }}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="container" style={{ paddingBottom: '4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2rem', flexDirection: window.innerWidth <= 768 ? 'column' : 'row', gap: window.innerWidth <= 768 ? '1rem' : '0' }}>
                    <div style={{ textAlign: window.innerWidth <= 768 ? 'center' : 'left' }}>
                        <h2 style={{ fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem', marginBottom: '0.5rem' }}>Popular Services</h2>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Most requested services near you</p>
                    </div>
                    <Link to="/services" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                        View all <ArrowRight size={16} />
                    </Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1.5rem' }}>
                    {SERVICE_CATEGORIES.filter(cat => 
                        ['carpenter', 'gas-pipeline', 'electrician', 'painter', 'plumber', 'tank-sump-cleaner'].includes(cat.id)
                    ).map((cat) => (
                        <Link to={`/service/${cat.id}`} key={cat.id} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: window.innerWidth <= 768 ? '1.5rem' : '2rem',
                            backgroundColor: 'white',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: 'var(--shadow-sm)',
                            border: '1px solid var(--color-border)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            color: 'inherit'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                            e.currentTarget.style.borderColor = 'var(--color-primary)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                            e.currentTarget.style.borderColor = 'var(--color-border)';
                        }}>
                            <div style={{
                                width: 80,
                                height: 80,
                                borderRadius: 'var(--radius-md)',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img 
                                    src={cat.image} 
                                    alt={cat.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{cat.name}</h3>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Workers Preview (Mock) */}
            <section style={{ backgroundColor: 'var(--color-bg-primary)', padding: '4rem 0' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '3rem' }}>Top Rated Professionals</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: 'var(--radius-lg)',
                            padding: '1.5rem',
                            boxShadow: 'var(--shadow-md)',
                            display: 'flex',
                            gap: '1rem'
                        }}>
                            <img 
                                src="https://tse3.mm.bing.net/th/id/OIP.pK8r8gXUJr7rC-f_Ik8AMQAAAA?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3" 
                                alt="Chinnu"
                                style={{ 
                                    width: 80, 
                                    height: 80, 
                                    borderRadius: 'var(--radius-md)', 
                                    objectFit: 'cover'
                                }}
                            />
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Chinnu</h3>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>Carpenter • 4 years exp</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-warning)' }}>
                                    <Star size={16} fill="currentColor" />
                                    <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>4.7</span>
                                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>(102 reviews)</span>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: 'var(--radius-lg)',
                            padding: '1.5rem',
                            boxShadow: 'var(--shadow-md)',
                            display: 'flex',
                            gap: '1rem'
                        }}>
                            <img 
                                src="https://www.bing.com/th/id/OIP.GNC-cPdoCOd0ByTNE9K55wHaHa?w=216&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" 
                                alt="Ammu"
                                style={{ 
                                    width: 80, 
                                    height: 80, 
                                    borderRadius: 'var(--radius-md)', 
                                    objectFit: 'cover'
                                }}
                            />
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Rash Bro</h3>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>Plumber • 3 years exp</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-warning)' }}>
                                    <Star size={16} fill="currentColor" />
                                    <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>4.6</span>
                                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>(89 reviews)</span>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: 'var(--radius-lg)',
                            padding: '1.5rem',
                            boxShadow: 'var(--shadow-md)',
                            display: 'flex',
                            gap: '1rem'
                        }}>
                            <img 
                                src="https://th.bing.com/th?q=Electrician+Working+Hard+Cartoon&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247" 
                                alt="Banu"
                                style={{ 
                                    width: 80, 
                                    height: 80, 
                                    borderRadius: 'var(--radius-md)', 
                                    objectFit: 'cover'
                                }}
                            />
                            <div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Ammu Bhai</h3>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>Electrician • 5 years exp</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-warning)' }}>
                                    <Star size={16} fill="currentColor" />
                                    <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>4.9</span>
                                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>(156 reviews)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
