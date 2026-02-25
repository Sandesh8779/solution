import React from 'react';
import { AlertCircle, X, Briefcase } from 'lucide-react';

const NotificationBanner = ({ notifications, onDismiss }) => {
    const urgentNotifications = notifications.filter(n => !n.read);
    
    if (urgentNotifications.length === 0) return null;

    const isRequestNotification = urgentNotifications.some(n => n.type === 'new_request');
    const isAssignmentNotification = urgentNotifications.some(n => n.type === 'assignment');

    return (
        <div style={{
            backgroundColor: isAssignmentNotification ? '#dbeafe' : '#fef3c7',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
        }}>
            {isAssignmentNotification ? (
                <Briefcase size={20} style={{ color: '#3b82f6', flexShrink: 0 }} />
            ) : (
                <AlertCircle size={20} style={{ color: '#f59e0b', flexShrink: 0 }} />
            )}
            <div style={{ flex: 1 }}>
                <strong style={{ color: isAssignmentNotification ? '#1e40af' : '#92400e' }}>
                    {isAssignmentNotification 
                        ? `${urgentNotifications.length} new work assignment${urgentNotifications.length > 1 ? 's' : ''} waiting for your response`
                        : `${urgentNotifications.length} new service request${urgentNotifications.length > 1 ? 's' : ''} waiting for assignment`
                    }
                </strong>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: isAssignmentNotification ? '#1e40af' : '#92400e' }}>
                    {isAssignmentNotification 
                        ? 'Check "Assigned Work" tab to accept or reject work assignments.'
                        : 'Click on "User Requests" tab to assign workers to pending requests.'
                    }
                </p>
            </div>
            <button
                onClick={onDismiss}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: isAssignmentNotification ? '#1e40af' : '#92400e',
                    padding: '0.25rem'
                }}
            >
                <X size={16} />
            </button>
        </div>
    );
};

export default NotificationBanner;