const bcrypt  = require('bcrypt');

const sql = require('mssql');
const { sqlConfig } = require('../serverconfig')


module.exports = {
    
    createNotification: async (req, res) => {
        const { employee_id, message } = req.body;
        try {
           await sql.connect(sqlConfig);
          const result = await sql.request()
            .input('employee_id', sql.Int, employee_id)
            .input('message', sql.NVarChar(255), message)
            .execute('add_notification');
          const newNotification = {
            id: result.recordset[0].id,
            employee_id,
            message,
            created_at: result.recordset[0].created_at,
            is_read: result.recordset[0].is_read,
          };
          res.status(201).json(newNotification);
        } catch (err) {
          console.error(err);
          res.status(500).send('Server error');
        }
      },
      
      // Get all notifications
      allNotification: async (req, res) => {
        try {
          await sql.connect(sqlConfig);
          const result = await request().execute('get_notifications');
          res.json(result.recordset);
        } catch (err) {
          console.error(err);
          res.status(500).send('Server error');
        }
      },
      
      // Get a notification by ID
      getANotification: async (req, res) => {
        const { id } = req.params;
        try {
          await sql.connect(sqlConfig);
          const result = await sql.request()
            .input('id', sql.Int, id)
            .execute('get_notification_by_id');
          if (result.recordset.length === 0) {
            return res.status(404).send('Notification not found');
          }
          res.json(result.recordset[0]);
        } catch (err) {
          console.error(err);
          res.status(500).send('Server error');
        }
      },
      
      // Update a notification by ID
     updateNotification: async (req, res) => {
        const { id } = req.params;
        const { is_read } = req.body;
        try {
          await sql.connect(sqlConfig);
          const result = await sql.request()
            .input('id', sql.Int, id)
            .input('is_read', sql.Bit, is_read)
            .execute('update_notification');
          if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Notification not found');
          }
          res.sendStatus(204);
        } catch (err) {
          console.error(err);
          res.status(500).send('Server error');
        }
      }
}

