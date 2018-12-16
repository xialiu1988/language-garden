DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS phrases;

CREATE TABLE users(
id SERIAL PRIMARY KEY,
username VARCHAR(255),
pw VARCHAR(255)
);

CREATE TABLE phrases(
id SERIAL PRIMARY KEY,
phrase VARCHAR(255),
users_id INTEGER NOT NULL,
FOREIGN KEY (users_id) REFERENCES users(id)
);

DELETE FROM users;
INSERT INTO users (username,pw) VALUES ('xia','123');
INSERT INTO users (username,pw) VALUES ('Dez','123');



