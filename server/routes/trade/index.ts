import { Router } from 'express'
import getLatestPrice from './getLatestPrice'

const router = Router()

router.get('/latest-price', getLatestPrice)

export default router
