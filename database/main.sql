DROP DATABASE registration_system;
CREATE DATABASE registration_system;
USE registration_system;
CREATE TABLE owner (
      owner_id INT PRIMARY KEY AUTO_INCREMENT,
      owner_name VARCHAR(20) UNIQUE,
      phone_number BIGINT,
      address VARCHAR(20)
);
CREATE TABLE sticker(
    sticker_number INT PRIMARY KEY AUTO_INCREMENT,
    sticker_year YEAR ,
    type VARCHAR(20)
);
CREATE TABLE plate(
    plate_number INT PRIMARY KEY AUTO_INCREMENT,
    plate_issuer VARCHAR(20),
    issue_year YEAR,
    type VARCHAR(20)
);
CREATE TABLE vehicle (
      vehicle_number VARCHAR(20) PRIMARY KEY,
      color VARCHAR(20),
      vehicle_year YEAR,
      model VARCHAR(20),
      make VARCHAR(20),
      weight INT,
      mileage INT,
      plate_number INT,
      sticker_number INT,
      FOREIGN KEY (plate_number) REFERENCES  plate(plate_number),
      FOREIGN KEY (sticker_number) REFERENCES  sticker(sticker_number)
);
CREATE TABLE registration_detail(
    registration_id INT PRIMARY KEY AUTO_INCREMENT,
    registration_fee INT,
    start_date DATE,
    duration INT,
    end_date DATE,
    vehicle_number VARCHAR(20),
    owner_id INT,
    FOREIGN KEY (owner_id) REFERENCES  owner(owner_id),
    FOREIGN KEY (vehicle_number) REFERENCES  vehicle(vehicle_number)
);

SHOW DATABASES;
SELECT * FROM registration_system.owner;
SELECT * FROM registration_system.vehicle;
SELECT * FROM registration_system.plate;
SELECT * FROM registration_system.sticker;
SELECT * FROM registration_system.registration_detail;
