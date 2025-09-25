-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    email_verified BOOLEAN DEFAULT FALSE,
    magic_token VARCHAR(255),
    magic_token_expiry TIMESTAMP,
    last_magic_link_sent_at TIMESTAMP
);
