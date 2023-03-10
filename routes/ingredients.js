const express = require('express')

// const { productValidate } = require('../middlewares/validation')
const { jwtAdminAuth } = require('../middlewares/auth')
const {
  getAllIngredients,
  createIngredient,
  addImage,
  deleteIngredient,
} = require('../controllers/ingredients')
const { uploadImg } = require('../middlewares/disk-storage')

const router = express.Router()

//Public routes
router.get('/', getAllIngredients)

//Admin routes
router.post('/add', jwtAdminAuth, createIngredient)
router.post('/img', jwtAdminAuth, uploadImg, addImage)
// router.put('/:id', jwtAdminAuth, productValidate, updateProduct)
router.delete('/:id', jwtAdminAuth, deleteIngredient)

module.exports = router
