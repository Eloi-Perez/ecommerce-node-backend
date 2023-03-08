const asyncHandler = require('express-async-handler')

const Ingredient = require('../models/ingredient')

//Get all ingredients
const getAllIngredients = asyncHandler(async (req, res) => {
  try {
    const allIngredients = await Ingredient.find()
    res.status(200).json(allIngredients)
  } catch (error) {
    res.status(400).json(error)
  }
})

//Create ingredient
const createIngredient = asyncHandler(async (req, res) => {
  const { name, description, imagesMeta } = req.body // imagesMeta = { ext: 'jpg'}
  const newIngredient = new Ingredient({ name, description })
  const image = `${newIngredient._id}.${imagesMeta.ext}`
  newIngredient.image = image
  try {
    await newIngredient.save()
    res.status(200).json(newIngredient)
  } catch (error) {
    res.status(400).json(error)
  }
})

//Add img
// use the endpoint from products?
// Check if it works with a single image

//Delete ingredient
const deleteIngredient = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const ingredient = await Ingredient.findByIdAndRemove(id)
    if (ingredient) {
      const filePath = path.resolve(process.cwd() + '/public/img/' + ingredient.image)
      unlink(filePath, (err) => err && console.log(err))
      res.status(200).json({ message: 'Ingredient removed' })
    } else {
      res.status(400).json({ message: 'Ingredient not found' })
    }
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

module.exports = {
  getAllIngredients,
  createIngredient,
  deleteIngredient,
}
