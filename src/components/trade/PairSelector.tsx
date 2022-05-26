import { useWeb3Context } from '@/hooks/useWeb3Context'
import { TokenPairList } from '@/layouts/Web3Provider'
import {
  MenuItem,
  Select,
  Typography,
  Box,
  SelectChangeEvent
} from '@mui/material'
import Image from 'next/image'
import { useEffect } from 'react'

interface PairSelectorProps {
  pair: TokenPairList | undefined
  onChange: React.Dispatch<React.SetStateAction<TokenPairList | undefined>>
}

export const PairSelector = ({ pair, onChange }: PairSelectorProps) => {
  const { tokenPairList } = useWeb3Context()

  useEffect(() => {
    if (!pair) {
      onChange(tokenPairList[0])
    }
    // eslint-disable-next-line
  }, [tokenPairList])

  const handleChange = (e: SelectChangeEvent<string>) => {
    const selectedPair = tokenPairList.find(
      (item) => (item.pair === e.target.value)
    )
    onChange(selectedPair)
  }

  if (pair && tokenPairList) {
    return (
      <Select fullWidth value={pair?.pair} onChange={handleChange}>
        {tokenPairList.map((pair, index) => (
          <MenuItem value={pair.pair} key={index}>
            <Box display="flex" alignItems="center" sx={{ width: '100%' }}>
              <Image
                src={pair.logoA}
                width={30}
                height={30}
                alt={pair.tokenA}
              />
              <Image
                src={pair.logoB}
                width={30}
                height={30}
                alt={pair.tokenB}
              />
              <Typography sx={{ pl: 4 }}>{pair.symbol}</Typography>
              <Box sx={{ ml: 'auto' }}>
                <Typography sx={{ color: 'text.active' }}>
                  {parseFloat(pair.change) >= 0
                    ? '+' + pair.change
                    : pair.change}
                  %
                </Typography>
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Select>
    )
  }

  return null
}
