import axios from 'axios'

interface TokenPair {
  basedisplaydecimals: string
  chainId: string
  maxtradeamount: string
  mintradeamount: string
  pair: string
  quotedisplaydecimals: string
  symbol: string
}

export const getPairs = async (chainId: string): Promise<TokenPair[]> => {
  const res = await axios.get('/trade/get-token-pairs', { params: { chainId } })
  return res.data as TokenPair[]
}
