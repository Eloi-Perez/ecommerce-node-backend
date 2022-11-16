const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sizes: [{
      name: { type: String },
      price: { type: Number },
      offer: { type: Number, default: 0 },
      available: { type: Boolean, default: true }
    }],
    images: [{
      filename: { type: String },
      priority: { type: Number }
    }],
    description: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Product', ProductSchema)
