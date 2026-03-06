import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { getUsers, getWorkers, getRequests, assignWorkerToRequest, updateRequest, getContactMessages } from '../services/supabase';
import { FileText, Users, Calendar, MapPin, Phone, User, BarChart3, TrendingUp, Briefcase, CheckCircle, Eye, UserCheck, ClipboardCheck, MessageCircle, Mail, Clock } from 'lucide-react';
import NotificationBanner from '../components/NotificationBanner';

const AdminDashboard = () => {
    const { user } = useAuth();
    const { addNotification, notifications, markAllAsRead } = useNotifications();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [requests, setRequests] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, totalWorkers: 0, totalRequests: 0, pendingRequests: 0 });
    const [loading, setLoading] = useState(true);
    const [modalMedia, setModalMedia] = useState(null);
    const [contactMessages, setContactMessages] = useState([]);

    useEffect(() => {
        // Load contact messages from database when messages tab is active
        if (activeTab === 'messages') {
            getContactMessages().then(messages => {
                setContactMessages(messages);
            }).catch(error => {
                console.error('Error loading messages:', error);
            });
        }
    }, [activeTab]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [usersData, requestsData, workersData] = await Promise.all([
                    getUsers(),
                    getRequests(),
                    getWorkers()
                ]);
                setRequests(requestsData);
                setWorkers(workersData);
                setStats({
                    totalUsers: usersData.data?.length || 0,
                    totalWorkers: workersData.length || 0,
                    totalRequests: requestsData.length || 0,
                    pendingRequests: requestsData.filter(r => r.status === 'pending').length || 0
                });
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (!user || user.role !== 'admin') {
        return <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>Access Denied</div>;
    }

    if (loading) {
        return <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
    }

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'messages', label: 'Contact Messages', icon: MessageCircle, badge: contactMessages.length },
        { id: 'requests', label: 'User Requests', icon: FileText },
        { id: 'assignments', label: 'Work Assignments', icon: UserCheck },
        { id: 'verification', label: 'Work Verification', icon: CheckCircle },
        { id: 'completed', label: 'Completed Work', icon: ClipboardCheck },
        { id: 'service-completed', label: 'Service Completed ', icon: CheckCircle },
        { id: 'workers', label: 'Worker List', icon: User }
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'row' }}>
            {/* Left Sidebar */}
            <div style={{
                width: window.innerWidth <= 768 ? '200px' : '250px',
                backgroundColor: 'var(--color-bg-secondary)',
                borderRight: '1px solid var(--color-border)',
                padding: window.innerWidth <= 768 ? '1rem 0' : '2rem 0',
                overflowY: 'auto'
            }}>
                <h2 style={{ padding: window.innerWidth <= 768 ? '0 1rem' : '0 1.5rem', marginBottom: window.innerWidth <= 768 ? '1rem' : '2rem', color: 'var(--color-primary)', fontSize: window.innerWidth <= 768 ? '1.2rem' : '1.5rem' }}>Admin Panel</h2>
                <nav>
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            style={{
                                width: '100%',
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
                                position: 'relative'
                            }}
                        >
                            <item.icon size={window.innerWidth <= 768 ? 16 : 20} />
                            {item.label}
                            {item.badge > 0 && (
                                <span style={{
                                    marginLeft: 'auto',
                                    backgroundColor: '#ef4444',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '20px',
                                    height: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.7rem',
                                    fontWeight: 'bold'
                                }}>
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: window.innerWidth <= 768 ? '1rem' : '2rem', textAlign: 'left' }}>
                {/* Notification Banner */}
                {notifications.length > 0 && (
                    <NotificationBanner 
                        notifications={notifications}
                        onDismiss={markAllAsRead}
                    />
                )}
                
                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                    <div>
                        <h1 style={{ marginBottom: '2rem', textAlign: 'left' }}>Analytics Dashboard</h1>
                        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr 1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                            <div style={{ backgroundColor: 'white', padding: window.innerWidth <= 768 ? '1.5rem' : '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: window.innerWidth <= 768 ? 50 : 60, height: window.innerWidth <= 768 ? 50 : 60, borderRadius: '50%', backgroundColor: '#3b82f620', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                                    <Users size={window.innerWidth <= 768 ? 24 : 28} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem', margin: 0, color: '#3b82f6' }}>{stats.totalUsers}</h3>
                                    <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: window.innerWidth <= 768 ? '0.8rem' : '0.9rem' }}>Total Users</p>
                                </div>
                            </div>
                            <div style={{ backgroundColor: 'white', padding: window.innerWidth <= 768 ? '1.5rem' : '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: window.innerWidth <= 768 ? 50 : 60, height: window.innerWidth <= 768 ? 50 : 60, borderRadius: '50%', backgroundColor: '#10b98120', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                                    <Briefcase size={window.innerWidth <= 768 ? 24 : 28} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem', margin: 0, color: '#10b981' }}>{stats.totalWorkers}</h3>
                                    <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: window.innerWidth <= 768 ? '0.8rem' : '0.9rem' }}>Total Workers</p>
                                </div>
                            </div>
                            <div style={{ backgroundColor: 'white', padding: window.innerWidth <= 768 ? '1.5rem' : '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: window.innerWidth <= 768 ? 50 : 60, height: window.innerWidth <= 768 ? 50 : 60, borderRadius: '50%', backgroundColor: '#f59e0b20', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                                    <FileText size={window.innerWidth <= 768 ? 24 : 28} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem', margin: 0, color: '#f59e0b' }}>{stats.totalRequests}</h3>
                                    <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: window.innerWidth <= 768 ? '0.8rem' : '0.9rem' }}>Total Requests</p>
                                </div>
                            </div>
                            <div style={{ backgroundColor: 'white', padding: window.innerWidth <= 768 ? '1.5rem' : '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: window.innerWidth <= 768 ? 50 : 60, height: window.innerWidth <= 768 ? 50 : 60, borderRadius: '50%', backgroundColor: '#ef444420', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                                    <TrendingUp size={window.innerWidth <= 768 ? 24 : 28} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem', margin: 0, color: '#ef4444' }}>{stats.pendingRequests}</h3>
                                    <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: window.innerWidth <= 768 ? '0.8rem' : '0.9rem' }}>Pending Requests</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Contact Messages Tab */}
                {activeTab === 'messages' && (
                    <div>
                        <h1 style={{ marginBottom: '1.5rem', textAlign: 'left' }}>Contact Messages</h1>
                        {contactMessages.length === 0 ? (
                            <p style={{ textAlign: 'left', color: 'var(--color-text-secondary)' }}>No messages found</p>
                        ) : (
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {contactMessages.map((msg) => (
                                    <div key={msg.id} style={{
                                        padding: '1.5rem',
                                        backgroundColor: 'white',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: 'var(--radius-md)',
                                        boxShadow: 'var(--shadow-sm)'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                            <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>{msg.subject}</h3>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: 'var(--radius-full)',
                                                fontSize: '0.8rem',
                                                backgroundColor: '#dbeafe',
                                                color: '#1e40af'
                                            }}>
                                                {new Date(msg.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <User size={16} />
                                                <span>{msg.name}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Mail size={16} />
                                                <span>{msg.email}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Clock size={16} />
                                                <span>{new Date(msg.created_at).toLocaleTimeString()}</span>
                                            </div>
                                        </div>
                                        
                                        <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg-primary)', borderRadius: 'var(--radius-sm)' }}>
                                            <strong>Message:</strong>
                                            <p style={{ margin: '0.5rem 0 0 0', lineHeight: '1.6' }}>{msg.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* User Requests Tab */}
                {activeTab === 'requests' && (
                    <div>
                        <h1 style={{ marginBottom: '1.5rem', textAlign: 'left' }}>User Service Requests</h1>
                        {requests.filter(r => r.verification_status !== 'approved').length === 0 ? (
                            <p style={{ textAlign: 'left', color: 'var(--color-text-secondary)' }}>No requests found</p>
                        ) : (
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {requests.filter(r => r.verification_status !== 'approved').map((request) => (
                                    <div key={request.id} style={{
                                        padding: '1.5rem',
                                        backgroundColor: 'white',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: 'var(--radius-md)'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                            <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>{request.service_type}</h3>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: 'var(--radius-full)',
                                                fontSize: '0.8rem',
                                                fontWeight: 'bold',
                                                backgroundColor: request.status === 'pending' ? '#fef3c7' : 
                                                               request.status === 'accepted' ? '#dbeafe' : '#d1fae5',
                                                color: request.status === 'pending' ? '#92400e' : 
                                                       request.status === 'accepted' ? '#1e40af' : '#065f46'
                                            }}>
                                                {request.status}
                                            </span>
                                        </div>
                                        
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <User size={16} />
                                                <span>{request.name}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Phone size={16} />
                                                <span>{request.phone}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Calendar size={16} />
                                                <span>{request.date}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <MapPin size={16} />
                                                <span>{request.location}</span>
                                            </div>
                                        </div>
                                        
                                        <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg-primary)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>
                                            <strong>Details:</strong> {request.details}
                                        </div>
                                        
                                        {request.status === 'pending' || request.status === 'rejected' ? (
                                            <select 
                                                style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                                                onChange={(e) => {
                                                    if (e.target.value) {
                                                        const selectedWorker = workers.find(w => w.id === e.target.value);
                                                        assignWorkerToRequest(request.id, e.target.value)
                                                            .then(() => {
                                                                setRequests(prev => prev.map(r => 
                                                                    r.id === request.id ? {...r, status: 'assigned', worker_id: e.target.value} : r
                                                                ));
                                                                addNotification({
                                                                    type: 'assignment',
                                                                    title: 'Worker Assigned',
                                                                    message: `${selectedWorker.name} assigned to ${request.service_type} request from ${request.name}`
                                                                });
                                                            })
                                                            .catch(err => {
                                                                console.error('Assignment error:', err);
                                                                alert('Error assigning worker: ' + (err.message || 'Unknown error'));
                                                            });
                                                    }
                                                }}
                                            >
                                                <option value="">{request.status === 'rejected' ? 'Reassign Worker' : 'Assign Worker'}</option>
                                                {(() => {
                                                    const matchingWorkers = workers.filter(w => 
                                                        w.service_type?.toLowerCase() === request.service_type?.toLowerCase() ||
                                                        w.service_type?.toLowerCase().replace(' ', '-') === request.service_type?.toLowerCase() ||
                                                        request.service_type?.toLowerCase().includes(w.service_type?.toLowerCase())
                                                    );
                                                    
                                                    // If no matching workers, show all workers as fallback
                                                    const workersToShow = matchingWorkers.length > 0 ? matchingWorkers : workers;
                                                    
                                                    return workersToShow.length === 0 ? (
                                                        <option disabled>No workers available</option>
                                                    ) : (
                                                        workersToShow.map(worker => (
                                                            <option key={worker.id} value={worker.id}>
                                                                {worker.name} - {worker.service_type}
                                                                {matchingWorkers.length === 0 ? ' (Showing all)' : ''}
                                                            </option>
                                                        ))
                                                    );
                                                })()}
                                            </select>
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Work Assignments Tab */}
                {activeTab === 'assignments' && (
                    <div>
                        <h1 style={{ marginBottom: '1.5rem', textAlign: 'left' }}>Work Assignments</h1>
                        {requests.filter(r => r.worker_id).length === 0 ? (
                            <p style={{ textAlign: 'left', color: 'var(--color-text-secondary)' }}>No work assignments found</p>
                        ) : (
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {requests.filter(r => r.worker_id).map((request) => {
                                    const worker = workers.find(w => w.id === request.worker_id);
                                    return (
                                        <div key={request.id} style={{
                                            padding: '1.5rem',
                                            backgroundColor: 'white',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: 'var(--radius-md)',
                                            boxShadow: 'var(--shadow-sm)'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                                <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>{request.service_type}</h3>
                                                <span style={{
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: 'var(--radius-full)',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 'bold',
                                                    backgroundColor: request.status === 'accepted' ? '#d1fae5' : 
                                                                   request.status === 'rejected' ? '#fee2e2' : 
                                                                   request.status === 'completed' ? '#d1fae5' : '#fef3c7',
                                                    color: request.status === 'accepted' ? '#065f46' : 
                                                           request.status === 'rejected' ? '#991b1b' : 
                                                           request.status === 'completed' ? '#065f46' : '#92400e'
                                                }}>
                                                    {request.status === 'pending' ? 'Assigned (Pending)' : 
                                                     request.status === 'accepted' ? 'Accepted' : 
                                                     request.status === 'rejected' ? 'Rejected' : 
                                                     request.status === 'completed' ? 'Completed' : request.status}
                                                </span>
                                            </div>
                                            
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1rem' }}>
                                                <div>
                                                    <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>Customer Details</h4>
                                                    <div style={{ fontSize: '0.9rem' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                                            <User size={14} />
                                                            <span>{request.name}</span>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                                            <Phone size={14} />
                                                            <span>{request.phone}</span>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                            <MapPin size={14} />
                                                            <span>{request.location}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-primary)' }}>Assigned Worker</h4>
                                                    <div style={{ fontSize: '0.9rem' }}>
                                                        <p><strong>Name:</strong> {worker?.name}</p>
                                                        <p><strong>Service:</strong> {worker?.service_type}</p>
                                                        <p><strong>Phone:</strong> {worker?.phone}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg-primary)', borderRadius: 'var(--radius-sm)' }}>
                                                <strong>Work Details:</strong>
                                                <p style={{ margin: '0.5rem 0 0 0' }}>{request.details}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* Work Verification Tab */}
                {activeTab === 'verification' && (
                    <div>
                        <h1 style={{ marginBottom: '1.5rem', textAlign: 'left' }}>Work Verification</h1>
                        {requests.filter(r => r.verification_status === 'submitted').length === 0 ? (
                            <p style={{ textAlign: 'left', color: 'var(--color-text-secondary)' }}>No work submitted for verification</p>
                        ) : (
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                {requests.filter(r => r.verification_status === 'submitted').map((request) => {
                                    const worker = workers.find(w => w.id === request.worker_id);
                                    return (
                                        <div key={request.id} style={{
                                            padding: '2rem',
                                            backgroundColor: 'white',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: 'var(--radius-lg)',
                                            boxShadow: 'var(--shadow-md)'
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
                                                    Pending Verification
                                                </span>
                                            </div>
                                            
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1.5rem' }}>
                                                <div>
                                                    <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Worker Details</h4>
                                                    <p><strong>Name:</strong> {worker?.name}</p>
                                                    <p><strong>Service:</strong> {worker?.service_type}</p>
                                                    <p><strong>Phone:</strong> {worker?.phone}</p>
                                                </div>
                                                <div>
                                                    <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>Customer Details</h4>
                                                    <p><strong>Name:</strong> {request.name}</p>
                                                    <p><strong>Phone:</strong> {request.phone}</p>
                                                    <p><strong>Location:</strong> {request.location}</p>
                                                    <p><strong>Date:</strong> {request.date}</p>
                                                </div>
                                            </div>
                                            
                                            <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--color-bg-primary)', borderRadius: 'var(--radius-md)' }}>
                                                <strong>Work Details:</strong>
                                                <p style={{ margin: '0.5rem 0 0 0' }}>{request.details}</p>
                                            </div>
                                            
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1.5rem' }}>
                                                <div>
                                                    <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-success)' }}>Photos</h4>
                                                    {request.photos && request.photos.length > 0 ? (
                                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
                                                            {request.photos.map((photo, index) => (
                                                                <div key={index} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', cursor: 'pointer' }}
                                                                     onClick={() => setModalMedia({ type: 'image', src: `data:image/jpeg;base64,${photo}`, title: `Work Photo ${index + 1}` })}>
                                                                    <img 
                                                                        src={`data:image/jpeg;base64,${photo}`} 
                                                                        alt={`Work photo ${index + 1}`}
                                                                        style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                                                                        onError={(e) => {
                                                                            e.target.style.display = 'none';
                                                                            e.target.nextSibling.style.display = 'block';
                                                                        }}
                                                                    />
                                                                    <div style={{ display: 'none', padding: '1rem', textAlign: 'center', backgroundColor: '#f0fdf4', fontSize: '0.8rem' }}>
                                                                        {photo.substring(0, 20)}...
                                                                    </div>
                                                                    <div style={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', padding: '2px 6px', borderRadius: '3px', fontSize: '0.7rem' }}>
                                                                        Click to view
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p style={{ color: 'var(--color-text-secondary)' }}>No photos uploaded</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-primary)' }}>Videos</h4>
                                                    {request.videos && request.videos.length > 0 ? (
                                                        <div style={{ display: 'grid', gap: '1rem' }}>
                                                            {request.videos.map((video, index) => (
                                                                <div key={index} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
                                                                     onClick={() => setModalMedia({ type: 'video', src: `data:video/mp4;base64,${video}`, title: `Work Video ${index + 1}` })}>
                                                                    <video 
                                                                        src={`data:video/mp4;base64,${video}`}
                                                                        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                                                        onError={(e) => {
                                                                            e.target.style.display = 'none';
                                                                            e.target.nextSibling.style.display = 'block';
                                                                        }}
                                                                    />
                                                                    <div style={{ display: 'none', padding: '1rem', textAlign: 'center', backgroundColor: '#f0f9ff', fontSize: '0.8rem' }}>
                                                                        {video.substring(0, 20)}...
                                                                    </div>
                                                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', padding: '8px', borderRadius: '50%' }}>
                                                                        ▶
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p style={{ color: 'var(--color-text-secondary)' }}>No videos uploaded</p>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                <button 
                                                    onClick={() => {
                                                        updateRequest(request.id, { verification_status: 'approved' })
                                                            .then(() => {
                                                                setRequests(prev => prev.map(r => 
                                                                    r.id === request.id ? {...r, verification_status: 'approved'} : r
                                                                ));
                                                                alert('Work approved successfully');
                                                            })
                                                            .catch(() => alert('Error approving work'));
                                                    }}
                                                    style={{
                                                        padding: '0.75rem 1.5rem',
                                                        backgroundColor: 'var(--color-success)',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: 'var(--radius-md)',
                                                        cursor: 'pointer',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    Approve Work
                                                </button>
                                                <button 
                                                    onClick={() => {
                                                        updateRequest(request.id, { verification_status: 'rejected' })
                                                            .then(() => {
                                                                setRequests(prev => prev.map(r => 
                                                                    r.id === request.id ? {...r, verification_status: 'rejected'} : r
                                                                ));
                                                                alert('Work rejected');
                                                            })
                                                            .catch(() => alert('Error rejecting work'));
                                                    }}
                                                    style={{
                                                        padding: '0.75rem 1.5rem',
                                                        backgroundColor: 'var(--color-error)',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: 'var(--radius-md)',
                                                        cursor: 'pointer',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    Reject Work
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* Completed Work Tab */}
                {activeTab === 'completed' && (
                    <div>
                        <h1 style={{ marginBottom: '1.5rem', textAlign: 'left' }}>Completed Work</h1>
                        {requests.filter(r => r.status === 'completed').length === 0 ? (
                            <p style={{ textAlign: 'left', color: 'var(--color-text-secondary)' }}>No completed work found</p>
                        ) : (
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {requests.filter(r => r.status === 'completed').map((request) => {
                                    const worker = workers.find(w => w.id === request.worker_id);
                                    return (
                                        <div key={request.id} style={{
                                            padding: '1.5rem',
                                            backgroundColor: 'white',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: 'var(--radius-md)',
                                            boxShadow: 'var(--shadow-sm)'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                                <h3 style={{ margin: 0, color: 'var(--color-success)' }}>{request.service_type}</h3>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <span style={{
                                                        padding: '0.25rem 0.75rem',
                                                        borderRadius: 'var(--radius-full)',
                                                        fontSize: '0.8rem',
                                                        fontWeight: 'bold',
                                                        backgroundColor: '#d1fae5',
                                                        color: '#065f46'
                                                    }}>
                                                        Completed
                                                    </span>
                                                    {request.verification_status && (
                                                        <span style={{
                                                            padding: '0.25rem 0.75rem',
                                                            borderRadius: 'var(--radius-full)',
                                                            fontSize: '0.8rem',
                                                            fontWeight: 'bold',
                                                            backgroundColor: request.verification_status === 'approved' ? '#d1fae5' : 
                                                                           request.verification_status === 'rejected' ? '#fee2e2' : '#fef3c7',
                                                            color: request.verification_status === 'approved' ? '#065f46' : 
                                                                   request.verification_status === 'rejected' ? '#991b1b' : '#92400e'
                                                        }}>
                                                            {request.verification_status}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1rem' }}>
                                                <div>
                                                    <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>Customer Details</h4>
                                                    <div style={{ fontSize: '0.9rem' }}>
                                                        <p><strong>Name:</strong> {request.name}</p>
                                                        <p><strong>Phone:</strong> {request.phone}</p>
                                                        <p><strong>Location:</strong> {request.location}</p>
                                                        <p><strong>Date:</strong> {request.date}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-success)' }}>Worker Details</h4>
                                                    <div style={{ fontSize: '0.9rem' }}>
                                                        <p><strong>Name:</strong> {worker?.name}</p>
                                                        <p><strong>Service:</strong> {worker?.service_type}</p>
                                                        <p><strong>Phone:</strong> {worker?.phone}</p>
                                                        <p><strong>Rating:</strong> {worker?.rating}/5.0</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg-primary)', borderRadius: 'var(--radius-sm)' }}>
                                                <strong>Work Details:</strong>
                                                <p style={{ margin: '0.5rem 0 0 0' }}>{request.details}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* Service Completed Tab */}
                {activeTab === 'service-completed' && (
                    <div>
                        <h1 style={{ marginBottom: '1.5rem', textAlign: 'left' }}>Our Services Completed</h1>
                        {requests.filter(r => r.verification_status === 'approved').length === 0 ? (
                            <p style={{ textAlign: 'left', color: 'var(--color-text-secondary)' }}>No completed services found</p>
                        ) : window.innerWidth <= 768 ? (
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {requests.filter(r => r.verification_status === 'approved').map((request, index) => {
                                    const worker = workers.find(w => w.id === request.worker_id);
                                    return (
                                        <div key={request.id} style={{
                                            backgroundColor: 'white',
                                            padding: '1rem',
                                            borderRadius: 'var(--radius-lg)',
                                            boxShadow: 'var(--shadow-md)',
                                            border: '1px solid var(--color-border)'
                                        }}>
                                            <div style={{ marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>#{index + 1}</div>
                                            <div style={{ marginBottom: '0.5rem' }}><strong>User:</strong> {request.name}</div>
                                            <div style={{ marginBottom: '0.5rem' }}><strong>Phone:</strong> {request.phone}</div>
                                            <div style={{ marginBottom: '0.5rem' }}><strong>Worker:</strong> {worker?.name || 'N/A'}</div>
                                            <div style={{ marginBottom: '0.5rem' }}><strong>Worker Phone:</strong> {worker?.phone || 'N/A'}</div>
                                            <div style={{ marginBottom: '0.5rem' }}><strong>Service:</strong> {request.service_type}</div>
                                            <div>
                                                <span style={{
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: 'var(--radius-full)',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 'bold',
                                                    backgroundColor: '#d1fae5',
                                                    color: '#065f46'
                                                }}>
                                                    Completed
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                                            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>SI.No</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>User Name</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>User Number</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>Worker Name</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>Worker Phone</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>Service</th>
                                            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requests.filter(r => r.verification_status === 'approved').map((request, index) => {
                                            const worker = workers.find(w => w.id === request.worker_id);
                                            return (
                                                <tr key={request.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                    <td style={{ padding: '1rem' }}>{index + 1}</td>
                                                    <td style={{ padding: '1rem' }}>{request.name}</td>
                                                    <td style={{ padding: '1rem' }}>{request.phone}</td>
                                                    <td style={{ padding: '1rem' }}>{worker?.name || 'N/A'}</td>
                                                    <td style={{ padding: '1rem' }}>{worker?.phone || 'N/A'}</td>
                                                    <td style={{ padding: '1rem' }}>{request.service_type}</td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <span style={{
                                                            padding: '0.25rem 0.75rem',
                                                            borderRadius: 'var(--radius-full)',
                                                            fontSize: '0.8rem',
                                                            fontWeight: 'bold',
                                                            backgroundColor: '#d1fae5',
                                                            color: '#065f46'
                                                        }}>
                                                            Completed
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Worker List Tab */}
                {activeTab === 'workers' && (
                    <div>
                        <h1 style={{ marginBottom: '1.5rem' }}>Registered Workers</h1>
                        {workers.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                                <p style={{ color: 'var(--color-text-secondary)' }}>No workers registered yet</p>
                            </div>
                        ) : (
                            <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                                                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--color-border)', fontWeight: 600 }}>S.No</th>
                                                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--color-border)', fontWeight: 600 }}>Worker Name</th>
                                                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--color-border)', fontWeight: 600 }}>Service</th>
                                                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--color-border)', fontWeight: 600 }}>Phone Number</th>
                                                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--color-border)', fontWeight: 600 }}>Location</th>
                                                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--color-border)', fontWeight: 600 }}>Email</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {workers.map((worker, index) => (
                                                <tr key={worker.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                    <td style={{ padding: '1rem' }}>{index + 1}</td>
                                                    <td style={{ padding: '1rem', fontWeight: 500 }}>{worker.name}</td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <span style={{
                                                            padding: '0.25rem 0.75rem',
                                                            backgroundColor: 'var(--color-bg-primary)',
                                                            color: 'var(--color-primary)',
                                                            borderRadius: 'var(--radius-full)',
                                                            fontSize: '0.875rem',
                                                            fontWeight: 500
                                                        }}>
                                                            {worker.service_type}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>{worker.phone}</td>
                                                    <td style={{ padding: '1rem' }}>{worker.location}</td>
                                                    <td style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>{worker.email}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            {/* Media Modal */}
            {modalMedia && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }} onClick={() => setModalMedia(null)}>
                    <div style={{
                        maxWidth: '90%',
                        maxHeight: '90%',
                        position: 'relative'
                    }} onClick={(e) => e.stopPropagation()}>
                        <button 
                            onClick={() => setModalMedia(null)}
                            style={{
                                position: 'absolute',
                                top: '-40px',
                                right: '0',
                                backgroundColor: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '30px',
                                height: '30px',
                                cursor: 'pointer',
                                fontSize: '18px'
                            }}
                        >
                            ×
                        </button>
                        {modalMedia.type === 'image' ? (
                            <img 
                                src={modalMedia.src}
                                alt={modalMedia.title}
                                style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 'var(--radius-md)' }}
                            />
                        ) : (
                            <video 
                                src={modalMedia.src}
                                controls
                                autoPlay
                                style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 'var(--radius-md)' }}
                            />
                        )}
                        <p style={{ color: 'white', textAlign: 'center', marginTop: '10px' }}>{modalMedia.title}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;