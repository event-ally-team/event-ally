DROP DATABASE IF EXISTS events_db;
CREATE DATABASE events_db;

USE events_db;

CREATE TABLE users (
    user_id INT PRIMARY KEY NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    email_adr VARCHAR(100) NOT NULL,
    passwords VARCHAR(100) NOT NULL
);

CREATE TABLE events (
    event_id INT PRIMARY KEY NOT NULL,
    event_title VARCHAR(100) NOT NULL,
    geolocation VARCHAR(250) NOT NULL,
    event_date DATETIME NOT NULL,
    details TEXT,
    host_id INT,
    FOREIGN KEY (host_id) REFERENCES users(user_id)
);

CREATE TABLE RSVPs (
    rsvp_id INT PRIMARY KEY NOT NULL,
    status VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    comments TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);

CREATE TABLE checklist (
    task_id INT PRIMARY KEY,
    event_id INT NOT NULL,
    schedule DATETIME,
    details_of_task TEXT,
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);

CREATE TABLE comments (
    id INT PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    comment TEXT,
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);



