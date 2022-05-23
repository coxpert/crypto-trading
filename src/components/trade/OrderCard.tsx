import { Button, Paper, Box, Typography } from "@mui/material"
import { TabItem } from "../tab/TabItem"
import { Tabs } from "../tab/Tabs"
import TokenAmount from "../token/TokenAmount"
import { PairSelector } from '@/components/trade/PairSelector'
import { useState } from "react"
import { TokenPairList } from "@/layouts/Web3Provider"

const OrderCard = () => {

    const [pair, setPair] = useState<TokenPairList>()

    return (
        <>
            <PairSelector pair={pair} onChange={setPair} />
            <Paper variant="outlined" sx={{ p: 4, mt: 2 }}>
                <Tabs>
                    <TabItem title="Buy">
                        <Box sx={{ mt: 5 }}>
                            <TokenAmount />
                        </Box>
                        <Box sx={{ mt: 10 }} display="flex" justifyContent="center">
                            <Button variant="primary">
                                <Typography variant="h4">Place Order</Typography>
                            </Button>
                        </Box>
                    </TabItem>
                    <TabItem title="Cell">
                        <Box sx={{ mt: 5 }}>
                            <TokenAmount />
                        </Box>
                        <Box sx={{ mt: 10 }} display="flex" justifyContent="center">
                            <Button variant="primary">
                                <Typography variant="h4">Place Order</Typography>
                            </Button>
                        </Box>
                    </TabItem>
                </Tabs>
            </Paper>
        </>
    )
}

export default OrderCard