const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require('passport-jwt')

const User = require('../models/user')

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

passport.use(new LocalStrategy({
	emailField: 'email',
	passwordField: 'password'
}, (email, password, callback) => {
	console.log('Logging in: ' + email);
	User.findOne({ email: email }, (error, email) => {
		if (error) {
			console.log(error)
			return callback(error)
		}

		if (!email) {
			console.log('incorrect user')
			return callback(null, false, { message: 'Incorrect user.' })
		}

		if (!email.validatePassword(password)) {
			console.log('incorrect password')
			return callback(null, false, { message: 'Incorrect password.' })
		}

		console.log('finished login')
		return callback(null, email)
	})
}))

passport.use(new JWTStrategy({
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_KEY
}, (jwtPayload, callback) => {
	return User.findById(jwtPayload._id)
		.then((email) => {
			return callback(null, email)
		})
		.catch((error) => {
			return callback(error)
		})
}))