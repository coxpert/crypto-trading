import { Button, Paper, Box, Typography } from '@mui/material'
import { TabItem } from '../tab/TabItem'
import { Tabs } from '../tab/Tabs'
import TokenAmount from '../token/TokenAmount'

const DepositWithdrawCard = () => {
  return (
    <Paper variant="outlined" sx={{ p: 4 }}>
      <Tabs>
        <TabItem title="Deposit">
          <Box sx={{ mt: 5 }}>
            <TokenAmount />
          </Box>
          <Box sx={{ mt: 10 }} display="flex" justifyContent="center">
            <Button variant="primary">
              <Typography variant="h4">Deposit</Typography>
            </Button>
          </Box>
        </TabItem>
        <TabItem title="Withdraw">
          <Box sx={{ mt: 5 }}>
            <TokenAmount />
          </Box>
          <Box sx={{ mt: 10 }} display="flex" justifyContent="center">
            <Button variant="primary">
              <Typography variant="h4">Withdraw</Typography>
            </Button>
          </Box>
        </TabItem>
      </Tabs>
    </Paper>
  )
}

export default DepositWithdrawCard
