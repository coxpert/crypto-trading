import { Router } from 'express'
import getLatestPrice from './getLatestPrice'
import postOrder from './postOrder'
import cancelOrder from './cancelOrder'

const router = Router()

router.get('/latest-price', getLatestPrice)
router.post('/post-order', postOrder)
router.post('/cancel-order', cancelOrder)

export default router
