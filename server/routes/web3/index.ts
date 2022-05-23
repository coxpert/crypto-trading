import { Router } from 'express'
import getAccountByPrivateKey from './getAccountByPrivateKey'
const router = Router()

router.get('/get-account-by-private-key', getAccountByPrivateKey)

export default router
