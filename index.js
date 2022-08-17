require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())

const PORT = process.env.PORT || 8030








app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
