require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')

const usersRouter = require('./routes/users')
const productsRouter = require('./routes/products')

const app = express()

mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => { console.log('Connected to MongoDB') })
  .catch(() => { console.log('Failed to connect to MongoDB') })

app.use(cors()) // TODO options for production
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())

app.use('/img', express.static(path.join(__dirname, 'public/img')))

app.use('/users', usersRouter)
app.use('/products', productsRouter)

app.use((req, res, next) => {
  res.status(404).json({ message: '404, endpoint not found' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
