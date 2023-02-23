const asyncHandler = require('express-async-handler')

const contactEmail = require('../utils/email/contact-email')

const contactForm = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, message } = req.body
  try {
    // Send Email
    const content = () => {
      return /*html*/`${firstName} ${lastName}<br>${email}<br>${message}`
    }
    const emailWrap = {
      subject: 'Contact Form',
      name: `${firstName} ${lastName}`,
      clientEmail: email,
      message: content(),
    }
    contactEmail(emailWrap, true)
      .then((message) => res.status(200).json({ message }))
      .catch((err) => res.status(400).json({ err }))
  } catch (err) {
    console.error(err)
    res.status(400).json(err)
  }
})

module.exports = {
  contactForm
}