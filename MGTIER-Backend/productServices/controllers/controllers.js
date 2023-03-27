const bcrypt  = require('bcrypt');

const sql = require('mssql');
const { sqlConfig } = require('../serverconfig')


module.exports = {
    // Define route to view all products
viewProduct: async (req, res) => {
    try {
      const pool = await sql.connect(sqlConfig);
      const result = await pool.request().execute('view_all_products');
      res.status(200).json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },
  viewOneProduct: async (req, res) => {
    try {
      // Connect to the database
      await sql.connect(sqlConfig);
      const id = req.params.id;
  
      // Execute the stored procedure with the given id parameter
      const result = await sql.query`EXEC view_product @id=${id}`;
  
      // Return the product data as JSON
      res.json(result.recordset[0]);
    } catch (err) {
      // Handle errors
      console.error(err);
      res.status(500).send('Error retrieving product');
    }
  },
  
  // Define route to add a new product
  addNewProduct:async (req, res) => {
    const { name, price, date_added, in_stock } = req.body;
    try {
      const pool = await sql.connect(sqlConfig);
      const result = await pool
        .request()
        .input('name', sql.NVarChar(255), name)
        .input('price', sql.Decimal(10, 2), price)
        .input('date_added', sql.Date, date_added)
        .input('in_stock', sql.Int, in_stock)
        .execute('add_product');
      const newProduct = {
        id: result.recordset[0].id,
        name,
        price,
        date_added,
        in_stock,
        total_sold: 0,
      };
      res.status(201).json(newProduct);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },
  
  // Define route to update a product's details
  updateProduct: async (req, res) => {
    const { name, price, date_added, in_stock } = req.body;
    try {
      const pool = await sql.connect(sqlConfig);
      const result = await pool
        .request()
        .input('name', sql.NVarChar(255), name)
        .input('price', sql.Decimal(10, 2), price)
        .input('date_added', sql.Date, date_added)
        .input('in_stock', sql.Int, in_stock)
        .execute('add_product');
  
      // Call the view_product stored procedure to get the new product details
      const { id } = result.recordset[0];
      const { recordset: [newProduct] } = await pool
        .request()
        .input('id', sql.Int, id)
        .execute('view_product');
  
      res.status(201).json(newProduct);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },
  
  // Define route to delete a product by ID
 deleteProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const pool = await sql.connect(sqlConfig);
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .execute('delete_product');
      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }}
  
    


