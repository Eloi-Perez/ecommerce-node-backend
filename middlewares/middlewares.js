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

module.exports.jwtAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, user, info) => {
        if (error || !user) {
            return res.status(400).json(info)
        } else {
            next()
        }
    })(req, res)
}

module.exports.jwtAdminAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, user, info) => {
        if (error || !user) {
            return res.status(400).json(info)
        } else if (!user.admin) {
            return res.status(400).json({ message: "not authorized" })
        } else {
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