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
