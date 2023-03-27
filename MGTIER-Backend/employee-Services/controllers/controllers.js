const bcrypt = require('bcrypt');

const sql = require('mssql');
const { sqlConfig } = require('../serverconfig')


module.exports = {
    getUsers:  async (req, res) => {
            try {
                const pool = await sql.connect(sqlConfig);
                const result = await pool.request().query('SELECT * FROM employee');
                res.status(200).json(result.recordset);
            } catch (err) {
                console.error(err);
                res.status(500).send('Server error');
            }
        },
    addEmployee:  async (req, res) => {
        const { full_name, role, phone, email, password, isactive } = req.body;
        try {
          const pool = await sql.connect(sqlConfig);
          const result = await pool
            .request()
            .input('full_name', sql.VarChar(255), full_name)
            .input('role', sql.VarChar(100), role)
            .input('phone', sql.VarChar(20), phone)
            .input('email', sql.VarChar(255), email)
            .input('password', sql.VarChar(255), password)
            .input('isactive', sql.Bit, isactive)
            .execute('AddEmployee');
          res.status(201).json({ message: 'Employee created successfully.' });
        } catch (err) {
          console.error(err);
          res.status(500).send('Server error');
        }},
    deleteEmployee: async (req, res) => {
        const { id } = req.params;
        try {
          const pool = await sql.connect(sqlConfig);
          const result = await pool
            .request()
            .input('id', sql.Int, id)
            .execute('DeleteEmployee');
          if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Employee not found' });
          }
          res.status(200).json({ message: 'Employee deleted successfully' });
        } catch (err) {
          console.error(err);
          res.status(500).send('Server error');
        }
      },
      updateEmployee: async (req, res) => {
        const { id } = req.params;
        const { full_name, role, phone, email, password, isactive } = req.body;
        try {
          const pool = await sql.connect(sqlConfig);
          const result = await pool
            .request()
            .input('id', sql.Int, id)
            .input('full_name', sql.NVarChar(255), full_name)
            .input('role', sql.NVarChar(100), role)
            .input('phone', sql.NVarChar(20), phone)
            .input('email', sql.NVarChar(255), email)
            .input('password', sql.NVarChar(255), password)
            .input('isactive', sql.Bit, isactive)
            .execute('UpdateEmployee');
          if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Employee not found' });
          }
          const updatedEmployee = {
            id,
            full_name,
            role,
            phone,
            email,
            password,
            isactive,
          };
          res.status(200).json(updatedEmployee);
        } catch (err) {
          console.error(err);
          res.status(500).send('Server error');
        }
      }
    
    
    }

