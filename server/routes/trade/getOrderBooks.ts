import { Request, Response } from 'express'
import { asyncWrapper } from '../../helpers'
import { stringToBytes } from 'dexpools-sdk'
import axios from 'axios'

const getOrderBooks = async (req: Request, res: Response): Promise<void> => {
  const { chainId, tokenPair } = req.body
  const orderbooks_url = process.env.LISTENER_URL + '/dex/orderbooks/' + chainId

  const result = await axios.get(orderbooks_url)
  if (result.status == 200) {
    const id = stringToBytes(tokenPair)
    const trades = result.data[id]?.trades
    res.send({
      status: result.status,
      data: trades
    })
  } else {
    res.send({
      status: result.status,
      data: {}
    })
  }
}

export default asyncWrapper(getOrderBooks)