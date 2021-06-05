import initMiddleware from '../../init-middleware';
import Cors from 'cors'
import NextCors from 'nextjs-cors';

const cors = Cors({
        credentials: true,
        origin: "http://clubelo.com",
})

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }

// const cors = initMiddleware(
//     // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
//     Cors({
//         // origin: process.env.ORIGIN,
//         credentials: true,
//         // origin: false
//         origin: "http://clubelo.com",
//     })
// )

export default async(req, res) => {

    try {
        await runMiddleware(req, res, cors)
    } catch (error) {
        return res.status(500)
    }

    // await NextCors(req, res, {
    //     // Options
    //     // methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    //     origin: "http://clubelo.com",
    //     // optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    //  });

    console.log('notification req', req)

    try {
        // await cors(req, res)

        console.log('after cors', )

        const {
            merchantId, posId, sessionId, amount, originAmount, currency, orderId, methodId, statement, sign
        } = req.body

        return res.status(200).json('ok') 

    } catch (error) {
        console.log('error', error)
        return res.status(500).json({message: error.message})
    }

}
