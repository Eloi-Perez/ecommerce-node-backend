const router = require('express').Router()

const productsRoutes = require('./products')
const usersRoutes = require('./users')
const emailRoutes = require('./email')

router.use('/products', productsRoutes)
router.use('/users', usersRoutes)
router.use('/email', emailRoutes)

module.exports = router
