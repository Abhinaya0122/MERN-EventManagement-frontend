// MyRegistrations.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyRegistrations = () => {
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const response = await axios.get('http://localhost:4242/api/registrations', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Use token for authentication
                    },
                });
                setRegistrations(response.data);
            } catch (error) {
                console.error('Error fetching registrations:', error);
            }
        };

        fetchRegistrations();
    }, []);

    return (
        <div>
            <h1>My Registrations</h1>
            <ul>
                {registrations.map((registration) => (
                    <li key={registration._id}>
                        Event: {registration.eventId.title} - Date: {new Date(registration.eventId.date).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyRegistrations;
