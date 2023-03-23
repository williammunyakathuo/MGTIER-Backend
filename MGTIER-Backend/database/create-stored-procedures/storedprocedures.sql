--stored procedures for employees tables

CREATE PROCEDURE selectAllEmployees
AS
BEGIN
    SELECT * FROM employees;
END

EXEC selectAllEmployees
GO

CREATE PROCEDURE addEmployee
(
    @name VARCHAR(50),
    @department VARCHAR(50),
    @role VARCHAR(50),
    @phone VARCHAR(20),
    @email VARCHAR(100),
    @password VARCHAR(50),
    @date_create DATE
)
AS
BEGIN
    INSERT INTO employees (name, department, role, phone, email, password, date_create)
    VALUES (@name, @department, @role, @phone, @email, @password, @date_create);
END


EXEC addEmployee
@name = 'william',
@department = 'hr',
@role = 'superadmin',
@phone = 0009999,
@email = 'trtr@example.com',
@password = 'pass1',
@date_create = '2022-03-22'


GO

CREATE PROCEDURE viewEmployee
(
    @id INT
)
AS
BEGIN
    SELECT * FROM employees WHERE id = @id;
END

GO

CREATE PROCEDURE viewEmployeesByRole
(
    @role VARCHAR(50)
)
AS
BEGIN
    SELECT * FROM employees WHERE role = @role;
END

-- EXEC viewEmployeesByRole
-- @role = 'hr'


--stored procedures for customers tables

GO

CREATE PROCEDURE selectAllCustomers
AS
BEGIN
    SELECT * FROM customers;
END

GO

CREATE PROCEDURE addCustomer
(
    @name VARCHAR(50),
    @email VARCHAR(100),
    @company VARCHAR(50),
    @total_amount_spent DECIMAL(10,2),
    @date_joined DATETIME2(0),
    @account_status VARCHAR(20)
)
AS
BEGIN
    INSERT INTO customers (name, email, company, total_amount_spent, date_joined, account_status)
    VALUES (@name, @email, @company, @total_amount_spent, @date_joined, @account_status);
END

GO

CREATE PROCEDURE editCustomer
(
    @id INT,
    @name VARCHAR(50),
    @email VARCHAR(100),
    @company VARCHAR(50),
    @bonuspoints INT,
    @total_amount_spent DECIMAL(10,2),
    @date_joined DATETIME2(0),
    @account_status VARCHAR(20)
)
AS
BEGIN
    UPDATE customers
    SET name = @name,
        email = @email,
        company = @company,
        bonuspoints = @bonuspoints,
        total_amount_spent = @total_amount_spent,
        date_joined = @date_joined,
        account_status = @account_status
    WHERE id = @id;
END

GO

CREATE PROCEDURE viewCustomer
(
    @id INT
)
AS
BEGIN
    SELECT * FROM customers WHERE id = @id;
END


GO

CREATE PROCEDURE addBonus
    @CustomerId INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TotalAmountSpent DECIMAL(10,2);
    DECLARE @BonusPoints INT;

    SELECT @TotalAmountSpent = total_amount_spent
    FROM customers
    WHERE id = @CustomerId;

    SET @BonusPoints = CAST(@TotalAmountSpent / 10 AS INT);

    UPDATE customers
    SET bonuspoints = @BonusPoints
    WHERE id = @CustomerId;
END



 GO

--stored procedures for sales tables

CREATE PROCEDURE makeSale
    @NumberOfProducts INT,
    @TotalAmount DECIMAL(10,2),
    @Status VARCHAR(20),
    @SaleDate DATETIME2(0),
    @CustomerId INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO sales (number_of_products, total_amount, status, sale_date, customer_id)
    VALUES (@NumberOfProducts, @TotalAmount, @Status, @SaleDate, @CustomerId);
END

GO

CREATE PROCEDURE changesalesStatus
    @SaleId INT,
    @Status VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE sales
    SET status = @Status
    WHERE sales_id = @SaleId;
END


--stored procedures for product tables
GO

CREATE PROCEDURE addProduct
    @ProductName VARCHAR(100),
    @Category VARCHAR(50),
    @Description TEXT,
    @Price DECIMAL(10,2),
    @Quantity INT,
    @Supplier VARCHAR(100),
    @SupplierEmail VARCHAR(100),
    @SupplierPhone VARCHAR(20),
    @InStock INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO products (product_name, category, description, price, quantity, supplier, supplier_email, supplier_phone, in_stock)
    VALUES (@ProductName, @Category, @Description, @Price, @Quantity, @Supplier, @SupplierEmail, @SupplierPhone, @InStock);
END



GO

CREATE PROCEDURE changeProductdetails
    @ProductId INT,
    @Quantity INT,
    @InStock INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE products
    SET quantity = @Quantity, in_stock = @InStock
    WHERE product_id = @ProductId;
END



GO

CREATE PROCEDURE removeProduct
    @ProductId INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM products
    WHERE product_id = @ProductId;
END


GO

--stored procedures for notification tables

CREATE PROCEDURE insertNotification
    @Message TEXT,
    @Recipient VARCHAR(100),
    @Sender VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO notifications (message, recipient, sender)
    VALUES (@Message, @Recipient, @Sender);
END



GO

CREATE PROCEDURE notificationRead
    @NotificationId INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE notifications
    SET is_read = 1
    WHERE notification_id = @NotificationId;
END



GO

CREATE PROCEDURE getNotificationsForRecipient
    @Recipient VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM notifications
    WHERE recipient = @Recipient;
END

--stored procedures for categories tables
GO

CREATE PROCEDURE allCategories
AS
BEGIN
  SELECT * FROM categories
END

EXEC allCategories
GO


CREATE PROCEDURE addCategory
  @name VARCHAR(255),
  @description TEXT
AS
BEGIN
  INSERT INTO categories (name, description)
  VALUES (@name, @description)
END

EXEC addCategory
@name = 'electronics',
@description = 'all electronic devices'
 
GO

CREATE PROCEDURE changeCategory
  @id INT,
  @name VARCHAR(255),
  @description TEXT
AS
BEGIN
  UPDATE categories
  SET name = @name, description = @description
  WHERE id = @id
END

GO

CREATE PROCEDURE removeCategory
  @id INT
AS
BEGIN
  DELETE FROM categories
  WHERE id = @id
END


GO

CREATE PROCEDURE oneCategory
  @id INT
AS
BEGIN
  SELECT * FROM categories
  WHERE id = @id
END



