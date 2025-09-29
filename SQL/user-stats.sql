CREATE TABLE UserTopicStats (
    user_id INT NOT NULL,
    topic VARCHAR(100) NOT NULL,
    questions_attempted INT DEFAULT 0,
    questions_correct INT DEFAULT 0,
    accuracy FLOAT DEFAULT 0,

    PRIMARY KEY (user_id, topic),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
