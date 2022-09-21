const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.resolve(process.cwd() + '/public/img'))
  },
  filename: function (req, file, callback) {
    const ext = path.extname(file.originalname)
    callback(null, file.fieldname + ext)
  }
})

const toStore = multer({ storage: storage })

const uploading = toStore.array('images', 12) // (input name, max)

module.exports.upload = (req, res, next) => {
  uploading(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(500).json({ message: err })      
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(400).json({ message: err })
    }
    next()
  })
}