const express = require('express')
// const checkAuth = require('../middleware/checkAuth')
// const productControllers = require('../controllers/products')
const router = express.Router()

router.get('/', productControllers.ProductAll)
router.get('/:Product', productControllers.ProductDetails)

//Admin Auth
router.post('/add', checkAuth, productControllers.ProductRegister)
router.put('/:Product', checkAuth, productControllers.ProductUpdate)
router.delete('/:Product/delete', checkAuth, productControllers.ProductDelete)

module.exports = router