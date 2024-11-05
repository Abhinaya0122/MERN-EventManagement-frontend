// AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '' });

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await axios.get('http://localhost:4242/api/events', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Use token for authentication
                },
            });
            setEvents(response.data);
        };
        fetchEvents();
    }, []);

    const handleAddEvent = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4242/api/events', newEvent, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setNewEvent({ title: '', description: '', date: '' }); // Reset form
            // Fetch updated events
            const response = await axios.get('http://localhost:4242/api/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };
    const handleDeleteEvent = async (eventId) => {
        try {
            await axios.delete(`http://localhost:4242/api/events/${eventId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            // Remove deleted event from state
            setEvents(events.filter(event => event._id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <form onSubmit={handleAddEvent}>
                <input type="text" placeholder="Event Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} required />
                <textarea placeholder="Event Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} required />
                <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} required />
                <button type="submit">Add Event</button>
            </form>
            <h2>Existing Events</h2>
            <ul>
            {events.map(event => (
    <li key={event._id}>
        {event.title} - {new Date(event.date).toLocaleDateString()}
        <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
    </li>
))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
