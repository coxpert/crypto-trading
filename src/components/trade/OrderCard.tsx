import { Button, Paper, Box, Typography } from "@mui/material"
import { TabItem } from "../tab/TabItem"
import { Tabs } from "../tab/Tabs"
import TokenAmount from "../token/TokenAmount"

const OrderCard = () => {
    return (
        <Paper variant="outlined" sx={{ p: 4 }}>
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
    )
}

export default OrderCard