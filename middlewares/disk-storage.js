const multer = require('multer')
const path = require('path')

// Products
const storageProducts = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(process.cwd() + '/public/img/products'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
const toStoreProducts = multer({ storage: storageProducts })
const uploadingArrayProducts = toStoreProducts.array('images', 12) // (input-name, max)
const uploadArrayImgProducts = (req, res, next) => {
  uploadingArrayProducts(req, res, function (err) {
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

// Ingredients
const storageIngredients = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(process.cwd() + '/public/img/ingredients'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
const toStoreIngredients = multer({ storage: storageIngredients })
const uploadingSingleIngredients = toStoreIngredients.single('image')
const uploadImgIngredients = (req, res, next) => {
  uploadingSingleIngredients(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: err })
    } else if (err) {
      return res.status(400).json({ message: err })
    }
    next()
  })
}

// News
const storageNews = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(process.cwd() + '/public/img/news'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
const toStoreNews = multer({ storage: storageNews })
const uploadingSingleNews = toStoreNews.single('image')
const uploadImgNews = (req, res, next) => {
  uploadingSingleNews(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: err })
    } else if (err) {
      return res.status(400).json({ message: err })
    }
    next()
  })
}



module.exports = {
  uploadArrayImgProducts,
  uploadImgIngredients,
  uploadImgNews,
}
