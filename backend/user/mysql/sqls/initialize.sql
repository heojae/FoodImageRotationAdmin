DROP DATABASE IF EXISTS fira_user;

CREATE DATABASE fira_user;
USE fira_user;

CREATE TABLE users (
    pk INTEGER AUTO_INCREMENT,
    email VARCHAR(50) UNIQUE,
    password VARCHAR(100),
    profile_image VARCHAR(100),
    access_token VARCHAR(37) UNIQUE,
    PRIMARY KEY (pk)
);


INSERT INTO users(email, password, profile_image, access_token)
VALUES('admin@naver.com', '1234', 'admin/profile.jpg', 'f9e4a020-6bfd-11eb-8572-0800200c9a66');
