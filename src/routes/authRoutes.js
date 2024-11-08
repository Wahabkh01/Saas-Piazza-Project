// src/routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Signup and login routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;



