import nodemailer from 'nodemailer'
import process from 'node:process'

const env = process.env

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
})

const mailOptions = {
  from: 'yourusername@email.com',
  to: 'yourfriend@email.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!',
}

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log('Error:', error)
  } else {
    console.log('Email sent:', info.response)
  }
})
