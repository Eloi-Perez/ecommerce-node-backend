const Product = require('../models/product')
const asyncHandler = require('express-async-handler')

//GET ONE PRODUCT
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const oneProduct = await Product.findById(id)
    req.status(200).json(oneProduct)
  } catch (error) {
    req.status(400).json(error)
  }
})

//GET ALL PRODUCTS
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const allProducts = await Product.find()
    res.status(200).json(allProducts)
  } catch (error) {
    res.status(400).json(error)
  }
})

//CREATE ONE PRODUCT
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, image, description, id } = req.body
  const newProduct = new Product({ name, price, image, description, id })

  try {
    await newProduct.save()
    res.status(200).json(newProduct)
  } catch (error) {
    res.status(400).json(error)
  }
})

//UPDATE ONE PRODUCT
const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, description, price, id } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.image = image
    product.description = description
    product.price = price
    product.id = id
    try {
      const updatedProduct = await product.save()
      res.status(200).json(updatedProduct)
    } catch (error) {
      res.status(400).json(error)
    }
  }
})

//DELETE ONE PRODUCT
const deleteProduct = async (req, res) => {
  const { id } = req.params
  await Product.findByIdAndRemove(id)
  try {
    res.status(300).json({ message: 'Product is removed' })
  } catch (error) {
    res.status(400).json({ message: error })
  }
}

module.exports = {
  getProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
}