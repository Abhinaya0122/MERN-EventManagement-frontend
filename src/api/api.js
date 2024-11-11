// src/api.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'https://mern-eventmanagement-backend.onrender.com/api', // Adjust the URL as necessary
});

export const registerUser = async (userData) => {
    return await API.post('/auth/register', userData);
};

export const loginUser = async (userData) => {
    return await API.post('/auth/login', userData);
};

export const createEvent = async (eventData) => {
    return await API.post('/events', eventData);
};

export const fetchEvents = async () => {
    return await API.get('/events');
};


export const registerUserForEvent = async (eventId) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    return await axios.post(
        `https://mern-eventmanagement-backend.onrender.com/api/events/${eventId}/register`,  
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};



// const API_URL = 'https://mern-eventmanagement-backend.onrender.com/api'; 

export const fetchMyRegistrations = async () => {
    const token = localStorage.getItem('token'); 
    return await axios.get(`https://mern-eventmanagement-backend.onrender.com/api/registrations/my-registrations`, {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    });
};

