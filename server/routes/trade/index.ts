import { Router } from 'express'
import getLatestPrice from './getLatestPrice'
import postOrder from './postOrder'
import cancelOrder from './cancelOrder'
import getTokenPairs from './getTokenPairs'
import getTokenData from './getTokenData'
import getOrderBooks from './getOrderBooks'

const router = Router()

router.get('/latest-price', getLatestPrice)
router.get('/get-token-pairs', getTokenPairs)
router.get('/get-token-data', getTokenData)
router.get('/get-orderbooks', getOrderBooks)
router.post('/post-order', postOrder)
router.post('/cancel-order', cancelOrder)

export default router
