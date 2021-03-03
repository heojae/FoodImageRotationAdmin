DROP DATABASE IF EXISTS fira_dataset;


CREATE DATABASE fira_dataset;
USE fira_dataset;

CREATE TABLE dataset_info
(
    pk    INTEGER AUTO_INCREMENT,
    title VARCHAR(100),
    PRIMARY KEY (pk)
);

CREATE TABLE image_info
(
    pk                 INTEGER AUTO_INCREMENT,
    dataset_info_pk    INTEGER,
    original_file_name VARCHAR(40),
    uuid_file_name     VARCHAR(40),
    exif_degree        INTEGER,
    model_degree       INTEGER,
    confidence         DOUBLE,
    user_fix_degree    INTEGER,
    PRIMARY KEY (pk)
);



INSERT INTO dataset_info(title)
VALUES ('untrained');

