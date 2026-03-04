import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../services/mockData';

const Services = () => {
    const [searchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const searchQuery = searchParams.get('search');
        if (searchQuery) {
            setSearchTerm(searchQuery);
        }
    }, [searchParams]);

    const filteredServices = SERVICE_CATEGORIES.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Header Section */}
            <section style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)',
                color: 'white',
                padding: window.innerWidth <= 768 ? '2rem 1rem' : '4rem 1rem',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: window.innerWidth <= 768 ? '1.8rem' : '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
                        All Services
                    </h1>
                    <p style={{ fontSize: window.innerWidth <= 768 ? '1rem' : '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
                        Find the perfect professional for any home service you need
                    </p>
                </div>
            </section>

            {/* Search Section */}
            <section className="container" style={{ padding: '2rem 1rem' }}>
                <div style={{ maxWidth: '500px', margin: '0 auto 3rem auto' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={20} style={{ 
                            position: 'absolute', 
                            left: '1rem', 
                            top: '50%', 
                            transform: 'translateY(-50%)', 
                            color: 'var(--color-text-secondary)' 
                        }} />
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem 1rem 1rem 3rem',
                                border: '2px solid var(--color-border)',
                                borderRadius: 'var(--radius-lg)',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                        />
                    </div>
                </div>

                {/* Services Grid */}
                <div>
                    <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        {searchTerm ? `Search Results (${filteredServices.length})` : `All Services (${SERVICE_CATEGORIES.length})`}
                    </h2>
                    
                    {filteredServices.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
                            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                                No services found for "{searchTerm}"
                            </p>
                            <button 
                                onClick={() => setSearchTerm('')}
                                className="btn btn-primary"
                            >
                                Show All Services
                            </button>
                        </div>
                    ) : (
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: window.innerWidth <= 768 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
                            gap: '2rem' 
                        }}>
                            {filteredServices.map((service) => (
                                <Link 
                                    to={`/service/${service.id}`} 
                                    key={service.id} 
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: window.innerWidth <= 768 ? '1.5rem' : '2rem',
                                        backgroundColor: 'white',
                                        borderRadius: 'var(--radius-lg)',
                                        boxShadow: 'var(--shadow-md)',
                                        border: '1px solid var(--color-border)',
                                        transition: 'all 0.3s',
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                        color: 'inherit'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                    }}
                                >
                                    <div style={{
                                        width: window.innerWidth <= 768 ? 80 : 100,
                                        height: window.innerWidth <= 768 ? 80 : 100,
                                        borderRadius: 'var(--radius-md)',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <img 
                                            src={service.image} 
                                            alt={service.name}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </div>
                                    <h3 style={{ 
                                        fontSize: window.innerWidth <= 768 ? '1rem' : '1.1rem', 
                                        margin: 0, 
                                        textAlign: 'center' 
                                    }}>
                                        {service.name}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Services;