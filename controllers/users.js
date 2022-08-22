const asyncHandler = require('express-async-handler')
const User = require('../models/user')


//Register User
const registerUser = asyncHandler(async (req, res) => {
    const { name, surname, email, password } = req.body
    //TODO check if valid email
    const hashedPassword = User.hashPassword(password)
    const newUser = new User({ name, surname, email, password: hashedPassword })

    try {
        User.findOne({ email: email })
            .then((email) => {
                if (email) {
                    return res.status(400).json({
                        message: "Email already taken",
                    });
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

})

//Logout?
const logoutUser = asyncHandler(async (req, res) => {

})

//Update User Details
const updateUser = asyncHandler(async (req, res) => {
    // const { email, password, newName, newSurname, newEmail, newPassword } = req.body
    // let hashedPassword;
    // if (newPassword) {
    //     hashedPassword = User.hashPassword(newPassword)
    // }
    // User.findOneAndUpdate(
    //     { email: email },
    //     {
    //         $set: {
    //             name: newName,
    //             surname: newSurname,
    //             email: newEmail,
    //             password: hashedPassword,
    //         },
    //     },
    //     { new: true, omitUndefined: true },
    //     (err, updatedUser) => {
    //         if (err) {
    //             console.error(err);
    //             res.status(500).json({ err })
    //         } else {
    //             if (updatedUser) {
    //                 res.status(200).json({
    //                     message: "Updated Successfully",
    //                     email: updatedUser.email,
    //                 });
    //             } else {
    //                 res.status(400).json({ message: email + " was not found" })
    //             }
    //         }
    //     }
    // )
})

//Disable User
const disableUser = asyncHandler(async (req, res) => {

})

//Delete User
const deleteUser = async (req, res) => {
    // const { email } = req.params
    // try {
    //     await User.findOneAndRemove({ email })
    //     res.status(300).json({ message: 'User removed' })
    // } catch (error) {
    //     res.status(400).json({ message: error })
    // }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    updateUser,
    disableUser,
    deleteUser
}