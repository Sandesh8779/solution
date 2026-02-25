import React, { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

const PopupNotification = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '8px',
            padding: '1rem',
            maxWidth: '350px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            zIndex: 1001,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
        }}>
            <AlertCircle size={20} style={{ color: '#f59e0b' }} />
            <div>
                <strong style={{ color: '#92400e' }}>{message}</strong>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: '#92400e' }}>
                    Click on "User Requests" tab to assign workers to pending requests.
                </p>
            </div>
        </div>
    );
};

export default PopupNotification;