const express = require('express')
// const checkAuth = require('../middleware/checkAuth')
// const userControllers = require('../controllers/users')
const router = express.Router()

router.post('/signup', userControllers.userRegister)
router.post('/login', userControllers.userLogin)
router.post('/logout', checkAuth, userControllers.userLogout)
router.put('/', checkAuth, userControllers.userUpdate)
router.delete('/', checkAuth, userControllers.userDelete)

module.exports = router