import axios from 'axios'

interface Token {
  name: string
  chainId: number
  decimals: number
  address: string
  image: string
  symbol: string
  usdPrice: number
  bytesSymbol: string
}

export const getAvailableTokenList = async (
  chainId: number
): Promise<Token[]> => {
  const url = process.env.LISTENER_URL + '/dex/tokens/' + chainId
  const res = await axios.get(url)
  return res.data as Token[]
}
