const router = require('express').Router()


const {getUsers, 
        addEmployee, 
        deleteEmployee,
        updateEmployee} = require('../controllers/controllers')

router.get('/employee', getUsers)
router.post('/employee', addEmployee)
router.delete('/employee/:id', deleteEmployee)
router.post('/edit/:id', updateEmployee)

  module.exports = router