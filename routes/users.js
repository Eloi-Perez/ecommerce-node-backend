const express = require('express')

const midd = require('../middlewares/middlewares')
const cont = require('../controllers/users')

const router = express.Router()

router.post('/signup', cont.registerUser)
router.post('/login', midd.localAuth, cont.loginUser)
// router.post('/logout', cont.logoutUser)
router.put('/update', midd.localAuth, cont.updateUser)
router.put('/disable', midd.localAuth, cont.disableUser)
router.delete('/delete', cont.deleteUser) //only admin

module.exports = router