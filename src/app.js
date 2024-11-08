require('dotenv').config();
const express = require('express');
const client = require('./db');
const jwt = require('jsonwebtoken');  // For JWT handling
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const interactionRoutes = require('./routes/interactionRoutes');

const app = express();
app.use(express.json());

// JWT Middleware to protect routes
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer" format
    if (!token) return res.status(401).json({ error: 'Access token required' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user; // Save user info for use in routes
        next();
    });
}

// Routes
app.use('/auth', authRoutes); // Public routes for login and registration
app.use('/users', authenticateToken, userRoutes); // Protected user routes
app.use('/posts', authenticateToken, postRoutes); // Protected post routes
app.use('/interactions', authenticateToken, interactionRoutes); // Protected interaction routes

// Test route
app.get('/test', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
