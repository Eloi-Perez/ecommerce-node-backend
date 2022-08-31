const { body } = require('express-validator')

const userValidate = [
  body('name')
    .trim()
    .exists()
    .withMessage('Name is required'),
  body('surname')
    .trim()
    .exists()
    .withMessage('Surname is required'),
  body('password')
    .trim()
    .exists()
    .withMessage('Password is required')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/)
    .withMessage('The password should be between 6 and 20 characters, include numbers, uppercase, lowercase and on of (@$!%*?&)'),
  body('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Provide valid email')
    .normalizeEmail({ gmail_remove_dots: false, gmail_convert_googlemaildotcom: false })
    .trim()
]

module.exports = { userValidate }
