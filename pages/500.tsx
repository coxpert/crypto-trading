import React from 'react'
import Link from 'next/link'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Box, Button, Container, Typography } from '@mui/material'

const ServerErrorPage: NextPage = () => {
  const router = useRouter()

  return (
    <Container
      sx={{
        mx: 'auto',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <Box sx={{ mt: 20 }}>
        <Typography variant="h1" textAlign="center">
          Server Related Error (500)
        </Typography>

        <Typography variant="description" sx={{ my: 5 }}>
          We&apos;re going to get this fixed and up and running soon.
        </Typography>

        <Box>
          <Button
            variant="primary"
            sx={{ mr: 4 }}
            onClick={() => router.back()}
          >
            Back
          </Button>
          <Link href="/">
            <a>Go home</a>
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

export default ServerErrorPage
