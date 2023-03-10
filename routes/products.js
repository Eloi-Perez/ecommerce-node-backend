const express = require('express')

const { productValidate } = require('../middlewares/validation')
const { jwtAdminAuth } = require('../middlewares/auth')
const {
  getProduct,
  getAllProducts,
  createProduct,
  addImage,
  updateProduct,
  deleteProduct,
} = require('../controllers/products')
const { uploadArrayImg } = require('../middlewares/disk-storage')

const router = express.Router()

//Public routes
router.get('/', getAllProducts)
router.get('/:id', getProduct)

//Admin routes
router.post('/add', jwtAdminAuth, createProduct)
router.post('/img', jwtAdminAuth, uploadArrayImg, addImage)
router.put('/:id', jwtAdminAuth, productValidate, updateProduct)
router.delete('/:id', jwtAdminAuth, deleteProduct)

module.exports = router
