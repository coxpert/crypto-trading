import { Request, Response } from 'express'
import { asyncWrapper } from '../../helpers'
import { Contract, ethers } from 'ethers'
import { getWallet } from '../../utiles/getWallet'
import { PORTFOLIO_ADDRESS, PORTFOLIO_ABI } from 'dexpools-sdk'
import { getAvailableTokenList } from '../../orderbook/getAvailableTokenList'
import moment from 'moment'

interface WithdrawBody {
  privateKey: string // wallet private key
  account: string // account from private key,
  chainId: number // network chain id
  symbol: string // token symbol to withdraw
  amount: number // token amount to withdraw
}

const withdraw = async (req: Request, res: Response): Promise<void> => {
  const { account, chainId, symbol, amount } = req.body as WithdrawBody

  const portfolioAddress = PORTFOLIO_ADDRESS[chainId]

  // get available toke list from the order book api which are from firebase
  const tokenList = await getAvailableTokenList(chainId)

  // get deposit token from the token's symbol
  const withdrawToken = tokenList.find((token) => token.symbol === symbol)
  if (!withdrawToken) {
    throw symbol + ' is not a available in Dexpools Trading'
  }

  // get wallet
  const wallet = getWallet(req.body)
  // get portfolio contract to use for deposit
  const portfolioContract = new Contract(
    portfolioAddress,
    PORTFOLIO_ABI,
    wallet
  )

  const requestWithdraw = await portfolioContract.withdrawToken(
    account,
    withdrawToken.bytesSymbol,
    ethers.utils.parseUnits(amount.toString(), withdrawToken?.decimals)
  )

  const txnResult = await requestWithdraw.wait()

  res.send({
    type: 'Withdraw',
    address: account,
    txId: txnResult?.transactionHash,
    name: withdrawToken?.name,
    symbol: withdrawToken?.symbol,
    amount: amount,
    status: 'Completed',
    time: moment().format('DD-MM-YYYY | hh:mm')
  })
}

export default asyncWrapper(withdraw)
