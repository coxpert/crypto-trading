import { Router } from 'express'
import getLatestPrice from './getLatestPrice'
import postOrder from './postOrder'
import cancelOrder from './cancelOrder'
import getTokenPairs from './getTokenPairs'
import getTokenData from './getTokenData'
import getOrderBooks from './getOrderBooks'
import deposit from './deposit'
import tradeMiddleware from '../../middlewares/trade'

const router = Router()

router.use(tradeMiddleware)

router.get('/latest-price', getLatestPrice)
router.get('/get-token-pairs', getTokenPairs)
router.get('/get-token-data', getTokenData)
router.get('/get-orderbooks', getOrderBooks)
router.post('/post-order', postOrder)
router.post('/cancel-order', cancelOrder)
router.post('/deposit', deposit)

export default router
