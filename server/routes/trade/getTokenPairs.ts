import axios from 'axios'
import { Request, Response } from 'express'
import { asyncWrapper } from '../../helpers'

const getTokenPairs = async (req: Request, res: Response): Promise<void> => {
  const chainId = req.query.chainId as string
  const pairs_url = `${process.env.LISTENER_URL}/dex/pairs/${chainId}`
  const result = await axios.get(pairs_url)
  res.send(result.data)
}

export default asyncWrapper(getTokenPairs)
