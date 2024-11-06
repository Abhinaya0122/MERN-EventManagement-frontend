// src/api.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:4242/api', // Adjust the URL as necessary
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
        `http://localhost:4242/api/events/${eventId}/register`,  
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};



const API_URL = 'http://localhost:4242/api'; // Update to your backend URL

export const fetchMyRegistrations = async () => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    return await axios.get(`http://localhost:4242/api/registrations/my-registrations`, {
        headers: {
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
        },
    });
};

