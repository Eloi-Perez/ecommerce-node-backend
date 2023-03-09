const jwt = require('jsonwebtoken')

module.exports.generateJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_KEY, {
    subject: payload.email,
    expiresIn: '14d',
    algorithm: 'HS256',
  })
}
