DROP TABLE IF EXISTS mail_project;
CREATE DATABASE mail_project;
USE mail_project;

CREATE TABLE messages (
    id INT(5) NOT NULL AUTO_INCREMENT,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    new TINYINT(1),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);