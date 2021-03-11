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
      to: "ivan@hrex.eu",
      subject: "Comment to approve",
      html: `
          <p>Nowy komentarz do posta pod adresem:</p>
          <p>http://dyktighandverker.no${data.path}</p>
          <p>Imię:</p>
          <p>${data.name}</p>
          <p>E-mail</p>
          <p>${data.email}</p>
          <p>Komentarz:</p>
          <p>${data.comment}</p>
          <a href='https://us-central1-dyktighandverker-blog.cloudfunctions.net/approvecomment?id=${writeResult.id}'>aby zatwierdzić ten komentarz, kliknij tutaj</a>
      `
  };

  const info = await transporter.sendMail(message)

  console.log("Message sent: %s", info.messageId);

  res.status(200).json('comment waits to be approved...')
}
