CREATE TABLE Tests (
    test_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_timed BOOLEAN DEFAULT FALSE,
    duration_minutes INT,  -- for timed tests
    created_at TIMESTAMP DEFAULT NOW()
);
