import { Box } from '@mui/material'
import React, { ReactNode } from 'react'

const EmptyLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Box
            component="main"
            sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}
        >
            {children}
        </Box>
    )
}

export default EmptyLayout