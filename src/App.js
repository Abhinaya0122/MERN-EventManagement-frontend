// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Auth/Register';
import Login from './components/Auth/login';
import CreateEvent from './components/Event/CreateEvent';
import EventList from './components/Event/EventList';

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<EventList />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/create-event" element={<CreateEvent />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
