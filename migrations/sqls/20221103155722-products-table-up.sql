CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL CHECK (price > 0),
    category VARCHAR(50),
    user_id INTEGER REFERENCES users(id) NOT NULL
);