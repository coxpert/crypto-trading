import { Box } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
}

export const TabItem = ({ children }: Props) => {
  return <Box sx={{ width: '100%' }}>{children}</Box>
}
