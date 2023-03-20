const express = require('express')

// const { productValidate } = require('../middlewares/validation')
const { jwtAdminAuth } = require('../middlewares/auth')
const {
  getAllNews,
  createNews,
  addImage,
  deleteNews,
} = require('../controllers/news')
const { uploadImgNews } = require('../middlewares/disk-storage')

const router = express.Router()

//Public routes
router.get('/', getAllNews)

//Admin routes
router.post('/add', jwtAdminAuth, createNews)
router.post('/img', jwtAdminAuth, uploadImgNews, addImage)
router.delete('/:id', jwtAdminAuth, deleteNews)

module.exports = router
