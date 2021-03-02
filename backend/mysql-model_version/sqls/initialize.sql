DROP DATABASE IF EXISTS fira_model_version;


CREATE DATABASE fira_model_version;
USE fira_model_version;

CREATE TABLE model_versions
(
    pk              INTEGER AUTO_INCREMENT,
    version_name    VARCHAR(100),
    train_acc       DOUBLE,
    test_acc        DOUBLE,
    model_file_name VARCHAR(100),
    is_using        BOOLEAN,
    PRIMARY KEY (pk)
);


INSERT INTO model_versions(version_name, train_acc, test_acc, model_file_name, is_using)
VALUES ('1.0.0', 0.9920, 0.73, 'cpu_only_b0_bs1_e_10.pth', FALSE);

INSERT INTO model_versions(version_name, train_acc, test_acc, model_file_name, is_using)
VALUES ('1.2.0', 0.99, 0.99, 'single_gpu_b0_bs_32_e_20.pth', TRUE);



