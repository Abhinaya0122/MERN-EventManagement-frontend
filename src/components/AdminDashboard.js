import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/admin.css';

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', location: '' });
    const [editingEvent, setEditingEvent] = useState(null); // State for the event being edited

    // Fetch events from the backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('https://mern-eventmanagement-backend.onrender.com/api/events', {
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

    // Add new event
    const addEvent = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found, please log in.");
            alert("No token found, please log in.");
            return;
        }
    
        try {
            const response = await axios.post('https://mern-eventmanagement-backend.onrender.com/api/events', newEvent, {
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

    // Handle deleting an event
    const handleDeleteEvent = async (eventId) => {
        try {
            await axios.delete(`https://mern-eventmanagement-backend.onrender.com/api/events/${eventId}`, {
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

    // Handle editing an event
    const handleEditEvent = (event) => {
        setEditingEvent(event);
        setNewEvent({
            title: event.title,
            description: event.description,
            date: event.date,
            location: event.location,
        });
    };

    // Update event (for both create and update)
    const updateEvent = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found, please log in.");
            alert("No token found, please log in.");
            return;
        }

        try {
            const response = await axios.put(`https://mern-eventmanagement-backend.onrender.com/api/events/${editingEvent._id}`, newEvent, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Event updated successfully:', response.data);
            // Update the event in the state
            setEvents(events.map(event => event._id === editingEvent._id ? response.data : event));
            setEditingEvent(null); // Reset editing state
            setNewEvent({ title: '', description: '', date: '', location: '' }); // Reset form
        } catch (error) {
            console.error('Error updating event:', error.response?.data || error.message);
            alert(error.response?.data?.message || 'Failed to update event');
        }
    };

    return (
        <div className='admin-dashboard'>
            <h1>Admin Dashboard</h1>

            {/* Event Form for Adding or Editing */}
            <form onSubmit={editingEvent ? updateEvent : addEvent}>
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
              
                <button type="submit">{editingEvent ? 'Update Event' : 'Add Event'}</button>
            </form>

            {/* List of Existing Events */}
            <h2>Existing Events</h2>
            <ul>
                {events.map(event => (
                    <li key={event._id}>
                        {event.title} - {new Date(event.date).toLocaleDateString()}
                        <button onClick={() => handleEditEvent(event)}>Edit</button>
                        <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
