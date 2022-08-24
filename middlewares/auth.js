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
            res.locals.user = user
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
            res.locals.user = user
            next()
        }
    })(req, res)
}



//Compare JWT User and URL User id, so users can't see other users details
module.exports.checkUser = (req, res, next) => {
    if (res.locals.user._id === req.params.id) {
        next()
    } else {
        return res.status(401).json({ error: "Unauthorized" })
    }
}