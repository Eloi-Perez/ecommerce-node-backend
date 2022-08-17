const jwt = require("jsonwebtoken")

module.exports.generateJWT = (payload) => {
	return jwt.sign(payload, process.env.JWT_KEY, {
		subject: payload.Username,
		expiresIn: "14d",
		algorithm: "HS256",
	})
}

module.exports.err500 = (err) => {
	console.error(err)
	res.status(500).json({ error: err })
}

///Compare Passport User and URL :User
module.exports.checkUser = (req, res, next) => {
	if (req.user.Username === req.params.Username) {
		next()
	} else {
		return res.status(401).json({ error: "Unauthorized" })
	}
}