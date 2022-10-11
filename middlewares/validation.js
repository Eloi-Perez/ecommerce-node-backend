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

const productValidate = (req, res, next) => {
  const array = req.body.images
  // Validate priority
  if (array) {
    const isIntegerPositive = () => {
      return !array.map(el => Number.isInteger(el.priority) && el.priority >= 0).includes(false)
    }
    if (isIntegerPositive()) {
      let seen = new Set()
      const hasDuplicates = array.some((currentObject) => {
        return seen.size === seen.add(currentObject.priority).size
      })
      if (hasDuplicates) {
        return res.status(400).json({ message: 'error; Priority can\'t have duplicated values' })
      } else {
        return next()
      }
    } else {
      return res.status(400).json({ message: 'error; Priority needs to be an integer positive number' })
    }
  } else {
    return next()
  }
}

module.exports = { userValidate, productValidate }
