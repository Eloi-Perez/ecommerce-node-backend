const express = require('express')
const router = express.Router()

//add auth after testing
// const checkAuth = require('../middleware/checkAuth')
const {
  getProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products')

router.get('/', getAllProducts)
router.get('/:id', getProduct)

//Admin Auth
router.post('/add', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
// router.post('/add', checkAuth, createProduct)
// router.put('/:id', checkAuth, updateProduct)
// router.delete('/:id', checkAuth, deleteProduct)

module.exports = router
