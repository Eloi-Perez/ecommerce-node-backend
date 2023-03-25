const path = require('path')
const { unlink } = require('fs')
const asyncHandler = require('express-async-handler')

const Ingredient = require('../models/ingredient')
const Product = require('../models/product')

//Get all ingredients
const getAllIngredients = asyncHandler(async (req, res) => {
  try {
    const allIngredients = await Ingredient.find()
    res.status(200).json(allIngredients)
  } catch (error) {
    res.status(500).json(error)
  }
})

//Create ingredient
const createIngredient = asyncHandler(async (req, res) => {
  const { name, description, imageMeta } = req.body // imageMeta = { ext: 'jpg'}
  const newIngredient = new Ingredient({ name, description })
  const image = `${newIngredient._id}.${imageMeta.ext}`
  newIngredient.image = image
  try {
    await newIngredient.save()
    res.status(200).json(newIngredient)
  } catch (error) {
    res.status(500).json(error)
  }
})

//Add img  (on frontend this is called after Create ingredient)
const addImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(500).json({ message: 'error; files not stored' })
  } else {
    return res.status(200).json({ message: 'success; files received' })
  }
})

//Delete ingredient
const deleteIngredient = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const ingredient = await Ingredient.findByIdAndRemove(id)
    if (ingredient) {
      const filePath = path.resolve(process.cwd() + '/public/img/ingredients/' + ingredient.image)
      unlink(filePath, (err) => err && console.log(err))
      // Delete reference on products
      console.log(ingredient)
      const allProducts = await Product.find({ ingredients: id })
      if (allProducts) {
        allProducts.forEach(async (_, i) => {
          await allProducts[i].ingredients.pull(
            allProducts[i].ingredients.find((el) => el.toString() === id)
          )
          await allProducts[i].save()
        })
      }
      res.status(200).json({ message: 'Ingredient removed' })
    } else {
      res.status(400).json({ message: 'Ingredient not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'error' })
  }
})

module.exports = {
  getAllIngredients,
  createIngredient,
  addImage,
  deleteIngredient,
}
