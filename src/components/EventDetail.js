// EventDetail.js (Component for viewing event details)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await axios.get(`http://localhost:4242/api/events/${id}`);
            setEvent(response.data);
        };
        fetchEvent();
    }, [id]);

    const handleRegister = async () => {
        try {
            await axios.post(`http://localhost:4242/api/events/${id}/register`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert('Registered successfully!');
        } catch (error) {
            console.error('Error registering for event:', error);
            alert('Error registering for event');
        }
    };

    if (!event) return <div>Loading...</div>;

    return (
        <div>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <button onClick={handleRegister}>Register for Event</button>
        </div>
    );
};

export default EventDetail;
