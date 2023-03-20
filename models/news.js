const mongoose = require('mongoose')

const NewsSchema = new mongoose.Schema(
  {
    image: { type: String },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('News', NewsSchema)
