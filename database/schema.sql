-- DROP DATABASE sql11473340;
-- CREATE DATABASE sql11473340;
USE sql11473340;

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

CREATE TABLE services (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(100),
    image VARCHAR(100),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE worker (
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone VARCHAR(100),
    image VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (service_id) REFERENCES services (id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE service_request (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100),
    order_Detalis VARCHAR(255),
    address VARCHAR(100) NOT NULL,
    phone VARCHAR(100),
    worker_id INT NOT NULL,
    email VARCHAR(100),
    FOREIGN KEY (worker_id) REFERENCES worker (user_id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE rates (
    id INT AUTO_INCREMENT NOT NULL,
    rate INT NOT NULL,
    item_id INT NOT NULL,
    FOREIGN KEY (item_id) REFERENCES items (id),
    PRIMARY KEY (id)
);

CREATE TABLE feedback (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100),
    email VARCHAR(255),
    subject VARCHAR(255),
    feedback VARCHAR(255),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

INSERT INTO
    roles (role)
VALUES
    ('Admin');

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

