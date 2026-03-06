import React from 'react';
import { AlertCircle, X, Briefcase, MessageCircle } from 'lucide-react';

const NotificationBanner = ({ notifications, onDismiss }) => {
    const urgentNotifications = notifications.filter(n => !n.read);
    
    if (urgentNotifications.length === 0) return null;

    const isRequestNotification = urgentNotifications.some(n => n.type === 'new_request');
    const isAssignmentNotification = urgentNotifications.some(n => n.type === 'assignment');
    const isContactMessage = urgentNotifications.some(n => n.type === 'contact_message');
    const contactMessageCount = urgentNotifications.filter(n => n.type === 'contact_message').length;

    return (
        <div style={{
            backgroundColor: isAssignmentNotification ? '#dbeafe' : isContactMessage ? '#f0fdf4' : '#fef3c7',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
        }}>
            {isAssignmentNotification ? (
                <Briefcase size={20} style={{ color: '#3b82f6', flexShrink: 0 }} />
            ) : isContactMessage ? (
                <MessageCircle size={20} style={{ color: '#10b981', flexShrink: 0 }} />
            ) : (
                <AlertCircle size={20} style={{ color: '#f59e0b', flexShrink: 0 }} />
            )}
            <div style={{ flex: 1 }}>
                <strong style={{ color: isAssignmentNotification ? '#1e40af' : isContactMessage ? '#065f46' : '#92400e' }}>
                    {isAssignmentNotification 
                        ? `${urgentNotifications.length} new work assignment${urgentNotifications.length > 1 ? 's' : ''} waiting for your response`
                        : isContactMessage && contactMessageCount > 0
                        ? `${contactMessageCount} new contact message${contactMessageCount > 1 ? 's' : ''} received`
                        : `${urgentNotifications.length} new service request${urgentNotifications.length > 1 ? 's' : ''} waiting for assignment`
                    }
                </strong>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: isAssignmentNotification ? '#1e40af' : isContactMessage ? '#065f46' : '#92400e' }}>
                    {isAssignmentNotification 
                        ? 'Check "Assigned Work" tab to accept or reject work assignments.'
                        : isContactMessage && contactMessageCount > 0
                        ? 'Check "Contact Messages" tab to view and respond to messages.'
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
                    color: isAssignmentNotification ? '#1e40af' : isContactMessage ? '#065f46' : '#92400e',
                    padding: '0.25rem'
                }}
            >
                <X size={16} />
            </button>
        </div>
    );
};

export default NotificationBanner;