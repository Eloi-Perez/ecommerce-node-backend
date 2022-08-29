const asyncHandler = require('express-async-handler')

const User = require('../models/user')
const { generateJWT } = require('../utils/helper')

//Get user
const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        res.status(200).json({
            id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email
        })
    } catch (error) {
        res.status(400).json(error)
    }
})

//Get all users (only Admin)
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const allUsers = await User.find()
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(400).json(error)
    }
})

//Register User
const registerUser = asyncHandler(async (req, res) => {
    const { name, surname, email, password } = req.body
    //TODO check if valid email
    const hashedPassword = User.hashPassword(password)
    const newUser = new User({ name, surname, email, password: hashedPassword })

    try {
        User.findOne({ email: email })
            .then((user) => {
                if (user) {
                    return res.status(400).json({
                        message: "Email already taken",
                    })
                } else {
                    newUser.save()
                    res.status(200).json({ name: newUser.name, surname: newUser.surname, email: newUser.email })
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

//Logout
// const logoutUser = asyncHandler(async (req, res) => {
// })

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
        { new: true, omitUndefined: true },
        (err, updatedUser) => {
            if (err) {
                console.error(err)
                res.status(500).json({ err })
            } else {
                if (updatedUser) {
                    res.status(200).json({
                        message: "Updated Successfully",
                        email: updatedUser.email,
                    })
                } else {
                    res.status(400).json({ message: email + " was not found" })
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
        { new: true, omitUndefined: true },
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
                    res.status(400).json({ message: email + " was not found" })
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
    getUser,
    getAllUsers,
    registerUser,
    loginUser,
    // logoutUser,
    updateUser,
    disableUser,
    deleteUser
}