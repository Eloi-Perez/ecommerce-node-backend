const path = require('path')
const { unlink } = require('fs')
const asyncHandler = require('express-async-handler')

const News = require('../models/news')

//Get all news
const getAllNews = asyncHandler(async (req, res) => {
  try {
    const allNews = await News.find()
    res.status(200).json(allNews)
  } catch (error) {
    res.status(400).json(error)
  }
})

//Create news
const createNews = asyncHandler(async (req, res) => {
  const { imageMeta } = req.body // imageMeta = { ext: 'jpg'}
  const newNews = new News()
  const image = `${newNews._id}.${imageMeta.ext}`
  newNews.image = image
  try {
    await newNews.save()
    res.status(200).json(newNews)
  } catch (error) {
    res.status(400).json(error)
  }
})

//Add img  (on frontend this is called after Create news)
const addImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'error; files not stored' })
  } else {
    return res.status(200).json({ message: 'success; files received' })
  }
})

//Delete news
const deleteNews = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const news = await News.findByIdAndRemove(id)
    if (news) {
      const filePath = path.resolve(process.cwd() + '/public/img/news/' + news.image)
      unlink(filePath, (err) => err && console.log(err))
      res.status(200).json({ message: 'News removed' })
    } else {
      res.status(400).json({ message: 'News not found' })
    }
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

module.exports = {
  getAllNews,
  createNews,
  addImage,
  deleteNews,
}
