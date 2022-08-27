const nodemailer = require('nodemailer')

// const escapeHTML = str =>
//     str.replace(
//         /[&<>'"]/g,
//         tag =>
//         ({
//             '&': '&amp;',
//             '<': '&lt;',
//             '>': '&gt;',
//             "'": '&#39;',
//             '"': '&quot;'
//         }[tag] || tag)
//     );

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})


module.exports = sendEmail = async (email) => {

    const mailData = {
        from: `Ecommerce-Node-Backend Email Test<${process.env.EMAIL}>`,
        to: email.to,
        // replyTo: {
        //     name: name,
        //     address: email,
        // },
        subject: email.subject,
        text: email.message, // plain text version of the message
        // html: /*html*/``
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

