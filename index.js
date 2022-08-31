require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const app = express()

const usersRouter = require('./routes/users')
const productsRouter = require('./routes/products')

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log('MongoDB connection is successful')
  })
  .catch(() => {
    console.log('MongoDB connection is failed')
  })

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(passport.initialize())

app.use('/users', usersRouter)
app.use('/products', productsRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
