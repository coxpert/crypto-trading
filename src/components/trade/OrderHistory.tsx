import { Paper } from "@mui/material"
import { useState } from "react"
import CustomTable, { Column } from "../table"

const columns: Column[] = [
    { id: 'dateTime', label: 'Date & Time' },
    { id: 'pair', label: 'Pair' },
    { id: 'size', label: 'Size' },
    { id: 'side', label: 'Side' },
    { id: 'filled', label: 'Filled' },
    { id: 'price', label: 'Price' },
    { id: 'free', label: 'Fee' },
    { id: 'action', label: 'Action' }
]

const OrderHistory = () => {
    const [filteredData, setFilteredData] = useState<any[]>([])

    return (
        <Paper sx={{ width: '100%' }}>
            <CustomTable
                columns={columns}
                data={filteredData}
            />
        </Paper>
    )
}

export default OrderHistory