const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateToken } = require('../utils/tokenUtils.js');

// Sign up a new user
exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findByUsername(username);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash the password and create a new user
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create(username, passwordHash);

    // Generate JWT token
    const token = generateToken(newUser.id);

    // Respond with the generated token
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Log in an existing user
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findByUsername(username);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare the provided password with the stored password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = generateToken(user.id);

    // Respond with the generated token
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
