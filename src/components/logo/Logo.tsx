import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <Box display="flex">
          <Image
            src="/logo.svg"
            alt="App Logo"
            height={40}
            width={40}
            layout="fixed"
          />
          <Typography variant="h1" sx={{ ml: 2 }}>
            Dexpools
          </Typography>
        </Box>
      </a>
    </Link>
  )
}

export default Logo
