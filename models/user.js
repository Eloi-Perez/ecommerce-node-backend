const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { randomBytes } = require('crypto')

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    verification: { type: String, required: false, default: randomBytes(64).toString('hex') },
    resetPassword: {
      token: { type: String },
      expireDate: { type: Date }
    },
    active: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
    expireAt: { type: Date, default: new Date(Date.now() + (1000 * 60 * 60) * 24 * 7) } // 7 days
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
