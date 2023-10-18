DROP DATABASE IF EXISTS events_db;
CREATE DATABASE events_db;

CREATE TABLE Users (
    user_id INT PRIMARY KEY NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    email_adr varchar(100) NOT NULL,
    passwords varchar(100) NOT NULL,
);

Create taBle events (
    event_id INT PRIMARY KEY NOT NULL,
    event_title VARCHAR(100) NOT NULL,
    geolocation varchar(250) NOT NULL,
    event_date DATETIME NOT NULL,
    details TEXT,
    host_id INT, --Foregin Key-- 
    FOREIGN KEY (host_id) REFERENCES users(user_id)
);

CREATE tAble RSVPs(
    rsvp_id INT PRIMARY KEY,
    status VARCHAR(50) NOT NULL,-- Based on status "'Attending', 'Possibly', "Not Attenidng" contingent as project continues--
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    comments TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);

--Connected to events for now--
creatE TABLE checklist(
    task_id INT PRIMARY KEY,
    event_id INT NOT NULL,
    schedule DATETIME,
    details_of_task TEXT,
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);

--Comments on events--
CREATE TaBLe comments (
    id INT PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    comment TEXT,
    FOREIGN KEY (event_id) REFERENCES events(event_id),
);


