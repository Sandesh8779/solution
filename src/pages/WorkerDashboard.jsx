import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { getRequests, updateRequest } from '../services/supabase';
import { Calendar, MapPin, Phone, User, CheckCircle, Clock, BarChart3, FileText, Camera, Upload, CreditCard } from 'lucide-react';
import NotificationBanner from '../components/NotificationBanner';

const WorkerDashboard = () => {
    const { user } = useAuth();
    const { notifications, markAllAsRead, addNotification } = useNotifications();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRequests = async () => {
            try {
                const allRequests = await getRequests();
                const myRequests = allRequests.filter(r => r.worker_id === user?.id);
                setRequests(myRequests);
            } catch (error) {
                console.error('Error loading requests:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) loadRequests();
    }, [user]);

    const acceptRequest = async (requestId) => {
        try {
            await updateRequest(requestId, { 
                status: 'accepted',
                accepted_at: new Date().toISOString()
            });
            setRequests(prev => prev.map(r => 
                r.id === requestId ? {...r, status: 'accepted', accepted_at: new Date().toISOString()} : r
            ));
        } catch (error) {
            alert('Error accepting request');
        }
    };

    const rejectRequest = async (requestId) => {
        try {
            await updateRequest(requestId, { 
                status: 'rejected', 
                worker_id: null,
                rejected_at: new Date().toISOString()
            });
            setRequests(prev => prev.filter(r => r.id !== requestId));
            alert('Request rejected and returned to admin for reassignment');
        } catch (error) {
            alert('Error rejecting request');
        }
    };

    const completeRequest = async (requestId) => {
        try {
            await updateRequest(requestId, { 
                status: 'completed',
                completed_at: new Date().toISOString()
            });
            setRequests(prev => prev.map(r => 
                r.id === requestId ? {...r, status: 'completed', completed_at: new Date().toISOString()} : r
            ));
            // Redirect to completed work tab
            setActiveTab('completed');
        } catch (error) {
            alert('Error completing request');
        }
    };

    const handleFileUpload = async (requestId, files, type) => {
        try {
            // Check file size (limit to 10MB per file)
            const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
            for (const file of files) {
                if (file.size > MAX_FILE_SIZE) {
                    alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
                    return;
                }
            }

            // Check number of files
            if (files.length > 5) {
                alert('Maximum 5 files can be uploaded at a time.');
                return;
            }

            console.log(`Uploading ${files.length} ${type} for request ${requestId}`);
            
            const filePromises = Array.from(files).map(file => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const base64 = e.target.result.split(',')[1];
                        if (!base64) {
                            reject(new Error('Failed to convert file to base64'));
                            return;
                        }
                        resolve(base64);
                    };
                    reader.onerror = () => reject(new Error('Failed to read file'));
                    reader.readAsDataURL(file);
                });
            });
            
            const base64Files = await Promise.all(filePromises);
            console.log(`Converted ${base64Files.length} files to base64`);
            
            const updates = type === 'photos' ? { photos: base64Files } : { videos: base64Files };
            console.log('Sending update to database...');
            
            const result = await updateRequest(requestId, updates);
            console.log('Update result:', result);
            
            setRequests(prev => prev.map(r => 
                r.id === requestId ? {...r, ...updates} : r
            ));
            alert(`${type === 'photos' ? 'Photos' : 'Videos'} uploaded successfully!`);
        } catch (error) {
            console.error(`Error uploading ${type}:`, error);
            alert(`Error uploading ${type}: ${error.message || 'Please check if the database has photos/videos columns'}`);
        }
    };

    const submitForVerification = async (requestId) => {
        try {
            await updateRequest(requestId, { verification_status: 'submitted' });
            setRequests(prev => prev.map(r => 
                r.id === requestId ? {...r, verification_status: 'submitted'} : r
            ));
            alert('Work submitted for admin verification');
        } catch (error) {
            alert('Error submitting for verification');
        }
    };

    if (!user || user.role !== 'worker') {
        return <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>Access Denied</div>;
    }

    if (loading) {
        return <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
    }

    const stats = {
        pending: requests.filter(r => r.status === 'pending').length,
        accepted: requests.filter(r => r.status === 'accepted').length,
        completed: requests.filter(r => r.status === 'completed').length,
        total: requests.length
    };

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'pending', label: 'Pending Assignments', icon: Clock },
        { id: 'assigned', label: 'Assigned Work', icon: FileText },
        { id: 'completed', label: 'Completed Work', icon: CheckCircle },
        { id: 'subscription', label: 'Subscription', icon: CreditCard }
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', flexDirection: window.innerWidth <= 768 ? 'column' : 'row' }}>
            {/* Left Sidebar */}
            <div style={{
                width: window.innerWidth <= 768 ? '100%' : '250px',
                backgroundColor: 'var(--color-bg-secondary)',
                borderRight: window.innerWidth <= 768 ? 'none' : '1px solid var(--color-border)',
                borderBottom: window.innerWidth <= 768 ? '1px solid var(--color-border)' : 'none',
                padding: window.innerWidth <= 768 ? '0.5rem 0' : '2rem 0',
                overflowX: window.innerWidth <= 768 ? 'auto' : 'visible'
            }}>
                <div style={{ padding: window.innerWidth <= 768 ? '0 1rem' : '0 1.5rem', marginBottom: window.innerWidth <= 768 ? '1rem' : '2rem' }}>
                    <h2 style={{ color: 'var(--color-primary)', margin: 0, fontSize: window.innerWidth <= 768 ? '1.2rem' : '1.5rem' }}>Welcome</h2>
                    <p style={{ color: 'var(--color-text-primary)', margin: '0.5rem 0 0 0', fontSize: window.innerWidth <= 768 ? '1.1rem' : '1.3rem', fontWeight: 'bold' }}>{user.name}</p>
                </div>
                <nav style={{ display: window.innerWidth <= 768 ? 'flex' : 'block', gap: window.innerWidth <= 768 ? '0.5rem' : '0', padding: window.innerWidth <= 768 ? '0 1rem' : '0', overflowX: window.innerWidth <= 768 ? 'auto' : 'visible' }}>
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            style={{
                                width: window.innerWidth <= 768 ? 'auto' : '100%',
                                padding: window.innerWidth <= 768 ? '0.75rem 1rem' : '1rem 1.5rem',
                                border: 'none',
                                backgroundColor: activeTab === item.id ? 'var(--color-primary)' : 'transparent',
                                color: activeTab === item.id ? 'white' : 'var(--color-text-primary)',
                                textAlign: 'left',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: window.innerWidth <= 768 ? '0.5rem' : '0.75rem',
                                fontSize: window.innerWidth <= 768 ? '0.85rem' : '1rem',
                                transition: 'all 0.2s',
                                borderRadius: window.innerWidth <= 768 ? 'var(--radius-md)' : '0',
                                whiteSpace: 'nowrap',
                                minWidth: window.innerWidth <= 768 ? 'fit-content' : 'auto'
                            }}
                        >
                            <item.icon size={window.innerWidth <= 768 ? 16 : 20} />
                            {window.innerWidth <= 768 ? '' : item.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: window.innerWidth <= 768 ? '1rem' : '2rem' }}>
                {/* Notification Banner for Workers */}
                <NotificationBanner 
                    notifications={notifications} 
                    onDismiss={markAllAsRead}
                />
                
                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                    <div>
                        <h1 style={{ marginBottom: '2rem' }}>Work Analytics</h1>
                        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr 1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)' }}>
                                <h3 style={{ fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem', margin: 0, color: '#f59e0b' }}>{stats.pending}</h3>
                                <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: window.innerWidth <= 768 ? '0.8rem' : '1rem' }}>Pending Work</p>
                            </div>
                            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)' }}>
                                <h3 style={{ fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem', margin: 0, color: '#3b82f6' }}>{stats.accepted}</h3>
                                <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: window.innerWidth <= 768 ? '0.8rem' : '1rem' }}>Accepted Work</p>
                            </div>
                            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)' }}>
                                <h3 style={{ fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem', margin: 0, color: '#10b981' }}>{stats.completed}</h3>
                                <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: window.innerWidth <= 768 ? '0.8rem' : '1rem' }}>Completed Work</p>
                            </div>
                            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)' }}>
                                <h3 style={{ fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem', margin: 0, color: 'var(--color-primary)' }}>{stats.total}</h3>
                                <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: window.innerWidth <= 768 ? '0.8rem' : '1rem' }}>Total Requests</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pending Assignments Tab */}
                {activeTab === 'pending' && (
                    <div>
                        <h1 style={{ marginBottom: '1.5rem' }}>Pending Assignments</h1>
                        {requests.filter(r => r.worker_id === user?.id && r.status === 'assigned').length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                                <p style={{ color: 'var(--color-text-secondary)' }}>No pending assignments</p>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                {requests.filter(r => r.worker_id === user?.id && r.status === 'assigned').map((request) => (
                                    <div key={request.id} style={{
                                        backgroundColor: 'white',
                                        padding: '2rem',
                                        borderRadius: 'var(--radius-lg)',
                                        boxShadow: 'var(--shadow-md)',
                                        border: '1px solid var(--color-border)'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                                            <h3 style={{ margin: 0, color: 'var(--color-primary)', fontSize: '1.5rem' }}>{request.service_type}</h3>
                                            <span style={{
                                                padding: '0.5rem 1rem',
                                                borderRadius: 'var(--radius-full)',
                                                fontSize: '0.9rem',
                                                fontWeight: 'bold',
                                                backgroundColor: '#fef3c7',
                                                color: '#92400e'
                                            }}>
                                                Pending Response
                                            </span>
                                        </div>

                                        <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--color-bg-primary)', borderRadius: 'var(--radius-md)' }}>
                                            <strong>Problem Description:</strong>
                                            <p style={{ margin: '0.5rem 0 0 0' }}>{request.details}</p>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Calendar size={18} />
                                                <span>Date: {request.date}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <MapPin size={18} />
                                                <span>Location: {request.location}</span>
                                            </div>
                                        </div>

                                        <div style={{ padding: '1rem', backgroundColor: '#fef3c7', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                                            <p style={{ margin: 0, color: '#92400e', fontSize: '0.9rem' }}>
                                                <strong>Note:</strong> Customer contact details will be revealed after you accept this request.
                                            </p>
                                        </div>

                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <button 
                                                onClick={() => acceptRequest(request.id)}
                                                className="btn btn-primary"
                                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                            >
                                                <CheckCircle size={18} />
                                                Accept Request
                                            </button>
                                            <button 
                                                onClick={() => rejectRequest(request.id)}
                                                className="btn"
                                                style={{ 
                                                    backgroundColor: 'var(--color-error)', 
                                                    color: 'white',
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    gap: '0.5rem' 
                                                }}
                                            >
                                                Reject Request
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Assigned Work Tab */}
                {activeTab === 'assigned' && (
                    <div>
                        <h1 style={{ marginBottom: '1.5rem' }}>Assigned Work</h1>
                        {requests.filter(r => r.worker_id === user?.id && r.status === 'accepted').length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                                <p style={{ color: 'var(--color-text-secondary)' }}>No assigned work</p>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                {requests.filter(r => r.worker_id === user?.id && r.status === 'accepted').map((request) => (
                                    <div key={request.id} style={{
                                        backgroundColor: 'white',
                                        padding: '2rem',
                                        borderRadius: 'var(--radius-lg)',
                                        boxShadow: 'var(--shadow-md)',
                                        border: '1px solid var(--color-border)'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                                            <h3 style={{ margin: 0, color: 'var(--color-primary)', fontSize: '1.5rem' }}>{request.service_type}</h3>
                                            <span style={{
                                                padding: '0.5rem 1rem',
                                                borderRadius: 'var(--radius-full)',
                                                fontSize: '0.9rem',
                                                fontWeight: 'bold',
                                                backgroundColor: '#dbeafe',
                                                color: '#1e40af'
                                            }}>
                                                Accepted
                                            </span>
                                        </div>

                                        <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--color-bg-primary)', borderRadius: 'var(--radius-md)' }}>
                                            <strong>Problem Description:</strong>
                                            <p style={{ margin: '0.5rem 0 0 0' }}>{request.details}</p>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Calendar size={18} />
                                                <span>Date: {request.date}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <MapPin size={18} />
                                                <span>Location: {request.location}</span>
                                            </div>
                                        </div>

                                        {request.status === 'accepted' ? (
                                            <div style={{ padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                                                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-primary)' }}>Customer Contact Details</h4>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <User size={16} />
                                                        <span>{request.name}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <Phone size={16} />
                                                        <span>{request.phone}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null}

                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            {request.status === 'accepted' && (
                                                <button 
                                                    onClick={() => completeRequest(request.id)}
                                                    className="btn"
                                                    style={{ 
                                                        backgroundColor: 'var(--color-success)', 
                                                        color: 'white',
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        gap: '0.5rem' 
                                                    }}
                                                >
                                                    <CheckCircle size={18} />
                                                    Mark Complete
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Subscription Tab */}
                {activeTab === 'subscription' && (
                    <div>
                        <h1 style={{ marginBottom: '1.5rem' }}>Subscription Plans</h1>
                        <p style={{ marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>Choose a plan that works best for you</p>
                        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                            {[
                                { duration: '1 Month', price: 199, color: '#3b82f6' },
                                { duration: '3 Months', price: 449, color: '#8b5cf6', badge: 'Save ₹150' },
                                { duration: '6 Months', price: 999, color: '#ec4899', badge: 'Save ₹200' },
                                { duration: '1 Year', price: 1799, color: '#10b981', badge: 'Best Value' }
                            ].map((plan) => (
                                <div key={plan.duration} style={{
                                    backgroundColor: 'white',
                                    padding: '2rem',
                                    borderRadius: 'var(--radius-lg)',
                                    boxShadow: 'var(--shadow-md)',
                                    border: `2px solid ${plan.color}`,
                                    position: 'relative',
                                    transition: 'transform 0.2s',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    {plan.badge && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '-12px',
                                            right: '20px',
                                            backgroundColor: plan.color,
                                            color: 'white',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: 'var(--radius-full)',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold'
                                        }}>
                                            {plan.badge}
                                        </div>
                                    )}
                                    <h3 style={{ margin: '0 0 0.5rem 0', color: plan.color, fontSize: '1.5rem' }}>{plan.duration}</h3>
                                    <div style={{ margin: '1.5rem 0' }}>
                                        <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>₹{plan.price}</span>
                                    </div>
                                    <button 
                                        onClick={() => alert(`Subscribing to ${plan.duration} plan for ₹${plan.price}`)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            backgroundColor: plan.color,
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: 'var(--radius-md)',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            fontSize: '1rem'
                                        }}
                                    >
                                        Subscribe Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Completed Work Tab */}
                {activeTab === 'completed' && (
                    <div>
                        <h1 style={{ marginBottom: '1.5rem' }}>Completed Work</h1>
                        {requests.filter(r => r.status === 'completed' && r.verification_status !== 'approved').length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                                <p style={{ color: 'var(--color-text-secondary)' }}>No completed work yet</p>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                {requests.filter(r => r.status === 'completed' && r.verification_status !== 'approved').map((request) => (
                                    <div key={request.id} style={{
                                        backgroundColor: 'white',
                                        padding: '2rem',
                                        borderRadius: 'var(--radius-lg)',
                                        boxShadow: 'var(--shadow-md)',
                                        border: '1px solid var(--color-border)'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                                            <h3 style={{ margin: 0, color: 'var(--color-success)', fontSize: '1.5rem' }}>{request.service_type}</h3>
                                            <span style={{
                                                padding: '0.5rem 1rem',
                                                borderRadius: 'var(--radius-full)',
                                                fontSize: '0.9rem',
                                                fontWeight: 'bold',
                                                backgroundColor: '#d1fae5',
                                                color: '#065f46'
                                            }}>
                                                Completed
                                            </span>
                                        </div>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <p><strong>Customer:</strong> {request.name}</p>
                                            <p><strong>Date:</strong> {request.date}</p>
                                            <p><strong>Location:</strong> {request.location}</p>
                                        </div>

                                        <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--color-bg-primary)', borderRadius: 'var(--radius-md)' }}>
                                            <strong>Work Details:</strong>
                                            <p style={{ margin: '0.5rem 0 0 0' }}>{request.details}</p>
                                        </div>

                                        <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: 'var(--radius-md)' }}>
                                            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-success)' }}>Upload Work Photos/Videos</h4>
                                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                                <label style={{
                                                    padding: '0.75rem 1rem',
                                                    backgroundColor: 'var(--color-success)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: 'var(--radius-md)',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem'
                                                }}>
                                                    <Camera size={18} />
                                                    Add Photos
                                                    <input 
                                                        type="file" 
                                                        accept="image/*" 
                                                        multiple 
                                                        style={{ display: 'none' }}
                                                        onChange={(e) => handleFileUpload(request.id, e.target.files, 'photos')}
                                                    />
                                                </label>
                                                <label style={{
                                                    padding: '0.75rem 1rem',
                                                    backgroundColor: 'var(--color-primary)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: 'var(--radius-md)',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem'
                                                }}>
                                                    <Upload size={18} />
                                                    Add Videos
                                                    <input 
                                                        type="file" 
                                                        accept="video/*" 
                                                        multiple 
                                                        style={{ display: 'none' }}
                                                        onChange={(e) => handleFileUpload(request.id, e.target.files, 'videos')}
                                                    />
                                                </label>
                                            </div>
                                            {(request.photos && request.photos.length > 0) || (request.videos && request.videos.length > 0) ? (
                                                request.verification_status === 'submitted' ? (
                                                    <p style={{ color: 'var(--color-warning)', fontStyle: 'italic', fontWeight: 'bold' }}>
                                                        Work submitted for admin verification - waiting for approval
                                                    </p>
                                                ) : (
                                                    <button 
                                                        onClick={() => submitForVerification(request.id)}
                                                        style={{
                                                            padding: '0.75rem 1.5rem',
                                                            backgroundColor: 'var(--color-warning)',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: 'var(--radius-md)',
                                                            cursor: 'pointer',
                                                            fontWeight: 'bold'
                                                        }}
                                                    >
                                                        Submit for Verification
                                                    </button>
                                                )
                                            ) : (
                                                <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                                                    Upload photos or videos to submit for verification
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkerDashboard;