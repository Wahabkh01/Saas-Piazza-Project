const client = require('./db');

// Sample query to select all users
client.query('SELECT * FROM users', (err, res) => {
    if (err) {
        console.error('Error executing query', err.stack);
    } else {
        console.log('Users:', res.rows);
    }
    client.end();
});
