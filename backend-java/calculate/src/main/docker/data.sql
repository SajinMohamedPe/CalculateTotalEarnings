CREATE DATABASE IF NOT EXISTS hello_world_schema;

USE hello_world_schema;

CREATE TABLE hello_world (number INT, name VARCHAR(255), dateOfWork DATE, start_time time, end_time time, time_difference int, lunch int,
primary key (dateOfWork));

INSERT INTO hello_world (number, name, dateOfWork, start_time, end_time, time_difference, lunch)
VALUES
(1, 'John Doe', '21', '09', '15', '08:00', '17:00', 540, 60),
(2, 'Jane Smith', '21', '09', '16', '09:00', '18:00', 540, 45),
(3, 'Alice Johnson', '21', '09', '17', '08:30', '17:30', 540, 30);