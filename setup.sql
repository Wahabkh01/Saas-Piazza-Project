-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Create the orders table with a foreign key reference to users
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL
);

-- Insert sample data into users
INSERT INTO users (username, password, email) 
VALUES ('john_doe', 'password123', 'john.doe@example.com')
ON CONFLICT DO NOTHING;

-- Insert sample data into orders
INSERT INTO orders (user_id, total)
VALUES (1, 100.50)
ON CONFLICT DO NOTHING;
