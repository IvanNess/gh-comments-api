// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fire from '../../firebase'
import Cors from 'cors'
import initMiddleware from '../../init-middleware'
import nodemailer from 'nodemailer'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    origin: process.env.ORIGIN,
    credentials: true
  })
)

export default async(req, res) => {
  // Run cors
  await cors(req, res)

  const data = req.body

  const writeResult = await fire.firestore().collection('comments').add({...data, isApproved: false})

  const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
  })

  const message = {
      from: "chai@bk.ru",
      to: ["ivan@hrex.eu", "martyna@dyktighandverker.no"],
      subject: "Comment to approve",
      html: `
          <p>There is new comment for article with adress:</p>
          <p>http://dyktighandverker.no${data.path}</p>
          <p>Name:</p>
          <p>${data.name}</p>
          <p>E-mail</p>
          <p>${data.email}</p>
          <p>Comment:</p>
          <p>${data.comment}</p>
          <a href='https://gh-comments-api.vercel.app/api/approvecomment?id=${writeResult.id}'>To approve this comment click here</a>
      `
  };

  const info = await transporter.sendMail(message)

  console.log("Message sent: %s", info.messageId);

  res.status(200).json('comment waits to be approved...')
}
