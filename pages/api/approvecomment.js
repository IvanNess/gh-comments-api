// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fire from '../../firebase'
import Cors from 'cors'
import initMiddleware from '../../init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // origin: process.env.ORIGIN,
    origin: false
    // credentials: true
  })
)

export default async(req, res) => {
  // Run cors
  await cors(req, res)

  const response = await fire.firestore().collection('comments').doc(req.query.id).update({isApproved: true})
  
  res.status(200).json('ok')
}
