import { Router } from 'express'
import boom from 'express-boom'

import trade from './trade'
import web3 from './web3'

const router = Router()

router.use(boom())

router.get('/health', (_req, res) => res.send('API is running actively'))
router.get('/version', (_req, res) =>
  res.send('v' + process.env.npm_package_version)
)

router.use('/trade', trade)
router.use('/web3', web3)

export default router
