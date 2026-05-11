import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Clock, CheckCircle, Search, Calendar, MapPin, Star, User, Phone, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';
import { getWorkers, getRequests, rateRequest } from '../services/supabase';

const ratingLabels = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent' };

const statusConfig = {
    approved:        { color: '#10b981', bg: '#d1fae5', label: 'Completed',       icon: CheckCircle },
    completed:       { color: '#f59e0b', bg: '#fef3c7', label: 'Pending Approval', icon: Clock },
    accepted:        { color: '#3b82f6', bg: '#dbeafe', label: 'In Progress',      icon: Clock },
    assigned:        { color: '#8b5cf6', bg: '#ede9fe', label: 'Worker Assigned',  icon: User },
    pending:         { color: '#f59e0b', bg: '#fef3c7', label: 'Pending',          icon: Clock },
};

const getStatus = (req) => {
    if (req.verification_status === 'approved') return statusConfig.approved;
    return statusConfig[req.status] || statusConfig.pending;
};

const StarRating = ({ requestId, currentRating, onRate, submitting }) => {
    const [hovered, setHovered] = useState(0);
    if (currentRating) {
        return (
            <div style={{ textAlign: 'center', padding: '0.75rem' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>🎉</div>
                <p style={{ margin: '0 0 0.3rem 0', fontWeight: 700, color: '#92400e', fontSize: '0.95rem' }}>Thank You for Your Feedback!</p>
                <p style={{ margin: '0 0 0.6rem 0', color: '#78350f', fontSize: '0.8rem' }}>Your review helps us maintain the highest quality of service.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3px', marginBottom: '0.3rem' }}>
                    {[1,2,3,4,5].map(s => <Star key={s} size={20} fill={currentRating >= s ? '#f59e0b' : 'none'} color='#f59e0b' />)}
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#92400e' }}>{ratingLabels[currentRating]} · {currentRating}/5</span>
            </div>
        );
    }
    return (
        <div>
            <p style={{ margin: '0 0 0.2rem 0', fontWeight: 700, color: '#92400e', fontSize: '0.9rem' }}>Rate this Service</p>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.78rem', color: '#78350f' }}>How satisfied are you with the work done?</p>
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                {[1,2,3,4,5].map(star => (
                    <Star key={star} size={26}
                        style={{ cursor: submitting ? 'not-allowed' : 'pointer', transition: 'transform 0.15s', transform: hovered >= star ? 'scale(1.25)' : 'scale(1)' }}
                        fill={hovered >= star ? '#f59e0b' : 'none'} color='#f59e0b'
                        onMouseEnter={() => !submitting && setHovered(star)}
                        onMouseLeave={() => !submitting && setHovered(0)}
                        onClick={() => !submitting && onRate(requestId, star)}
                    />
                ))}
                {hovered > 0 && <span style={{ marginLeft: '4px', color: '#92400e', fontWeight: 600, fontSize: '0.82rem' }}>{ratingLabels[hovered]}</span>}
            </div>
            {submitting && <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.78rem', color: '#92400e' }}>Saving...</p>}
        </div>
    );
};

const UserDashboard = () => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [workers, setWorkers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);
    const [modalPhoto, setModalPhoto] = useState(null);
    const [submittingRating, setSubmittingRating] = useState(null);

    useEffect(() => {
        if (!user) return;
        Promise.all([getRequests(), getWorkers()])
            .then(([reqs, wrks]) => {
                const cachedRatings = JSON.parse(localStorage.getItem(`sfu_ratings_${user.id}`) || '{}');
                const merged = reqs.map(r => ({ ...r, user_rating: r.user_rating || cachedRatings[r.id] || null }));
                setRequests(merged);
                setWorkers(wrks);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [user]);

    const handleRate = async (requestId, rating) => {
        setSubmittingRating(requestId);
        const cachedRatings = JSON.parse(localStorage.getItem(`sfu_ratings_${user.id}`) || '{}');
        cachedRatings[requestId] = rating;
        localStorage.setItem(`sfu_ratings_${user.id}`, JSON.stringify(cachedRatings));
        setRequests(prev => prev.map(r => r.id === requestId ? { ...r, user_rating: rating } : r));
        try { await rateRequest(requestId, rating); } catch (err) { console.error('Rating DB error:', err.message); }
        setSubmittingRating(null);
    };

    if (!user) return <div className="container" style={{ padding: '2rem' }}>Please login</div>;
    if (user.role === 'admin') { window.location.href = '/admin'; return null; }
    if (loading) return <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

    const myRequests = requests.filter(r => r.user_id === user.id);
    const filteredRequests = myRequests.filter(req =>
        req.service_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const completedCount = myRequests.filter(r => r.verification_status === 'approved').length;
    const pendingCount = myRequests.filter(r => r.status === 'pending' || r.status === 'assigned').length;
    const inProgressCount = myRequests.filter(r => r.status === 'accepted').length;

    return (
        <div className="container" style={{ padding: window.innerWidth <= 768 ? '1rem 0.5rem' : '2rem 1rem' }}>

            {/* Header */}
            <div style={{ marginBottom: '1.5rem' }}>
                <h1 style={{ marginBottom: '0.25rem', fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem' }}>My Requests</h1>
                <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>Track and manage your service requests</p>
            </div>

            {/* Summary Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                    { label: 'Total', value: myRequests.length, color: '#3b82f6', bg: '#dbeafe' },
                    { label: 'In Progress', value: inProgressCount + pendingCount, color: '#f59e0b', bg: '#fef3c7' },
                    { label: 'Completed', value: completedCount, color: '#10b981', bg: '#d1fae5' },
                ].map(stat => (
                    <div key={stat.label} style={{ backgroundColor: 'white', padding: '1rem', borderRadius: 'var(--radius-lg)', border: `1px solid ${stat.bg}`, textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ fontSize: '1.8rem', fontWeight: 700, color: stat.color }}>{stat.value}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Search */}
            {myRequests.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ position: 'relative', maxWidth: '400px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-secondary)' }} />
                        <input type="text" placeholder="Search by service, location..." value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', outline: 'none' }}
                        />
                    </div>
                </div>
            )}

            {/* Cards */}
            {myRequests.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                    <Briefcase size={48} style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem', opacity: 0.4 }} />
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>You haven't made any requests yet.</p>
                    <a href="/" className="btn btn-primary">Find a Service</a>
                </div>
            ) : filteredRequests.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>No requests match your search.</p>
                    <button onClick={() => setSearchTerm('')} className="btn btn-primary">Clear Search</button>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {filteredRequests.map((req) => {
                        const isExpanded = expandedId === req.id;
                        const isCompleted = req.verification_status === 'approved';
                        const worker = workers.find(w => w.id === req.worker_id);
                        const status = getStatus(req);
                        const StatusIcon = status.icon;

                        return (
                            <div key={req.id} style={{
                                backgroundColor: 'white',
                                borderRadius: 'var(--radius-lg)',
                                border: isCompleted ? '1.5px solid #10b981' : '1px solid var(--color-border)',
                                boxShadow: isExpanded ? '0 4px 16px rgba(0,0,0,0.1)' : 'var(--shadow-sm)',
                                overflow: 'hidden',
                                transition: 'box-shadow 0.2s'
                            }}>
                                {/* Compact Row — always visible */}
                                <div
                                    onClick={() => setExpandedId(isExpanded ? null : req.id)}
                                    style={{ padding: '1rem 1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', userSelect: 'none' }}
                                >
                                    {/* Service icon circle */}
                                    <div style={{ width: 42, height: 42, borderRadius: '50%', backgroundColor: status.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <StatusIcon size={18} color={status.color} />
                                    </div>

                                    {/* Main info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                            <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-primary)' }}>{req.service_type}</span>
                                            <span style={{ padding: '0.15rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontWeight: 600, backgroundColor: status.bg, color: status.color }}>
                                                {status.label}
                                            </span>
                                            {isCompleted && req.user_rating && (
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.78rem', color: '#92400e', fontWeight: 600 }}>
                                                    <Star size={12} fill='#f59e0b' color='#f59e0b' /> {req.user_rating}/5
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                <Calendar size={12} /> {req.date}
                                            </span>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                <MapPin size={12} /> {req.location}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Expand toggle */}
                                    <div style={{ color: 'var(--color-text-secondary)', flexShrink: 0 }}>
                                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {isExpanded && (
                                    <div style={{ borderTop: '1px solid var(--color-border)', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                                        {/* Work description */}
                                        <div style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--color-bg-primary)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem' }}>
                                            <strong>Work Description:</strong>
                                            <p style={{ margin: '0.3rem 0 0 0', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>"{req.details}"</p>
                                        </div>

                                        {/* Worker info — only for completed */}
                                        {isCompleted && worker && (
                                            <div style={{ backgroundColor: '#f0fdf4', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                                                <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--color-success)', fontSize: '0.95rem' }}>Worker Details</h4>
                                                <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr', gap: '0.5rem', fontSize: '0.88rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <User size={14} color="var(--color-success)" />
                                                        <span><strong>Name:</strong> {worker.name}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <Phone size={14} color="var(--color-success)" />
                                                        <span><strong>Phone:</strong> {worker.phone}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <CheckCircle size={14} color="var(--color-success)" />
                                                        <span><strong>Service:</strong> {worker.service_type}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Work photos */}
                                        {isCompleted && req.photos && req.photos.length > 0 && (
                                            <div>
                                                <h4 style={{ margin: '0 0 0.6rem 0', fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>Work Photos</h4>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.6rem' }}>
                                                    {req.photos.map((photo, i) => (
                                                        <img key={i}
                                                            src={`data:image/jpeg;base64,${photo}`}
                                                            alt={`Work photo ${i + 1}`}
                                                            onClick={() => setModalPhoto(`data:image/jpeg;base64,${photo}`)}
                                                            style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: '1px solid var(--color-border)' }}
                                                            onError={(e) => { e.target.style.display = 'none'; }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Rating */}
                                        {isCompleted && (
                                            <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                                                <StarRating
                                                    requestId={req.id}
                                                    currentRating={req.user_rating}
                                                    onRate={handleRate}
                                                    submitting={submittingRating === req.id}
                                                />
                                            </div>
                                        )}

                                        {/* Status info for non-completed */}
                                        {!isCompleted && (
                                            <div style={{ padding: '0.75rem 1rem', backgroundColor: status.bg, borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: status.color, fontWeight: 500 }}>
                                                {req.status === 'pending' && '⏳ Your request is waiting for a worker to be assigned.'}
                                                {req.status === 'assigned' && '👷 A worker has been assigned and will contact you soon.'}
                                                {req.status === 'accepted' && '🔧 Worker has accepted and work is in progress.'}
                                                {req.status === 'completed' && '✅ Work completed. Waiting for admin verification.'}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Photo modal */}
            {modalPhoto && (
                <div onClick={() => setModalPhoto(null)}
                    style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <img src={modalPhoto} alt="Work" style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: 'var(--radius-md)' }} onClick={e => e.stopPropagation()} />
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
