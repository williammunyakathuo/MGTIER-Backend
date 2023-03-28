const router = require('express').Router()

const { viewProduct, addNewProduct, deleteProduct, viewOneProduct } = require('../controllers/controllers')

router.get('/product', viewProduct)
router.get('/product/:id', viewOneProduct)
router.post('/products', addNewProduct)
router.delete('/products/:id', deleteProduct)
router.post('/products/:id', addNewProduct)

  module.exports = router