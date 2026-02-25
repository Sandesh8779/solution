import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import NotificationPanel from './NotificationPanel';

const NotificationIcon = () => {
    const { unreadCount } = useNotifications();
    const [showPanel, setShowPanel] = useState(false);

    return (
        <div style={{ position: 'relative' }}>
            <button
                onClick={() => setShowPanel(!showPanel)}
                style={{
                    position: 'relative',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-secondary)',
                    transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-bg-primary)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span style={{
                        position: 'absolute',
                        top: '2px',
                        right: '2px',
                        backgroundColor: 'var(--color-error)',
                        color: 'white',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        fontSize: '0.7rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                    }}>
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>
            
            {showPanel && (
                <NotificationPanel onClose={() => setShowPanel(false)} />
            )}
        </div>
    );
};

export default NotificationIcon;