///Compare Passport User and URL :User
module.exports.checkUser = (req, res, next) => {
    if (req.user.Username === req.params.Username) {
        next()
    } else {
        return res.status(401).json({ error: "Unauthorized" })
    }
}