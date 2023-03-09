const asyncHandler = require('express-async-handler')
const { randomBytes } = require('crypto')
const { validationResult } = require('express-validator')

const User = require('../models/user')
const { generateJWT } = require('../utils/helper')
const sendEmail = require('../utils/email/send-email')

//Verify Email
const verifyEmail = asyncHandler(async (req, res) => {
  const { key } = req.query
  try {
    User.findOneAndUpdate(
      { verification: key },
      {
        $set: {
          active: true,
        },
        $unset: {
          verification: 1,
          expireAt: 1,
        },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err)
          res.status(500).json({ err })
        } else {
          if (updatedUser) {
            // TODO: redirect to front-end home page or welcome page
            res.status(200).redirect('http://google.com/search?q=Nice+Welcome+Page')
          } else {
            // TODO: redirect to front-end page with error
            res.status(400).json({ message: 'User not found or User has already been verified' })
          }
        }
      }
    )
  } catch (err) {
    console.error(err)
    res.status(400).json(err)
  }
})

//Get user
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    res.status(200).json({
      id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      active: user.active,
      admin: user.admin,
    })
  } catch (error) {
    res.status(400).json(error)
  }
})

//Get all users (only Admin)
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const allUsers = await User.find()
    allUsers.forEach((user) => {
      user.password = ''
    })
    res.status(200).json(allUsers)
  } catch (error) {
    res.status(400).json(error)
  }
})

//Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, email, password } = req.body
  const validationErrors = validationResult(req)
  const hashedPassword = User.hashPassword(password)
  const newUser = new User({ name, surname, email, password: hashedPassword })

  try {
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        errors: validationErrors.array(),
      })
    }
    User.findOne({ email: email }).then((user) => {
      if (user) {
        return res.status(400).json({
          message: 'Email already taken',
        })
      } else {
        newUser.save()
        // Send Verification Email
        // const link = () => {
        //   return `${process.env.BASE_URL}/users/verify?key=${newUser.verification}`
        // }
        // const content = () => {
        //   return /*html*/`Thank you for registering. <a href=${link()}>Please click here to verify your email</a>`
        // }
        // const email = {
        //   to: newUser.email,
        //   subject: 'Account verification',
        //   message: content()
        // }
        // sendEmail(email, false)
        //   .then((msg) => res.status(200).json({ name: newUser.name, surname: newUser.surname, email: newUser.email }))
        //   .catch((err) => res.status(400).json({ err }))
        console.log('this is where the email is sent in production') //-------------------testing
        res.status(200).json({ name: newUser.name, surname: newUser.surname, email: newUser.email }) //-------------------testing
      }
    })
  } catch (error) {
    res.status(400).json(error)
  }
})

//Login User
const loginUser = asyncHandler(async (req, res) => {
  const user = res.locals.user
  req.login(user, { session: false }, (error) => {
    if (error) {
      res.json({ Error: error })
    }
    let payload = {}
    payload._id = user._id
    payload.email = user.email
    let token = generateJWT(payload)
    return res.json({ email: user.email, token })
  })
})

//Reset User Password
const resetPassword = asyncHandler(async (req, res) => {
  const { email, resetToken, newPassword } = req.body
  console.log('resetPassword') //-------------------testing
  try {
    if (email && !resetToken) {
      console.log('first') //-------------------testing
      // First request
      const newToken = randomBytes(60).toString('hex')
      User.findOneAndUpdate(
        { email: email },
        {
          $set: {
            resetPassword: {
              token: newToken,
              expireDate: new Date(Date.now() + 60 * 60 * 1000), // now + 1h
            },
          },
        },
        { new: true },
        (err, updatedUser) => {
          if (updatedUser) {
            // Send Reset Email
            // const link = () => {
            //   return `http://front-end-page-with-form-to-send-new-password?key=${newToken}`
            // }
            // const content = () => {
            //   return /*html*/`We are sorry you lost your password. <a href=${link()}>Please click here to reset your password</a><br>This link will expire in 1h`
            // }
            // const email = {
            //   to: updatedUser.email,
            //   subject: 'Password reset',
            //   message: content()
            // }
            // sendEmail(email, false)
            //     .then((msg) => res.status(200).json({ message: 'Email sent' }))
            //     .catch((err) => res.status(400).json({ err }))
            console.log('trust me, the email was sent') //-------------------testing
            res.status(200).json({ message: 'Email sent' }) //-------------------testing
          } else {
            // User not found -> 200 for security reasons
            res.status(200).json({ message: 'Email sent' })
          }
        }
      )
    } else if (resetToken && newPassword) {
      console.log('second') //-------------------testing
      // Second request
      const user = await User.findOne({ 'resetPassword.token': resetToken })
      if (!user) {
        res.status(400).json({ message: 'invalid token' })
      } else if (user.resetPassword.expireDate.getTime() < Date.now()) {
        // has elapsed more than 1h
        user.resetPassword = undefined
        await user.save()
        res.status(400).json({ message: 'invalid token, delete all!' })
      } else if (user) {
        user.resetPassword = undefined
        const hashedPassword = User.hashPassword(newPassword)
        user.password = hashedPassword
        await user.save()
        // const content = () => {
        //   return /*html*/`Your password has been changed.`
        // }
        // const email = {
        //   to: user.email,
        //   subject: 'Password updated',
        //   message: content()
        // }
        console.log('trust me, the email was sent (success new password)') //-------------------testing
        res.status(200).json({ message: 'success, you should get redirected' }) //-------------------testing
        // sendEmail(email)
        // res.status(200).redirect('http://login-page')
      }
    } else {
      res.status(400).json({ message: 'Error' })
    }
  } catch (error) {
    res.status(400).json(error)
  }
})

//Update User Details
const updateUser = asyncHandler(async (req, res) => {
  const { email, password, newName, newSurname, newEmail, newPassword } = req.body
  let hashedPassword
  if (newPassword) {
    hashedPassword = User.hashPassword(newPassword)
  }
  User.findOneAndUpdate(
    { email: email },
    {
      $set: {
        name: newName,
        surname: newSurname,
        email: newEmail,
        password: hashedPassword,
      },
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err)
        res.status(500).json({ err })
      } else {
        if (updatedUser) {
          res.status(200).json({
            message: 'Updated Successfully',
            email: updatedUser.email,
          })
        } else {
          res.status(400).json({ message: email + ' was not found' })
        }
      }
    }
  )
})

//Disable User
const disableUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  User.findOneAndUpdate(
    { email: email },
    {
      $set: {
        active: false,
      },
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err)
        res.status(500).json({ err })
      } else {
        if (updatedUser) {
          res.status(200).json({
            message: "Account 'deleted' (disabled)",
            email: updatedUser.email,
          })
        } else {
          res.status(400).json({ message: email + ' was not found' })
        }
      }
    }
  )
})

//Delete User
const deleteUser = asyncHandler(async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOneAndRemove({ email: email })
    if (user) {
      res.status(200).json({ message: 'User removed' })
    } else {
      res.status(400).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

module.exports = {
  verifyEmail,
  getUser,
  getAllUsers,
  registerUser,
  loginUser,
  resetPassword,
  updateUser,
  disableUser,
  deleteUser,
}
