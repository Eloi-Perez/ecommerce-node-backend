const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    verification: { type: String, required: false, default: crypto.randomBytes(64).toString('hex') },
    active: { type: Boolean, default: false },
    admin: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)

UserSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10)
}

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
