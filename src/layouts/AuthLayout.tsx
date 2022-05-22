import { Box } from '@mui/material'
import React, { ReactNode } from 'react'

import { Header } from './Header'

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}
      >
        {children}
      </Box>
    </>
  )
}
