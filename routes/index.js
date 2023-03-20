const router = require('express').Router()

const productsRoutes = require('./products')
const ingredientsRoutes = require('./ingredients')
const usersRoutes = require('./users')
const emailRoutes = require('./email')
const newsRoutes = require('./news')

router.use('/products', productsRoutes)
router.use('/ingredients', ingredientsRoutes)
router.use('/users', usersRoutes)
router.use('/email', emailRoutes)
router.use('/news', newsRoutes)

module.exports = router
