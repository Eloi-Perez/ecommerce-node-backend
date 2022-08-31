const { body } = require('express-validator')

const userValidate = [
  body('name')
    .trim()
    .exists()
    .withMessage('Name is required'),
  body('surname')
    .trim()
    .exists()
    .withMessage('Surname is required')
    .isLength({ min: 4 })
    .withMessage('Surname should be at least 4 characters'),
  body('password')
    .trim()
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 5, max: 10 })
    .withMessage('Password should be at least 5 characters'),
  body('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Provide valid email')
    .normalizeEmail()
    .trim()
]

module.exports = { userValidate }
