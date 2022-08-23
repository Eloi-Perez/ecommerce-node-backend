const passport = require('passport')

require("../utils/auth")

module.exports.localAuth = (req, res, next) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
        if (error || !user) {
            return res.status(400).json(info)
        } else {
            res.locals.user = user
            next()
        }
    })(req, res)
}



///Compare Passport User and URL :User
module.exports.checkUser = (req, res, next) => {
    if (req.user.Username === req.params.Username) {
        next()
    } else {
        return res.status(401).json({ error: "Unauthorized" })
    }
}