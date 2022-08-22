const express = require('express')
// const checkAuth = require('../middleware/checkAuth')
const userControllers = require('../controllers/users')

const router = express.Router()

router.post('/signup', userControllers.registerUser)
router.post('/login', userControllers.loginUser)
router.post('/logout', userControllers.logoutUser)
router.put('/update', userControllers.updateUser)
router.put('/disable', userControllers.disableUser)
router.delete('/delete', userControllers.deleteUser)
// router.delete('/', checkAuth, userControllers.deleteUser)

module.exports = router