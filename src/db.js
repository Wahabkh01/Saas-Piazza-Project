// Load environment variables from .env file
require('dotenv').config();

// Log environment variables to check they're loaded correctly
console.log("Database User:", process.env.DB_USER);
console.log("Database Password:", process.env.DB_PASSWORD);
console.log("Database Name:", process.env.DB_NAME);
console.log("Database Host:", process.env.DB_HOST);
console.log("Database Port:", process.env.DB_PORT);

const { Client } = require('pg');

// Set up the client using environment variables
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Connect to the database
client.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Connection error:', err.stack));

module.exports = client;
