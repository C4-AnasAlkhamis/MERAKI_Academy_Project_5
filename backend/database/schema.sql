-- select the roles wthe all permissions 
-- {SELECT permissions.permission FROM roles join role_permission ON roles.id = role_permission.role join permissions on role_permission.permission = permissions.id
-- where roles.id =2}
DROP DATABASE MERAKI_Academy_Project_5;

-- DROP DATABASE MERAKI_Academy_Project_5;
CREATE DATABASE MERAKI_Academy_Project_5;

-- CREAT DATABASE MERAKI_Academy_Project_5;
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
    FOREIGN KEY (permission) REFERENCES permissions (id)
);

-- ============================ // done
CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

-- user name VARCHAR(100),
-- ============================ // done
CREATE TABLE categories (
    id INT AUTO_INCREMENT NOT NULL,
    category VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

-- ============================ // done
CREATE TABLE items (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(255),
    descriptions VARCHAR(255),
    category_id INT,
    img VARCHAR(250) NOT NULL,
    price int NOT NULL,
    rate INT,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    PRIMARY KEY (id),
    is_deleted TINYINT DEFAULT 0
);

-- ============================ // done 
CREATE TABLE carts (
    id INT NOT NULL AUTO_INCREMENT,
    item_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (item_id) REFERENCES items (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- ============================ // done 
CREATE TABLE wishlists (
    id INT NOT NULL AUTO_INCREMENT,
    item_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (item_id) REFERENCES items (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO
    roles (role)
VALUES
    ('Admin');

INSERT INTO
    roles (role)
VALUES
    ('User');

INSERT INTO
    permissions (permission)
VALUES
    ('create');

INSERT INTO
    permissions (permission)
VALUES
    ('read');

INSERT INTO
    permissions (permission)
VALUES
    ('update');

INSERT INTO
    permissions (permission)
VALUES
    ('delete');

INSERT INTO
    role_permission (role, permission)
VALUES
    (1, 1);

INSERT INTO
    role_permission (role, permission)
VALUES
    (1, 2);

INSERT INTO
    role_permission (role, permission)
VALUES
    (1, 3);

INSERT INTO
    role_permission (role, permission)
VALUES
    (1, 4);

INSERT INTO
    role_permission (role, permission)
VALUES
    (2, 1);

INSERT INTO
    role_permission (role, permission)
VALUES
    (2, 3);

INSERT INTO
    categories (category) VALUE ('Hand Tools');

INSERT INTO
    categories (category) VALUE ('Power Tools');

INSERT INTO
    categories (category) VALUE ('Safty Work Waer');

INSERT INTO
    categories (category) VALUE ('Tool Storage');