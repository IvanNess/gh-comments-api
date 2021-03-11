// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fire from '../../firebase'
import Cors from 'cors'
import initMiddleware from '../../init-middleware'

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

  const response = await fire.firestore().collection('comments').where('path', '==', req.body.path).get()
  const docs = response.docs.map(doc=>doc.data())
  console.log('docs', docs)
  res.status(200).json({comments: docs})
}
