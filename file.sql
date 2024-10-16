CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE tokens (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    token VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO tokens (user_id, token) VALUES (1, 'votre-token-unique');
SELECT u.*
FROM users u
JOIN tokens t ON u.id = t.user_id
WHERE t.token = 'votre-token-unique';

