import { Typography, Container, Box, Button } from '@mui/material'
import Link from 'next/link'

const HomePage = () => {
  return (
    <Container>
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Box>
          <Typography variant="h4" color="text.primary">
            Welcome to our Tutorial
          </Typography>
          <Typography variant="h1" fontSize={72}>
            Dexpools Trading
          </Typography>
          <Typography variant="description" sx={{ my: 5 }} fontSize={20}>
            By building an trading dApp <br />A simple UI where you can deposit,
            withdraw, place order, cancel order
          </Typography>
          <Typography variant="description" fontSize={24} fontWeight={900}>
            You will learn how to:
          </Typography>
        </Box>
        <Box sx={{ color: 'text.default', fontSize: 18 }}>
          <ul>
            <li>Connect to Metamask via your frontend project</li>
            <li>Call smart contract methods from your frontend</li>
            <li>Sign transactions using Metamask</li>
          </ul>
        </Box>
        <Box sx={{ mt: 10 }}>
          <Button variant="primary">Get Started</Button>
          <Link href="/docs">
            <a>
              <Button variant="secondary" sx={{ ml: 5 }}>
                Document
              </Button>
            </a>
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

export default HomePage
