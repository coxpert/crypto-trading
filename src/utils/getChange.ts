import { ethers } from 'ethers'
import { TradeItem } from './getOrderbooks'

export const getChange = (trades: TradeItem[]): string => {
  let quoteDecimals = 18

  if (trades && trades.length > 0) {
    if (
      parseFloat(
        ethers.utils.formatUnits(trades[trades.length - 1].price, quoteDecimals)
      ) !== 0
    ) {
      if (trades.length > 1) {
        return (
          (
            (100 *
              (parseFloat(
                ethers.utils.formatUnits(
                  trades[trades.length - 1]?.price,
                  quoteDecimals
                )
              ) -
                parseFloat(
                  ethers.utils.formatUnits(
                    trades[trades.length - 2]?.price,
                    quoteDecimals
                  )
                ))) /
            parseFloat(
              ethers.utils.formatUnits(
                trades[trades.length - 1]?.price,
                quoteDecimals
              )
            )
          ).toFixed(2) || '0.0'
        )
      } else {
        return (
          (
            (100 *
              (parseFloat(
                ethers.utils.formatUnits(
                  trades[trades.length - 1]?.highPrice,
                  quoteDecimals
                )
              ) -
                parseFloat(
                  ethers.utils.formatUnits(
                    trades[trades.length - 1]?.lowPrice,
                    quoteDecimals
                  )
                ))) /
            parseFloat(
              ethers.utils.formatUnits(
                trades[trades.length - 1]?.highPrice,
                quoteDecimals
              )
            )
          ).toFixed(2) || '0.0'
        )
      }
    }
  }
  return '0.0'
}
