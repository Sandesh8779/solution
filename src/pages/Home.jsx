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

const ProfessionalsSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    const professionals = [
        {
            id: 1,
            name: 'Chinnu',
            role: 'Carpenter',
            experience: '4 years exp',
            rating: 4.7,
            reviews: 62,
            image: 'https://tse3.mm.bing.net/th/id/OIP.pK8r8gXUJr7rC-f_Ik8AMQAAAA?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3'
        },
        {
            id: 2,
            name: 'Rash Bro',
            role: 'Plumber',
            experience: '3 years exp',
            rating: 4.6,
            reviews: 89,
            image: 'https://www.bing.com/th/id/OIP.GNC-cPdoCOd0ByTNE9K55wHaHa?w=216&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'
        },
        {
            id: 3,
            name: 'Ammu Bhai',
            role: 'Electrician',
            experience: '5 years exp',
            rating: 4.9,
            reviews: 56,
            image: 'https://th.bing.com/th?q=Electrician+Working+Hard+Cartoon&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247'
        },
        {
            id: 4,
            name: 'Munna',
            role: 'Painter',
            experience: '6 years exp',
            rating: 4.8,
            reviews: 34,
            image: 'https://tse3.mm.bing.net/th/id/OIP.pK8r8gXUJr7rC-f_Ik8AMQAAAA?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3'
        },
        {
            id: 5,
            name: 'Akshu',
            role: 'Cleaner',
            experience: '2 years exp',
            rating: 4.5,
            reviews: 28,
            image: 'https://www.bing.com/th/id/OIP.GNC-cPdoCOd0ByTNE9K55wHaHa?w=216&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'
        },
        {
            id: 6,
            name: 'Basaya',
            role: 'AC Repair',
            experience: '7 years exp',
            rating: 4.9,
            reviews: 12,
            image: 'https://th.bing.com/th?q=Electrician+Working+Hard+Cartoon&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247'
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
        }, 2000);
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
