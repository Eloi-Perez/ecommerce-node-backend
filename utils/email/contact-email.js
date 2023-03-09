const nodemailer = require('nodemailer')

const html = require('./html-template')

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
})

const contactEmail = async (email, safe) => {
  const mailData = {
    from: `Ecommerce-Node-Backend Email Test<${process.env.EMAIL}>`,
    to: process.env.ADMIN_EMAIL,
    replyTo: {
      name: email.name,
      address: email.clientEmail,
    },
    subject: email.subject,
    text: email.message, // plain text version of the message
    html: html(email.subject, email.message, safe),
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.log(err)
        reject({ message: 'Error, email not sent' })
      } else {
        console.log(info)
        resolve({ message: 'Sent!' })
      }
    })
  })
}

module.exports = contactEmail
