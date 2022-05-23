import { Button, Paper, Box, Typography, Select, FormControl, MenuItem, SelectChangeEvent } from '@mui/material'
import { TabItem } from '../tab/TabItem'
import { Tabs } from '../tab/Tabs'
import TokenAmount from '../token/TokenAmount'
import { PairSelector } from '@/components/trade/PairSelector'
import { ChangeEvent, useState } from 'react'
import { TokenPairList } from '@/layouts/Web3Provider'
import { TabRadio } from '../tab/TabRadio'

const TYPES = [
    { value: 'buy', label: "Buy" },
    { value: 'sell', label: "Sell" }
]
const ORDER_TYPES = [
    { value: 'limit_order', label: "Limit Order" },
    { value: 'market_order', label: "Market Order" }
]

const OrderCard = () => {

    const [type, setType] = useState<string>(TYPES[0].value)
    const [orderType, setOrderType] = useState<string>(TYPES[0].value)
    const [pair, setPair] = useState<TokenPairList>()

    const handleOrderTypeChange = (e: SelectChangeEvent<string>) => {
        setOrderType(e.target.value)
    }

    return (
        <>
            <PairSelector pair={pair} onChange={setPair} />
            <Paper variant="outlined" sx={{ p: 4, mt: 2 }}>
                <TabRadio
                    options={TYPES}
                    value={type}
                    onChange={(value: string) => {
                        setType(value)
                    }}
                />
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <Select
                        id="demo-select-small"
                        value={orderType}
                        onChange={handleOrderTypeChange}
                    >
                        {
                            ORDER_TYPES.map(item => (
                                <MenuItem value={item.value}>{item.label}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <Box sx={{ mt: 5 }}>
                    <TokenAmount token={pair?.tokenA} logoUrl={pair?.logoA} />
                </Box>
                <Box sx={{ mt: 5 }}>
                    <TokenAmount token={pair?.tokenB} logoUrl={pair?.logoB} />
                </Box>
                <Box sx={{ mt: 10 }} display="flex" justifyContent="center">
                    <Button variant="primary">
                        <Typography variant="h4">Place Order</Typography>
                    </Button>
                </Box>
            </Paper>
        </>
    )
}

export default OrderCard
