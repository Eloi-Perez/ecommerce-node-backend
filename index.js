require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// const usersRouter = require('./routes/users')
// const productsRouter = require('./routes/products')

const app = express()
app.use(express.json())
app.use(cors())

// app.use('/users', usersRouter)
// app.use('/products', productsRouter)






const PORT = process.env.PORT || 8030
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
