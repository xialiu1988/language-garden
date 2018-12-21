# language-garden
Language Garden

Authors: Ahmad, Deziree Teague, Shalom Belaineh,Xia Liu

Version: 1.0.0

Overview
This app is designed to give users exposure to the basics languages around the world.

Architecture
The app was tested on NodeJS version 8.10.0 and requires NodeJS modules: express, cors, superagent, querystring, pg, dotenv 

Getting Started
The app is designed to run on NodeJS and a PostgreSQL database. Install all the required modules, run the sql script, and set up the environment variables. Note that a valid Username and Password is required to login the page.

Languages
CSS
EJS
JS


Packages
"@google-cloud/translate": "^2.1.3",
"body-parser": "^1.18.3",
"cors": "^2.8.5",
"dotenv": "^6.2.0",
"ejs": "^2.6.1",
"express": "^4.16.4",
"express-session": "^1.15.6",
"google-translate": "^2.2.0",
"pg": "^7.7.1",
"superagent": "^4.0.0"

API
Google Cloud Translate
https://cloud.google.com/translate/docs/

DATABASE 
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS phrases;

CREATE TABLE users(
id SERIAL PRIMARY KEY,
username VARCHAR(255)
);

CREATE TABLE phrases(
id SERIAL PRIMARY KEY,
phrase VARCHAR(255),
users_id INTEGER NOT NULL,
FOREIGN KEY (users_id) REFERENCES users(id)
);








