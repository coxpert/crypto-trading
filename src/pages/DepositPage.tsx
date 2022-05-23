import { Box, Container, Grid } from '@mui/material'
import DepositWithdrawCard from '@/components/trade/DepositWithdraw'
import DepositWithdrawHistory from '@/components/trade/DepositWithdrawHistory'

const DepositPage = () => {
  return (
    <Container>
      <Box sx={{ mt: 10 }}>
        <Grid container>
          <Grid item xs={12} lg={8}>
            <Box sx={{ pr: { sx: 0, lg: 4 } }}>
              <DepositWithdrawHistory />
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <DepositWithdrawCard />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default DepositPage
