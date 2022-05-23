import { Paper, Typography, Input, Box } from "@mui/material"
import { useState } from "react"


const TokenAmount = () => {

    const [amount, setAmount] = useState<number>()
    const [token, setToken] = useState<string>()

    return (
        <Paper sx={{ width: '100%', px: 4, py: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-end" >
                <Typography variant="h5">Amount</Typography>
                <Typography variant="description" sx={{ color: 'text.secondary' }}>Balance: 0</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                <Input
                    value={amount}
                    className="token-input"
                    placeholder="0.0"
                    sx={{
                        color: 'text.default',
                        '::after': {
                            display: 'none'
                        },
                        '::before': {
                            display: 'none',
                        }
                    }}
                />
                <Box sx={{ p: 2, cursor: 'pointer', mr: 2 }}>
                    <Typography
                        sx={{
                            color: 'text.secondary',
                            ':hover': {
                                color: 'text.active'
                            }
                        }}
                    >
                        MAX
                    </Typography>
                </Box>
                <Box>
                    sdfgsdfg
                </Box>
            </Box>
        </Paper>
    )
}

export default TokenAmount