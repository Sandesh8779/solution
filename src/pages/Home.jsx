import React, { useState, useRef } from 'react';
import { Search, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../services/mockData';
import { Link } from 'react-router-dom';

const TestimonialsSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    const testimonials = [
        {
            id: 1,
            rating: 5,
            date: '23rd Jul',
            text: 'The platform is user-friendly and helps me find trusted service providers like electricians and plumbers quickly. Thank you!',
            name: 'Anjali G'
        },
        {
            id: 2,
            rating: 5,
            date: '5th Aug',
            text: 'This system makes booking home services very easy and fast. I can schedule a technician within minutes.',
            name: 'Shivani P'
        },
        {
            id: 3,
            rating: 5,
            date: '3rd Nov',
            text: 'The rating and review section helps me choose the best service provider based on other users’ experiences.',
            name: 'Suhas Motagi'
        },
        {
            id: 4,
            rating: 5,
            date: '15th Sep',
            text: 'Great platform for finding reliable professionals. The service quality exceeded my expectations!',
            name: 'Appu Veerabhadrappa'
        },
        {
            id: 5,
            rating: 4,
            date: '4th Jun',
            text: 'Quick response and professional service. Highly recommend for home repairs and maintenance.',
            name: 'Abhishek B'
        },
        {
            id: 6,
            rating: 5,
            date: '20th Sep',
            text: 'This website improves convenience, saves time, and provides a reliable platform for users to easily book and manage home services online.',
            name: 'Amaresh VD'
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
        }, 4000);
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
                        <p style={{ fontWeight: 600, color: '#111827', margin: 0, fontSize: '18px' }}>
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

const ProfessionalsSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    const professionals = [
        {
            id: 1,
            name: 'Sangayya H',
            role: 'Carpenter',
            experience: '3 years exp',
            rating: 4.7,
            reviews: 62,
            image: 'https://tse3.mm.bing.net/th/id/OIP.pK8r8gXUJr7rC-f_Ik8AMQAAAA?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3'
        },
        {
            id: 2,
            name: 'Vinayak P',
            role: 'Plumber',
            experience: '4 years exp',
            rating: 4.6,
            reviews: 89,
            image: 'https://www.bing.com/th/id/OIP.GNC-cPdoCOd0ByTNE9K55wHaHa?w=216&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'
        },
        {
            id: 3,
            name: 'Ankit T',
            role: 'Electrician',
            experience: '3 years exp',
            rating: 4.9,
            reviews: 56,
            image: 'https://th.bing.com/th?q=Electrician+Working+Hard+Cartoon&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247'
        },
        {
            id: 4,
            name: 'Manjunath B',
            role: 'Painter',
            experience: '2 years exp',
            rating: 4.8,
            reviews: 34,
            image: 'https://th.bing.com/th/id/OIP.gtWBWZYXPKW4SF6PLFJwwgHaHa?w=208&h=208&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
        },
        {
            id: 5,
            name: 'Akshaya',
            role: 'Cleaner',
            experience: '2 years exp',
            rating: 4.5,
            reviews: 28,
            image: 'https://th.bing.com/th/id/OIP.7-n5XDAL5mMcTzd-G3ydpAHaHa?w=163&h=150&c=6&o=7&dpr=1.3&pid=1.7&rm=3'
        },
        {
            id: 6,
            name: 'Basavaraj',
            role: 'AC Repair',
            experience: '1 years exp',
            rating: 4.9,
            reviews: 12,
            image: 'data:image/jpeg;base64,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'
        }
    ];

    const scroll = (direction) => {
        if (direction === 'left') {
            setCurrentIndex(prev => Math.max(0, prev - 1));
        } else {
            setCurrentIndex(prev => Math.min(professionals.length - 1, prev + 1));
        }
    };

    React.useEffect(() => {
        if (sliderRef.current) {
            const cardWidth = sliderRef.current.children[0]?.offsetWidth || 0;
            const gap = 32;
            sliderRef.current.scrollTo({
                left: currentIndex * (cardWidth + gap),
                behavior: 'smooth'
            });
        }
    }, [currentIndex]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => {
                if (prev >= professionals.length - 3) return 0;
                return prev + 1;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [professionals.length]);

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
                    gap: '32px',
                    overflowX: 'hidden',
                    scrollBehavior: 'smooth',
                    padding: '10px'
                }}
            >
                {professionals.map((pro) => (
                    <div
                        key={pro.id}
                        style={{
                            minWidth: window.innerWidth <= 768 ? '100%' : 'calc(33.333% - 22px)',
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '24px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            display: 'flex',
                            gap: '16px'
                        }}
                    >
                        <img
                            src={pro.image}
                            alt={pro.name}
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: '8px',
                                objectFit: 'cover'
                            }}
                        />
                        <div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{pro.name}</h3>
                            <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>{pro.role} • {pro.experience}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24' }}>
                                <Star size={16} fill="currentColor" />
                                <span style={{ fontWeight: 600, color: '#111827' }}>{pro.rating}</span>
                                <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>({pro.reviews} reviews)</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => scroll('right')}
                disabled={currentIndex >= professionals.length - 3}
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
                    cursor: currentIndex >= professionals.length - 3 ? 'not-allowed' : 'pointer',
                    opacity: currentIndex >= professionals.length - 3 ? 0.5 : 1,
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
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    if (searchTerm.trim()) {
                                        const matchedCategories = SERVICE_CATEGORIES.filter(cat => 
                                            cat.name.toLowerCase().includes(searchTerm.toLowerCase())
                                        );
                                        if (matchedCategories.length > 0) {
                                            window.location.href = `/service/${matchedCategories[0].id}`;
                                        } else {
                                            alert(`No services found for "${searchTerm}". Try searching for: Electrician, Plumber, Carpenter, Cleaner, Painter, Repair`);
                                        }
                                    } else {
                                        alert('Please enter a service type to search');
                                    }
                                }
                            }}
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

            {/* Testimonials Section */}
            <section style={{ backgroundColor: '#f8f9fa', padding: '4rem 0' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '3rem', fontWeight: 700 }}>What Our Users Say</h2>
                    <TestimonialsSlider />
                </div>
            </section>

            {/* Featured Workers Preview (Mock) */}
            <section style={{ backgroundColor: 'var(--color-bg-primary)', padding: '4rem 0' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '3rem', fontWeight: 700 }}>Top Rated Professionals</h2>
                    <ProfessionalsSlider />
                </div>
            </section>
        </div>
    );
};

export default Home;
