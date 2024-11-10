// src/components/Dashboard/StudentDashboard.js
import React, { useEffect, useState } from 'react';
import { fetchEvents, fetchMyRegistrations, registerUserForEvent } from '../api/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead
import '../css/studentdashboard.css';

const StudentDashboard = () => {
    const [events, setEvents] = useState([]);
    const [myRegistrations, setMyRegistrations] = useState([]);
    const navigate = useNavigate(); // Use useNavigate

    useEffect(() => {
        const loadEvents = async () => {
            const response = await fetchEvents();
            setEvents(response.data);
        };

        const loadMyRegistrations = async () => {
            const response = await fetchMyRegistrations();
            console.log(response.data);
            setMyRegistrations(response.data);
        };

        loadEvents();
        loadMyRegistrations();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token
        navigate('/login'); // Use navigate to redirect
    };

    const registerForEvent = async (eventId) => {
        try {
            await registerUserForEvent(eventId);
            alert('Successfully registered for the event!');
            const response = await fetchMyRegistrations(); // Refresh registrations
            setMyRegistrations(response.data);
        } catch (error) {
            console.error('Error registering for event', error);
            alert('Registration failed!');
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Student Dashboard</h1>
            <h2>Register for an Event</h2>
            <ul className="event-list">
                {events.map((event) => (
                    <li className="event-item" key={event._id}>
                        <span className="event-title">{event.title} - {new Date(event.date).toLocaleDateString()}</span>
                        <button onClick={() => registerForEvent(event._id)}>Register</button>
                    </li>
                ))}
            </ul>
    
            <h2>My Registrations</h2>
            <ul className="registration-list">
                {myRegistrations.map((registration) => (
                    <li className="registration-item" key={registration._id}>
                        <span className="event-title">{registration.title} - {new Date(registration.date).toLocaleDateString()}</span>
                    </li>
                ))}
            </ul>
    
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default StudentDashboard;
