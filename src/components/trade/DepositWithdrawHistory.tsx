import { useState } from 'react'
import Paper from '@mui/material/Paper'
import CustomTable, { Column } from '../table'

const columns: Column[] = [
  { id: 'dateTime', label: 'Date & Time' },
  { id: 'type', label: 'Type' },
  { id: 'walletAddress', label: 'Wallet Address' },
  { id: 'asset', label: 'Asset' },
  { id: 'amount', label: 'Amount' },
  { id: 'transactionId', label: 'Transaction ID' },
  { id: 'status', label: 'Status' }
]

const DepositWithdrawHistory = () => {
  const [filteredData, setFilteredData] = useState<any[]>([])

  return (
    <Paper sx={{ width: '100%' }}>
      <CustomTable columns={columns} data={filteredData} />
    </Paper>
  )
}

export default DepositWithdrawHistory
