-- select the roles wthe all permissions 

-- {SELECT permissions.permission FROM roles join role_permission ON roles.id = role_permission.role join permissions on role_permission.permission = permissions.id
-- where roles.id =2}

-- DROP DATABASE MERAKI_Academy_Project_5;
DROP DATABASE MERAKI_Academy_Project_5;

-- CREAT DATABASE MERAKI_Academy_Project_5;
CREATE DATABASE MERAKI_Academy_Project_5;

-- USE DATABASE MERAKI_Academy_Project_5;
USE MERAKI_Academy_Project_5;

-- ============================ // done
CREATE TABLE permissions (
    id INT AUTO_INCREMENT NOT NULL,
    permission VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

-- ============================ // done
CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

-- ============================ // done 
CREATE TABLE role_permission (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role INT NOT NULL,
    permission INT NOT NULL,
    FOREIGN KEY (role) REFERENCES roles (id),
    FOREIGN
