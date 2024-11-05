// src/pages/AddEventPage.js
import React, { useState } from 'react';
import AddEvent from '../components/AddEvent';

const AddEventPage = () => {
  const [events, setEvents] = useState([]);

  const addEvent = (event) => {
    setEvents([...events, { id: events.length + 1, ...event }]);
  };

  return (
    <div>
      <h2>Add a New Event</h2>
      <AddEvent onAddEvent={addEvent} />
    </div>
  );
};

export default AddEventPage;
