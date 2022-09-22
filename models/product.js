const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{
      URL: { type: String },
      priority: { type: Number }
    }],
    description: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Product', ProductSchema)
