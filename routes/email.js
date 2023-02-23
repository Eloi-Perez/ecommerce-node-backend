const express = require('express')

const { contactForm } = require('../controllers/email')

const router = express.Router()


router.post('/contact', contactForm)


module.exports = router
