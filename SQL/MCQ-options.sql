CREATE TABLE Options (
    option_id SERIAL PRIMARY KEY,
    question_id INT NOT NULL,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (question_id) REFERENCES Questions(question_id) ON DELETE CASCADE
);
