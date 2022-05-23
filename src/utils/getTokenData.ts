import axios from 'axios'

interface TokenData {
  address: string
  bytesSymbol: string
  chainId: string
  decimals: number
  image: string
  name: string
  symbol: string
  usdPrice: string
}

export const getTokenData = async (chainId: string): Promise<TokenData[]> => {
  const res = await axios.get('/trade/get-token-data', { params: { chainId } })
  return res.data as TokenData[]
}
