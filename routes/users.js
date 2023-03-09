const express = require('express')

const { userValidate } = require('../middlewares/validation')
const { localAuth, jwtAuth, jwtAdminAuth, checkUser } = require('../middlewares/auth')
const {
  verifyEmail,
  getUser,
  getAllUsers,
  registerUser,
  loginUser,
  resetPassword,
  updateUser,
  disableUser,
  deleteUser,
} = require('../controllers/users')

const router = express.Router()

//User routes
router.get('/verify', verifyEmail)
router.get('/:id', jwtAuth, checkUser, getUser)
router.post('/signup', userValidate, registerUser)
router.post('/login', localAuth, loginUser)
router.post('/reset', resetPassword)
router.put('/update', localAuth, updateUser)
router.put('/disable', localAuth, disableUser)

//Admin routes
router.get('/', jwtAdminAuth, getAllUsers)
router.get('/admin/:id', jwtAdminAuth, getUser)
router.put('/admin/update', jwtAdminAuth, updateUser)
router.put('/admin/disable', jwtAdminAuth, disableUser)
router.delete('/admin/delete', jwtAdminAuth, deleteUser)

module.exports = router
