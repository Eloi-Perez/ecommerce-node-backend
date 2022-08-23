const express = require('express')

const { localAuth, jwtAdminAuth } = require('../middlewares/middlewares')
const cont = require('../controllers/users')

const router = express.Router()

router.post('/signup', cont.registerUser)
router.post('/login', localAuth, cont.loginUser)
// router.post('/logout', cont.logoutUser)
router.put('/update', localAuth, cont.updateUser)
router.put('/disable', localAuth, cont.disableUser)
router.delete('/delete', jwtAdminAuth, cont.deleteUser) //only admin

module.exports = router