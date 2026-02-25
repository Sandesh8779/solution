import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Clock, CheckCircle, Search, Calendar, MapPin } from 'lucide-react';

const UserDashboard = () => {
    const { user } = useAuth();
    const { requests } = useData();
    const [searchTerm, setSearchTerm] = useState('');

    if (!user) return <div className="container" style={{ padding: '2rem' }}>Please login</div>;
    if (user.role === 'admin') {
        window.location.href = '/admin';
        return null;
    }

    const myRequests = requests.filter(r => r.user_id === user.id);
    
    const filteredRequests = myRequests.filter(req => 
        req.service_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status, verificationStatus) => {
        if (verificationStatus === 'approved') return 'var(--color-success)';
        if (status === 'completed') return 'var(--color-warning)';
        switch (status) {
            case 'pending': return 'var(--color-warning)';
            case 'assigned': return 'var(--color-primary)';
            case 'accepted': return 'var(--color-primary)';
            default: return 'var(--color-text-secondary)';
        }
    };

    const getStatusText = (status, verificationStatus, workerId) => {
        if (verificationStatus === 'approved') return 'completed';
        if (status === 'completed') return 'pending approval';
        if (status === 'accepted') return 'in progress';
        if (status === 'assigned' && workerId) return 'worker assigned';
        return 'pending';
    };

    return (
        <div className="container" style={{ padding: window.innerWidth <= 768 ? '1rem 0.5rem' : '2rem 1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexDirection: window.innerWidth <= 768 ? 'column' : 'row', gap: window.innerWidth <= 768 ? '1rem' : '0' }}>
                <div style={{ textAlign: window.innerWidth <= 768 ? 'center' : 'left' }}>
                    <h1 style={{ marginBottom: '0.5rem', fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem' }}>My Requests</h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: window.innerWidth <= 768 ? '0.9rem' : '1rem' }}>Track your service history</p>
                </div>
                <div style={{ padding: '0.5rem 1rem', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)', fontWeight: 500, fontSize: window.innerWidth <= 768 ? '0.9rem' : '1rem' }}>
                    {filteredRequests.length} of {myRequests.length} Requests
                </div>
            </div>

            {myRequests.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ position: 'relative', maxWidth: '400px' }}>
                        <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
                        <input
                            type="text"
                            placeholder="Search by service type (e.g., Plumber, Electrician, Painter, Cleaner)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem 0.75rem 3rem',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>
            )}

            {myRequests.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>You haven't made any requests yet.</p>
                    <a href="/" className="btn btn-primary">Find a Service</a>
                </div>
            ) : filteredRequests.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>No requests match your search.</p>
                    <button onClick={() => setSearchTerm('')} className="btn btn-primary">Clear Search</button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {filteredRequests.map((req) => (
                        <div key={req.id} style={{
                            backgroundColor: 'white',
                            padding: window.innerWidth <= 768 ? '1rem' : '1.5rem',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: 'var(--shadow-sm)',
                            border: '1px solid var(--color-border)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexDirection: window.innerWidth <= 768 ? 'column' : 'row', gap: window.innerWidth <= 768 ? '0.5rem' : '0' }}>
                                <h3 style={{ fontSize: window.innerWidth <= 768 ? '1.1rem' : '1.25rem', margin: 0 }}>{req.service_type}</h3>
                                <span style={{
                                    color: getStatusColor(req.status, req.verification_status),
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    textTransform: 'capitalize',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem'
                                }}>
                                    {req.verification_status === 'approved' ? <CheckCircle size={14} /> : <Clock size={14} />}
                                    {getStatusText(req.status, req.verification_status, req.worker_id)}
                                </span>
                            </div>

                            <div style={{ color: 'var(--color-text-secondary)', fontSize: window.innerWidth <= 768 ? '0.85rem' : '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calendar size={16} /> {req.date}
                                </p>
                                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <MapPin size={16} /> {req.location}
                                </p>
                                <p style={{ marginTop: '0.5rem', lineHeight: 1.4, color: 'var(--color-text-primary)' }}>
                                    "{req.details}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
