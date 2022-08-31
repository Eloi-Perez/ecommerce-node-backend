const nodemailer = require('nodemailer')

const html = require('./html-template')

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
})

const sendEmail = async (email, safe) => {

  const mailData = {
    from: `Ecommerce-Node-Backend Email Test<${process.env.EMAIL}>`,
    to: email.to,
    // replyTo: {
    //     name: name,
    //     address: email,
    // },
    subject: email.subject,
    text: email.message, // plain text version of the message
    html: html(email.subject, email.message, safe)
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.log(err)
        reject({ message: 'Error' })
      } else {
        console.log(info)
        resolve({ message: 'Sent!' })
      }
    }
    )
  })

}

module.exports = sendEmail