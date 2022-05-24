import { Paper, Typography, Input, Box } from '@mui/material'
import { useState } from 'react'
import Image from 'next/image'
import { height } from '@mui/system'

interface TokenAmountProps {
    token: string | undefined
    logoUrl: string | undefined
    label?: string
    balance?: number
}

const TokenAmount = ({ token, logoUrl, label, balance }: TokenAmountProps) => {

    const [amount, setAmount] = useState<number>()

    return (
        <Paper sx={{ width: '100%', px: 4, py: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-end">
                <Typography variant="h5">{label || 'Amount'}</Typography>
                <Typography variant="description" sx={{ color: 'text.secondary' }}>
                    Balance: 0
                </Typography>
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
                            display: 'none'
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
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                        backgroundColor: 'background.tabActive',
                        width: 100,
                        height: 26,
                        px: 1,
                        borderRadius: 1
                    }}
                >
                    {logoUrl && (
                        <Box sx={{ width: 18, height: 18 }}>
                            <Image src={logoUrl} width={18} height={18} alt={token} />
                        </Box>
                    )}
                    {token && <Typography sx={{ pl: 3 }}>{token}</Typography>}
                </Box>
            </Box>
        </Paper>
    )
}

export default TokenAmount
