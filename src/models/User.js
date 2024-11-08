// src/models/User.js
const db = require('../db'); // Assuming db is your database instance

// Create User model with relevant methods
const User = {
  // Create a new user in the database
  async create(username, passwordHash) {
    const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
    const values = [username, passwordHash];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  // Find a user by username
  async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await db.query(query, [username]);
    return result.rows[0];
  },

  // Find a user by ID
  async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
};

module.exports = User;
