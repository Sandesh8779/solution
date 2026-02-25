import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getRequests } from '../services/supabase';
import PopupNotification from '../components/PopupNotification';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [lastNotificationCount, setLastNotificationCount] = useState(0);

    useEffect(() => {
        if (!user) return;

        const checkForNewRequests = async () => {
            try {
                const requests = await getRequests();
                
                if (user.role === 'admin') {
                    const pendingRequests = requests.filter(r => r.status === 'pending');
                    const rejectedRequests = requests.filter(r => r.status === 'rejected');
                    
                    const newNotifications = [
                        ...pendingRequests.map(request => ({
                            id: `request-${request.id}`,
                            type: 'new_request',
                            title: 'New Service Request',
                            message: `${request.name} requested ${request.service_type}`,
                            timestamp: new Date(request.created_at),
                            data: request,
                            read: false
                        })),
                        ...rejectedRequests.map(request => ({
                            id: `rejected-${request.id}`,
                            type: 'worker_rejected',
                            title: 'Work Rejected',
                            message: `${request.service_type} request needs reassignment`,
                            timestamp: new Date(request.rejected_at || request.updated_at),
                            data: request,
                            read: false
                        }))
                    ];
                    
                    if (newNotifications.length > lastNotificationCount && newNotifications.length > 0) {
                        setShowPopup(true);
                    }
                    
                    setNotifications(newNotifications);
                    setUnreadCount(newNotifications.length);
                    setLastNotificationCount(newNotifications.length);
                } else if (user.role === 'worker') {
                    const assignedRequests = requests.filter(r => 
                        r.worker_id === user.id && r.status === 'assigned'
                    );
                    const newNotifications = assignedRequests.map(request => ({
                        id: `assignment-${request.id}`,
                        type: 'assignment',
                        title: 'New Work Assignment',
                        message: `You have been assigned ${request.service_type} work for ${request.name}`,
                        timestamp: new Date(request.created_at),
                        data: request,
                        read: false
                    }));
                    
                    setNotifications(newNotifications);
                    setUnreadCount(newNotifications.length);
                }
            } catch (error) {
                console.error('Error checking notifications:', error);
            }
        };

        checkForNewRequests();
        const interval = setInterval(checkForNewRequests, 30000);

        return () => clearInterval(interval);
    }, [user, lastNotificationCount]);

    const markAsRead = (notificationId) => {
        setNotifications(prev => 
            prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        setUnreadCount(0);
    };

    const addNotification = (notification) => {
        // Only add notification if user role matches target role or no target specified
        if (notification.targetRole && user?.role !== notification.targetRole) {
            return;
        }
        
        const newNotification = {
            ...notification,
            id: `notification-${Date.now()}`,
            timestamp: new Date(),
            read: false
        };
        setNotifications(prev => [newNotification, ...prev]);
        setUnreadCount(prev => prev + 1);
        
        // Show popup for new notifications
        if (user?.role === 'admin') {
            setShowPopup(true);
        }
    };

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            markAsRead,
            markAllAsRead,
            addNotification
        }}>
            {children}
            {showPopup && notifications.length > 0 && (
                <PopupNotification 
                    message={`${notifications.length} new service request${notifications.length > 1 ? 's' : ''} waiting for assignment`}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);