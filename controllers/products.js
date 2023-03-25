const path = require('path')
const { unlink } = require('fs')
const asyncHandler = require('express-async-handler')

const Product = require('../models/product')

//Get product
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const oneProduct = await Product.findById(id).populate('ingredients')
    if (oneProduct) {
      res.status(200).json(oneProduct)
    } else {
      res.status(400).json({ message: 'Product not found' })
    }
  } catch (error) {
    res.status(400).json(error)
  }
})

//Get all products
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const allProducts = await Product.find().populate('ingredients')
    res.status(200).json(allProducts)
  } catch (error) {
    res.status(500).json(error)
  }
})

//Create product
const createProduct = asyncHandler(async (req, res) => {
  const { name, sizes, description, imagesMeta } = req.body // imagesMeta = [{priority: 0, ext: 'jpg'}]
  const newProduct = new Product({ name, sizes, description })
  for (let i = 0; i < imagesMeta.length; i++) {
    let newObject = {
      filename: newProduct._id + '_' + i + '.' + imagesMeta[i].ext,
      priority: imagesMeta[i].priority,
    }
    newProduct.images.push(newObject)
  }
  try {
    await newProduct.save()
    res.status(200).json(newProduct)
  } catch (error) {
    res.status(500).json(error)
  }
})

//Add img  (on frontend this is called after Create One Product)
const addImage = asyncHandler(async (req, res) => {
  if (!req.files) {
    return res.status(500).json({ message: 'error; files not stored' })
  } else {
    return res.status(200).json({ message: 'success; files received' })
  }
})

//Update product
const updateProduct = asyncHandler(async (req, res) => {
  const { name, sizes, images, description, imagesMeta, ingredients } = req.body
  Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: name,
        sizes: sizes,
        // for updating priority, if new image you need to reupload them all with imagesMeta
        images: images,
        description: description,
        ingredients: ingredients,
      },
    },
    { new: true },
    (err, updatedProduct) => {
      if (err) {
        console.error(err)
        res.status(500).json({ err })
      } else {
        if (updatedProduct) {
          if (imagesMeta) {
            //delete old
            updatedProduct.images.forEach((e) => {
              const filePath = path.resolve(process.cwd() + '/public/img/products/' + e.filename)
              unlink(filePath, (err) => err && console.log(err))
            })
            //update "images" with new routes
            updatedProduct.images = []
            for (let i = 0; i < imagesMeta.length; i++) {
              let newObject = {
                filename: updatedProduct._id + '_' + i + '.' + imagesMeta[i].ext,
                priority: imagesMeta[i].priority,
              }
              updatedProduct.images.push(newObject)
            }
            updatedProduct.save()
          }

          res.status(200).json(updatedProduct)
        } else {
          res.status(400).json({ message: req.params.id + ' was not found' })
        }
      }
    }
  )
})

//Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const product = await Product.findByIdAndRemove(id)
    if (product) {
      product.images.forEach((e) => {
        const filePath = path.resolve(process.cwd() + '/public/img/products/' + e.filename)
        unlink(filePath, (err) => err && console.log(err))
      })
      res.status(200).json({ message: 'Product removed' })
    } else {
      res.status(400).json({ message: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

module.exports = {
  getProduct,
  getAllProducts,
  createProduct,
  addImage,
  updateProduct,
  deleteProduct,
}
