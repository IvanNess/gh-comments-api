import initMiddleware from '../../init-middleware';

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // origin: process.env.ORIGIN,
        // credentials: true
        //   origin: false
        origin: "http://clubelo.com",
        credentials: true,
        methods: ["GET"]
    })
)

export default async(req, res) => {
    console.log('notification req', req)

    try {
        await cors(req, res)

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
