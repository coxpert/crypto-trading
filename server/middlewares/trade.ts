import { NextFunction, Request, Response } from 'express'
import Web3 from 'web3'

const tradeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const privateKey = (req.headers['private-key'] ||
    req.headers['Private-Key']) as string

  if (!privateKey) {
    res.send({ error: 'Missing private key' })
  }

  try {
    const web3 = new Web3()
    const data = await web3.eth.accounts.privateKeyToAccount(privateKey)
    req.body.privateKey = privateKey
    req.body.account = data.address
  } catch (error: any) {
    console.log(error)
    res.send({ error: error.message || error })
  }
  next()
}

export default tradeMiddleware
