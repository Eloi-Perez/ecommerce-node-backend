require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')

const usersRouter = require('./routes/users')
const productsRouter = require('./routes/products')

const app = express()

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => { console.log('MongoDB connection is successful') })
  .catch(() => { console.log('MongoDB connection is failed') })

app.use(cors()) // TODO options for production
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())

app.use('/users', usersRouter)
app.use('/products', productsRouter)

app.use((req, res, next) => {
  res.status(404).json({ message: '404, endpoint not found' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
