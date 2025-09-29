CREATE TABLE TestAttempts (
    attempt_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    test_id INT NOT NULL,
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    score FLOAT,

    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (test_id) REFERENCES Tests(test_id) ON DELETE CASCADE
);
