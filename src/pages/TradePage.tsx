import OrderCard from '@/components/trade/OrderCard'
import OrderHistory from '@/components/trade/OrderHistory'
import { Box, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'

const TradePage = () => {
  return (
    <Container>
      <Box sx={{ mt: 10 }}>
        <Grid container>
          <Grid item xs={12} lg={8}>
            <Box sx={{ pr: { sx: 0, lg: 4 } }}>
              <Box sx={{ mb: 4, mt: 6 }}>
                <Typography variant="h3">Order History</Typography>
              </Box>
              <OrderHistory />
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <OrderCard />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default TradePage
