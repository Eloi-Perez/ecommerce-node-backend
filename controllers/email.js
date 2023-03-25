const asyncHandler = require('express-async-handler')

const contactEmail = require('../utils/email/contact-email')

const contactForm = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, message } = req.body
  // TODO validation and take in account that lastName is not required
  try {
    // Send Email
    const content = () => {
      return /*html*/ `${firstName} ${lastName}<br>${email}<br>${message}`
    }
    const emailWrap = {
      subject: 'Contact Form',
      name: `${firstName} ${lastName}`,
      clientEmail: email,
      message: content(),
    }
    contactEmail(emailWrap, true)
      .then((message) => res.status(200).json({ message }))
      .catch((err) => res.status(500).json({ err }))
    // throw new Error('Error!')
  } catch (err) {
    console.error(err)
    res.status(500).json({message: err.message})
  }
})

module.exports = {
  contactForm,
}
