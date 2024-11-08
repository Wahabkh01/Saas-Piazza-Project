// src/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Protected route for getting user profile
router.get('/profile', authMiddleware, userController.getUserProfile);

module.exports = router;
