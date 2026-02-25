import React, { createContext, useState, useContext, useEffect } from 'react';
import { getRequests, getServiceCategories, createRequest, updateRequest } from '../services/supabase';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [requests, setRequests] = useState([]);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [requestsData, servicesData] = await Promise.all([
                    getRequests(),
                    getServiceCategories()
                ]);
                setRequests(requestsData);
                setServices(servicesData);
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };
        loadData();
    }, []);

    const addRequest = async (newRequest) => {
        try {
            const createdRequest = await createRequest(newRequest);
            setRequests(prev => [...prev, createdRequest]);
            return createdRequest;
        } catch (error) {
            console.error('Error creating request:', error);
            throw error;
        }
    };

    const updateRequestStatus = async (id, status) => {
        try {
            const updatedRequest = await updateRequest(id, { status });
            setRequests(prev => prev.map(req => req.id === id ? updatedRequest : req));
        } catch (error) {
            console.error('Error updating request:', error);
            throw error;
        }
    };

    return (
        <DataContext.Provider value={{ requests, services, addRequest, updateRequestStatus }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);