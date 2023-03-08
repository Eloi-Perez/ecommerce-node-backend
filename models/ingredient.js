const mongoose = require('mongoose')

const IngredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Ingredient', IngredientSchema)
