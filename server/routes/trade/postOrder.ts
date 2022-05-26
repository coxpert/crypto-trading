import { Request, Response } from 'express'
import { asyncWrapper } from '../../helpers'
import {
  TRADEPAIRS_ADDRESS,
  TRADEPAIRS_ABI,
  stringToBytes,
  ORDERBOOK_ADDRESS,
  ORDERBOOKS_ABI
} from 'dexpools-sdk'
import { getWallet } from '../../utiles/getWallet'
import { Contract, ethers } from 'ethers'
import moment from 'moment'
import { getAvailableTokenList } from '../../orderbook/getAvailableTokenList'

interface PostOrderBody {
  privateKey: string
  account: string
  chainId: number
  amount: number
  order_direction: string
  order_type: string
  price?: number
  token_pairs: string
}

const postOrder = async (req: Request, res: Response): Promise<void> => {
  const {
    amount,
    order_direction,
    order_type,
    price,
    token_pairs,
    chainId,
    account
  } = req.body as PostOrderBody

  if (!chainId || !amount || !order_direction || !order_type || !token_pairs) {
    throw 'Invalid parameters'
  }

  if (order_type === 'limit_order' && !price) {
    throw 'Missing Price'
  }

  const tradePairAddress = TRADEPAIRS_ADDRESS[chainId]
  const [symbolA, symbolB] = token_pairs.split('/')
  // get available toke list from the order book api which are from firebase
  const tokenList = await getAvailableTokenList(chainId)
  const tokenA = tokenList.find((token) => token.symbol === symbolA)
  const tokenB = tokenList.find((token) => token.symbol === symbolB)

  if (!tokenA || !tokenB) {
    throw 'Unsupported pairs'
  }

  // get wallet
  const wallet = getWallet(req.body)

  const tradePairsContract = new Contract(
    tradePairAddress,
    TRADEPAIRS_ABI,
    wallet
  )

  const orderSide = order_direction === 'buy' ? 0 : 1
  const orderType = order_type === 'limit_order' ? 1 : 0
  let orderPrice = price

  if (!orderType) {
    const orderBookContract = await new Contract(
      ORDERBOOK_ADDRESS[chainId],
      ORDERBOOKS_ABI,
      wallet
    )
    const buybook_id = stringToBytes(token_pairs + '-BUYBOOK')
    const sellbook_id = stringToBytes(token_pairs + '-SELLBOOK')
    const lastBuyPrice = await orderBookContract.last(buybook_id)
    const lastSellPrice = await orderBookContract.first(sellbook_id)
    orderPrice = order_type == 'buy' ? lastSellPrice : lastBuyPrice
  }

  if (!orderPrice) {
    throw 'Order price is undefined'
  }

  const amountDecimals = orderSide ? tokenB.decimals : tokenA.decimals
  const priceDecimals = orderSide ? tokenA.decimals : tokenB.decimals
  const transactionPrice = ethers.utils.parseUnits(
    orderPrice?.toString(),
    priceDecimals
  )
  const transactionAmount = ethers.utils.parseUnits(
    amount.toString(),
    amountDecimals
  )

  // add order
  const orderTransaction = await tradePairsContract.addOrder(
    stringToBytes(token_pairs),
    transactionPrice,
    transactionAmount,
    orderSide,
    orderType
  )
  const transactionResult = await orderTransaction.wait()

  res.send({
    type: 'Post Order',
    address: account,
    txId: transactionResult?.transactionHash,
    order_type,
    order_direction,
    token_pairs: token_pairs,
    amount: amount,
    status: 'Completed',
    time: moment().format('DD-MM-YYYY | hh:mm')
  })
}

export default asyncWrapper(postOrder)
