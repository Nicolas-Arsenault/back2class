CREATE TABLE QuestionAttempts (
    id SERIAL PRIMARY KEY,
    attempt_id INT,
    user_id INT NOT NULL,
    question_id INT,         -- for MCQs
    mm_question_id INT,      -- for mental math
    selected_option_id INT,  -- only for MCQs
    user_input TEXT,         -- only for mental math
    is_correct BOOLEAN,
    time_taken_seconds INT,
    attempt_time TIMESTAMP DEFAULT NOW(),

    FOREIGN KEY (attempt_id) REFERENCES TestAttempts(attempt_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES Questions(question_id) ON DELETE CASCADE,
    FOREIGN KEY (mm_question_id) REFERENCES MentalMathQuestions(mm_question_id) ON DELETE CASCADE,
    FOREIGN KEY (selected_option_id) REFERENCES Options(option_id) ON DELETE SET NULL
);
