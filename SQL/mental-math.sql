CREATE TABLE MentalMathQuestions (
    mm_question_id SERIAL PRIMARY KEY,
    topic VARCHAR(100),
    difficulty VARCHAR(10) CHECK (difficulty IN ('easy', 'medium', 'hard')),
    question_text TEXT NOT NULL,
    correct_answer NUMERIC NOT NULL,  -- or TEXT if answers vary
    explanation TEXT,
    tip TEXT,  -- <-- Tip shown after test
    created_at TIMESTAMP DEFAULT NOW()
);
