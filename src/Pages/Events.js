// src/pages/Events.js
import React, { useEffect, useState } from 'react';
import EventList from '../components/EventList';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from API or static data
    // Replace this with an actual API call in a real app
    setEvents([
      { id: 1, name: 'React Workshop', date: '2024-10-12', location: 'Online' },
      { id: 2, name: 'Hackathon', date: '2024-11-01', location: 'New York' }
    ]);
  }, []);

  return (
    <div>
      <h2>All Events</h2>
      <EventList events={events} />
    </div>
  );
};

export default Events;
