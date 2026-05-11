import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import { getRequests, getContactMessages } from '../services/supabase';
import PopupNotification from '../components/PopupNotification';

const NotificationContext = createContext(null);

const getReadKey = (userId) => `sfu_read_notifications_${userId}`;

const getReadIds = (userId) => {
    try {
        return new Set(JSON.parse(localStorage.getItem(getReadKey(userId))) || []);
    } catch {
        return new Set();
    }
};

const saveReadIds = (userId, readIds) => {
    localStorage.setItem(getReadKey(userId), JSON.stringify([...readIds]));
};

export const NotificationProvider = ({ children }) => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const shownPopupIdsRef = useRef(new Set());

    const buildNotifications = (rawList, readIds) => {
        return rawList.map(n => ({ ...n, read: readIds.has(n.id) }));
    };

    useEffect(() => {
        if (!user) {
            setNotifications([]);
            setUnreadCount(0);
            setShowPopup(false);
            return;
        }

        const checkForNewRequests = async () => {
            try {
                const requests = await getRequests();
                const readIds = getReadIds(user.id);
                let rawList = [];

                if (user.role === 'admin') {
                    const contactMessages = await getContactMessages();
                    rawList = [
                        ...requests.filter(r => r.status === 'pending').map(r => ({
                            id: `request-${r.id}`,
                            type: 'new_request',
                            title: 'New Service Request',
                            message: `${r.name} requested ${r.service_type}`,
                            timestamp: new Date(r.created_at),
                            data: r
                        })),
                        ...requests.filter(r => r.status === 'rejected').map(r => ({
                            id: `rejected-${r.id}`,
                            type: 'worker_rejected',
                            title: 'Work Rejected',
                            message: `${r.service_type} request needs reassignment`,
                            timestamp: new Date(r.rejected_at || r.updated_at),
                            data: r
                        })),
                        ...contactMessages.map(msg => ({
                            id: `contact-${msg.id}`,
                            type: 'contact_message',
                            title: 'New Contact Message',
                            message: `${msg.name} sent a message: ${msg.subject}`,
                            timestamp: new Date(msg.created_at),
                            data: msg
                        }))
                    ];
                } else if (user.role === 'worker') {
                    rawList = requests
                        .filter(r => r.worker_id === user.id && r.status === 'assigned')
                        .map(r => ({
                            id: `assignment-${r.id}`,
                            type: 'assignment',
                            title: 'New Work Assignment',
                            message: `You have been assigned ${r.service_type} work for ${r.name}`,
                            timestamp: new Date(r.created_at),
                            data: r
                        }));
                }

                const built = buildNotifications(rawList, readIds);
                const newUnread = built.filter(n => !n.read);

                // Show popup only for notifications not yet shown in this session
                const trulyNew = newUnread.filter(n => !shownPopupIdsRef.current.has(n.id));
                if (trulyNew.length > 0) {
                    setShowPopup(true);
                    trulyNew.forEach(n => shownPopupIdsRef.current.add(n.id));
                }

                setNotifications(built);
                setUnreadCount(newUnread.length);
            } catch (error) {
                console.error('Error checking notifications:', error);
            }
        };

        checkForNewRequests();
        const interval = setInterval(checkForNewRequests, 30000);
        return () => clearInterval(interval);
    }, [user]);

    const markAsRead = (notificationId) => {
        if (!user) return;
        const readIds = getReadIds(user.id);
        readIds.add(notificationId);
        saveReadIds(user.id, readIds);
        setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    const markAllAsRead = () => {
        if (!user) return;
        const readIds = getReadIds(user.id);
        notifications.forEach(n => readIds.add(n.id));
        saveReadIds(user.id, readIds);
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        setUnreadCount(0);
        setShowPopup(false);
    };

    const addNotification = (notification) => {
        if (notification.targetRole && user?.role !== notification.targetRole) return;
        if (!user) return;

        const newNotification = {
            ...notification,
            id: `notification-${Date.now()}`,
            timestamp: new Date(),
            read: false
        };

        const readIds = getReadIds(user.id);
        if (!readIds.has(newNotification.id)) {
            setNotifications(prev => [newNotification, ...prev]);
            setUnreadCount(prev => prev + 1);
            if (user?.role === 'admin') setShowPopup(true);
        }
    };

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification }}>
            {children}
            {showPopup && notifications.some(n => !n.read) && (
                <PopupNotification
                    message={`${notifications.filter(n => !n.read).length} new notification${notifications.filter(n => !n.read).length > 1 ? 's' : ''} - Check your dashboard`}
                    onClose={() => setShowPopup(false)}
                />
            )}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
