import { useWeb3Context } from '@/hooks/useWeb3Context'
import { TokenPairList } from '@/layouts/Web3Provider'
import { OrderItem } from '@/utils/getOrderbooks'
import { Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import CustomTable, { Column } from '../table'

const columns: Column[] = [
  { id: 'timestamp', label: 'Date & Time' },
  { id: 'side', label: 'Side' },
  { id: 'quantityfilled', label: 'Filled' },
  { id: 'price', label: 'Price' },
  { id: 'totalfee', label: 'Fee' },
  { id: 'action', label: 'Action' }
]

const OrderHistory = ({ pair }: { pair: TokenPairList | undefined }) => {
  const [filteredData, setFilteredData] = useState<OrderItem[]>([])
  const { orderBook } = useWeb3Context()

  useEffect(() => {
    if (orderBook && pair && orderBook[pair.pair]) {
      setFilteredData(orderBook[pair.pair].orders)
    }
  }, [orderBook, pair])

  return (
    <Paper sx={{ width: '100%' }}>
      <CustomTable columns={columns} data={filteredData} />
    </Paper>
  )
}

export default OrderHistory
