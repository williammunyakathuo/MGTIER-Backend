CREATE DATABASE mtgier;

USE mtgier

CREATE TABLE employees (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  department VARCHAR(50),
  role VARCHAR(50),
  phone VARCHAR(20),
  email VARCHAR(100),
  password VARCHAR(50) NOT NULL,
  date_create DATE NOT NULL
);


CREATE TABLE customers (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  company VARCHAR(50),
  bonuspoints INT DEFAULT 0,
  total_amount_spent DECIMAL(10,2) DEFAULT 0,
  date_joined DATETIME2(0) DEFAULT GETDATE(),
  account_status VARCHAR(20) DEFAULT 'Active'
);


ALTER TABLE customers
ADD last_purchase_date DATE;


CREATE TABLE sales (
  sales_id INT IDENTITY(1,1) PRIMARY KEY,
  number_of_products INT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'Completed',
  sale_date DATETIME2(0) DEFAULT GETDATE(),
  customer_id INT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers (id)
);

CREATE TABLE products (
  product_id INT IDENTITY(1,1) PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL,
  supplier VARCHAR(100),
  supplier_email VARCHAR(100),
  supplier_phone VARCHAR(20),
  date_added DATETIME2(0) DEFAULT GETDATE(),
  is_active BIT DEFAULT 1,
  in_stock INT DEFAULT 0
);

CREATE TABLE notifications (
  notification_id INT IDENTITY(1,1) PRIMARY KEY,
  message TEXT NOT NULL,
  recipient VARCHAR(100) NOT NULL,
  sender VARCHAR(100),
  date_sent DATETIME2(0) DEFAULT GETDATE(),
  is_read BIT DEFAULT 0
);

CREATE TABLE categories (
  id INT NOT NULL PRIMARY KEY IDENTITY(1,1),
  name VARCHAR(255) NOT NULL,
  description TEXT
);

GO
