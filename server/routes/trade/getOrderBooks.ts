import { Request, Response } from 'express'
import { asyncWrapper } from '../../helpers'
import axios from 'axios'

const getOrderBooks = async (req: Request, res: Response): Promise<void> => {
  const chainId = req.query.chainId as string
  const orderbooks_url = `${process.env.LISTENER_URL}/dex/orderbooks/${chainId}`
  const result = await axios.get(orderbooks_url)
  res.send(result.data)
}

export default asyncWrapper(getOrderBooks)
