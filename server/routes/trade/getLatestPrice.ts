import { Request, Response } from 'express'
import axios from 'axios'
import ethers, { BigNumberish } from 'ethers'
import dexpoolsSDK from 'dexpools-sdk'
import { asyncWrapper } from '../../helpers'

interface GetLatestPriceBody {
  chainId: number
  tokenPair: string
  orderType: 'buy' | 'sell'
  decimals: string
}

const getLatestPrice = async (req: Request, res: Response): Promise<void> => {
  const { chainId, tokenPair, orderType, decimals } =
    req.body as GetLatestPriceBody
  const url = process.env.LISTENER_URL + '/dex/orderbooks/' + chainId

  const result = await axios.get(url)

  if (result.status == 200) {
    const tokenA = tokenPair.split('/')[0]
    const tokenB = tokenPair.split('/')[1]
    const id = dexpoolsSDK.stringToBytes(tokenPair)
    const buys = result.data[id]?.buys
    const sells = result.data[id]?.sells
    let mLastBuyPrice
    let mLastSellPrice
    const priceBuyList: BigNumberish[] = []
    const priceSellList: BigNumberish[] = []
    if (sells) {
      for (const sell of sells) {
        if (!priceSellList.includes(sell.price)) {
          if (sell.status == '0' || sell.status == '2') {
            priceSellList.push(sell.price)
          }
        }
      }
      if (priceSellList.length > 0) {
        mLastSellPrice = ethers.utils.formatUnits(priceSellList[0], decimals)
      } else {
        mLastSellPrice = '0'
      }
    } else {
      mLastSellPrice = '0'
    }
    if (buys) {
      for (const buy of buys) {
        if (!priceBuyList.includes(buy.price)) {
          if (buy.status == '0' || buy.status == '2') {
            priceBuyList.push(buy.price)
          }
        }
      }
      if (priceBuyList.length > 0) {
        mLastBuyPrice = ethers.utils.formatUnits(
          priceBuyList[priceBuyList.length - 1],
          decimals
        )
      } else {
        mLastBuyPrice = '0'
      }
    } else {
      mLastBuyPrice = '0'
    }
    res.send({
      status: result.status,
      data: {
        lastPrice: orderType == 'buy' ? mLastSellPrice : mLastBuyPrice,
        tokenA: tokenA,
        tokenB: tokenB
      }
    })
  } else {
    res.send({
      status: result.status,
      data: {}
    })
  }
}

export default asyncWrapper(getLatestPrice)
