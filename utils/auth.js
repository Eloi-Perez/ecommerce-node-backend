const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require('passport-jwt')

const User = require('../models/user')

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, callback) => {
      console.log('Logging in: ' + email)
      User.findOne({ email: email }, (error, user) => {
        if (error) {
          console.log(error)
          return callback(error)
        }

        // if (!user) {
        //   console.log('incorrect user')
        //   return callback(null, false, { message: 'incorrect user' })
        // }

        // if (!user.validatePassword(password)) {
        //   console.log('incorrect password')
        //   return callback(null, false, { message: 'incorrect password' })
        // }

        if (!user.active) {
          console.log('disabled user')
          return callback(null, false, { message: 'incorrect user' })
        }

        console.log('finished login')
        return callback(null, user)
      })
    }
  )
)

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY
    },
    (jwtPayload, callback) => {
      return User.findById(jwtPayload._id)
        .then(user => {
          if (!user.active) {
            console.log('disabled user')
            return callback(null, false, {
              message: 'your user has been disabled'
            })
          }
          return callback(null, user)
        })
        .catch(error => {
          return callback(error)
        })
    }
  )
)
