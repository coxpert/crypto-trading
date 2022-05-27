import { Contract, ethers } from 'ethers'
import { Request, Response } from 'express'
import { getWallet } from '../../utiles/getWallet'
import { asyncWrapper } from '../../helpers'
import { TRADEPAIRS_ADDRESS, TRADEPAIRS_ABI } from 'dexpools-sdk'

interface CancelOrderBody {
  privateKey: string
  account: string
  chainId: number
  pair: string
  orderId: string
}

const cancelOrder = async (req: Request, res: Response): Promise<void> => {
  const { chainId, orderId, pair } = req.body as CancelOrderBody

  if (!chainId || !orderId || !pair) {
    throw 'Invalid parameters'
  }

  // get wallet from private key
  const wallet = getWallet(req.body)

  const tradePairId = ethers.utils.formatBytes32String(pair)

  const tradePairsContract = new Contract(
    TRADEPAIRS_ADDRESS[chainId],
    TRADEPAIRS_ABI,
    wallet
  )

  const orderTransaction = await tradePairsContract.cancelOrder(
    tradePairId,
    orderId
  )

  const transactionResult = await orderTransaction.wait()

  res.send({
    type: 'Cancel Order',
    chainId,
    orderId,
    txId: transactionResult?.transactionHash,
    pair
  })
}

export default asyncWrapper(cancelOrder)
