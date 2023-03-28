const router = require('express').Router()

const { createNotification, allNotification, getANotification, updateNotification } = require('../controllers/controllers')

router.put('/notification', createNotification)
router.get('/notification', allNotification )
router.get('/notification/:id', getANotification)
router.post('/notification/:id', updateNotification)

  module.exports = router