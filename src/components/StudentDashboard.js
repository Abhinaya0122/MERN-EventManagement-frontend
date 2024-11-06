// src/components/Dashboard/StudentDashboard.js
import React, { useEffect, useState } from 'react';
import { fetchEvents, fetchMyRegistrations, registerUserForEvent } from '../api/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead

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
        <div>
            <h1>Student Dashboard</h1>
            <h2>Register for an Event</h2>
            <ul>
                {events.map((event) => (
                    <li key={event._id}>
                        {event.title} - {event.date}
                        <button onClick={() => registerForEvent(event._id)}>Register</button>
                    </li>
                ))}
            </ul>

            <h2>My Registrations</h2>
            <ul>
                {myRegistrations.map((registration) => (
                    <li key={registration._id}>
                        {registration.title} - {registration.date}
                    </li>
                ))}
            </ul>

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default StudentDashboard;
