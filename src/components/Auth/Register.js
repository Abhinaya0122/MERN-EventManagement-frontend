// src/components/Auth/Register.js
import React, { useState } from 'react';
import { registerUser } from '../../api/api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser({ username, password, role }); // Include role in user data
            console.log('Registration successful', response.data);
        } catch (error) {
            console.error('Registration error', error);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
