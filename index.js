require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

// const usersRouter = require('./routes/users')
const productsRouter = require('./routes/products')

mongoose
  .connect(process.env.CONNECTION_URI, {})
  .then(() => {
    console.log('MongoDB connection is successful')
  })
  .catch(() => {
    console.log('MongoDB connection is failed')
  })


app.use(cors())
app.use(express.json())


// app.use('/users', usersRouter)
app.use('/products', productsRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
