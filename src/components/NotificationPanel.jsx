import React, { useEffect, useRef } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { User, Clock, CheckCircle, Bell } from 'lucide-react';

const NotificationPanel = ({ onClose }) => {
    const { notifications, markAsRead, markAllAsRead } = useNotifications();
    const panelRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const formatTime = (timestamp) => {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    return (
        <div
            ref={panelRef}
            style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                width: '350px',
                maxHeight: '400px',
                backgroundColor: 'white',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 1000,
                overflow: 'hidden'
            }}
        >
            {/* Header */}
            <div style={{
                padding: '1rem',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'var(--color-bg-secondary)'
            }}>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>
                    Notifications
                </h3>
                {notifications.some(n => !n.read) && (
                    <button
                        onClick={markAllAsRead}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-primary)',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: '500'
                        }}
                    >
                        Mark all read
                    </button>
                )}
            </div>

            {/* Notifications List */}
            <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                    <div style={{
                        padding: '2rem',
                        textAlign: 'center',
                        color: 'var(--color-text-secondary)'
                    }}>
                        <Bell size={32} style={{ opacity: 0.3, marginBottom: '0.5rem' }} />
                        <p>No notifications yet</p>
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            onClick={() => markAsRead(notification.id)}
                            style={{
                                padding: '1rem',
                                borderBottom: '1px solid var(--color-border)',
                                cursor: 'pointer',
                                backgroundColor: notification.read ? 'white' : '#f8fafc',
                                transition: 'background-color 0.2s',
                                position: 'relative'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-bg-primary)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = notification.read ? 'white' : '#f8fafc'}
                        >
                            {!notification.read && (
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: 'var(--color-primary)',
                                    borderRadius: '50%'
                                }} />
                            )}
                            
                            <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    backgroundColor: getNotificationColor(notification.type),
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    flexShrink: 0
                                }}>
                                    {getNotificationIcon(notification.type)}
                                </div>
                                
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <h4 style={{
                                        margin: '0 0 0.25rem 0',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        color: 'var(--color-text-primary)'
                                    }}>
                                        {notification.title}
                                    </h4>
                                    <p style={{
                                        margin: '0 0 0.5rem 0',
                                        fontSize: '0.8rem',
                                        color: 'var(--color-text-secondary)',
                                        lineHeight: '1.4'
                                    }}>
                                        {notification.message}
                                    </p>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                        fontSize: '0.7rem',
                                        color: 'var(--color-text-secondary)'
                                    }}>
                                        <Clock size={12} />
                                        {formatTime(notification.timestamp)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const getNotificationIcon = (type) => {
    switch (type) {
        case 'new_request':
            return <User size={16} />;
        case 'assignment':
            return <CheckCircle size={16} />;
        default:
            return <User size={16} />;
    }
};

const getNotificationColor = (type) => {
    switch (type) {
        case 'new_request':
            return 'var(--color-primary)';
        case 'assignment':
            return 'var(--color-success)';
        default:
            return 'var(--color-primary)';
    }
};

export default NotificationPanel;