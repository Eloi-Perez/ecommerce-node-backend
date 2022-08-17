const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

app.use(cors())

const PORT = 8030









app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
