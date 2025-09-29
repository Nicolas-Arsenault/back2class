CREATE TABLE Questions (
    question_id SERIAL PRIMARY KEY,
    test_id INT,  -- nullable if it's not tied to a specific test
    topic VARCHAR(100),
    difficulty VARCHAR(10) CHECK (difficulty IN ('easy', 'medium', 'hard')),
    question_text TEXT NOT NULL,
    correct_answer TEXT NOT NULL, -- For double-checking or fallback
    explanation TEXT,
    tip TEXT,  -- <-- This is the correction tip shown after test
    created_at TIMESTAMP DEFAULT NOW(),

    FOREIGN KEY (test_id) REFERENCES Tests(test_id) ON DELETE SET NULL
);
