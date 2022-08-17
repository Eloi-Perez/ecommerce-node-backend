require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 8030








app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
