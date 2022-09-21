const express = require('express')

const { jwtAdminAuth } = require('../middlewares/auth')
const {
  getProduct,
  getAllProducts,
  createProduct,
  addImage,
  updateProduct,
  deleteProduct
} = require('../controllers/products')
const { upload } = require('../middlewares/disk-storage')

const router = express.Router()

//Public routes
router.get('/', getAllProducts)
router.get('/:id', getProduct)

//Admin routes
router.post('/add', jwtAdminAuth, createProduct)
router.post('/img', jwtAdminAuth, upload, addImage)
router.put('/:id', jwtAdminAuth, updateProduct)
router.delete('/:id', jwtAdminAuth, deleteProduct)

module.exports = router
