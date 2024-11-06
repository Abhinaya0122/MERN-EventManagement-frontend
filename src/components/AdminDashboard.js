// AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '' });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:4242/api/events', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Use token for authentication
                    },
                });
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error.response?.data || error.message);
            }
        };
        fetchEvents();
    }, []);

    const addEvent = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found, please log in.");
            alert("No token found, please log in.");
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:4242/api/events', newEvent, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Event added successfully:', response.data);
            setEvents([...events, response.data]); // Update the events list
            setNewEvent({ title: '', description: '', date: '', location: '' }); // Reset form
        } catch (error) {
            console.error('Error adding event:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Failed to add event');
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
            console.error('Error deleting event:', error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <form onSubmit={addEvent}>
                <input 
                    type="text" 
                    placeholder="Event Title" 
                    value={newEvent.title} 
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} 
                    required 
                />
                <textarea 
                    placeholder="Event Description" 
                    value={newEvent.description} 
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} 
                    required 
                />
                <input 
                    type="date" 
                    value={newEvent.date} 
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} 
                    required 
                />
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
