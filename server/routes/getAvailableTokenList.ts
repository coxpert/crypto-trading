import { Request, Response } from 'express'
import { asyncWrapper } from '../helpers'
import { getAvailableTokenList } from '../orderbook/getAvailableTokenList'

const availableTokenList = async (req: Request, res: Response) => {
  const chainId = req.body.chainId as number

  if (!chainId) {
    throw 'ChainId is required'
  }

  const tokenList = await getAvailableTokenList(chainId)
  res.send(tokenList)
}

export default asyncWrapper(availableTokenList)
