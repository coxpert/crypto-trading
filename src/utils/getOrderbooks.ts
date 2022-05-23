import axios from 'axios'

export interface BuySellItem {
  id: string
  price: string
  quantity: string
  quantityfilled: string
  status: string
  timestamp: number
}

export interface HistoryItem {
  id: string
  price: string
  quantity: string
  side: string
  timestamp: number
  trader: string
  type: string
}

export interface OrderItem {
  id: string
  price: string
  quantity: string
  quantityfilled: string
  timestamp: number
  status: string
  side: string
  totalamount: string
  totalfee: string
  traderaddress: string
  type: string
}

export interface TradeItem {
  closePrice: string
  highPrice: string
  lowPrice: string
  openPrice: string
  price: string
  quantity: string
  timestamp: number
}

export interface OrderBook {
  [key: string]: {
    buys: BuySellItem[]
    sells: BuySellItem[]
    trades: TradeItem[]
    histories: HistoryItem[]
    orders: OrderItem[]
  }
}

export const getOrderBooks = async (chainId: string) => {
  const res = await axios.get('/trade/get-orderbooks', { params: { chainId } })
  return res.data as OrderBook
}
