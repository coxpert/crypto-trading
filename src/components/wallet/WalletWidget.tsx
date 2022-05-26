import { DuplicateIcon, LogoutIcon } from '@heroicons/react/outline'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ExternalLinkIcon
} from '@heroicons/react/solid'

import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Skeleton,
  SvgIcon,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { WalletModal } from '../modal/WalletModal'
import { useWeb3Context } from '@/hooks/useWeb3Context'

import { getNetworkConfig } from '../../utils/networksConfig'
import { DrawerWrapper } from './DrawerWrapper'
import { MobileCloseButton } from './MobileCloseButton'
import { useModal } from '../modal'
import { textCenterEllipsis } from '@/utils/utils'
import Link from 'next/link'

const WalletWidget = () => {
  const { disconnectWallet, currentAccount, connected, chainId, loading } =
    useWeb3Context()
  const [open, setOpen] = useState(false)
  const modal = useModal()

  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const networkConfig = getNetworkConfig(chainId)

  let networkColor = ''
  if (networkConfig?.isTestnet) {
    networkColor = '#7157ff'
  } else {
    networkColor = '#65c970'
  }

  useEffect(() => {
    if (connected) {
      modal.close()
    }
    // eslint-disable-next-line
  }, [connected])

  const handleClose = () => {
    setOpen(false)
  }

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!connected) {
      modal.openWallet()
    } else {
      setOpen(true)
      setAnchorEl(event.currentTarget)
    }
  }

  const handleDisconnect = () => {
    if (connected) {
      disconnectWallet()
      handleClose()
      localStorage.removeItem('mockWalletAddress')
    }
  }

  const handleCopy = async () => {
    navigator.clipboard.writeText(currentAccount)
    handleClose()
  }

  const buttonContent = currentAccount
    ? textCenterEllipsis(currentAccount, 6, 6)
    : 'Connect wallet'

  const Content = ({
    component = ListItem
  }: {
    component?: typeof MenuItem | typeof ListItem
  }) => (
    <>
      <Typography
        variant="h5"
        sx={{
          display: { xs: 'block', md: 'none' },
          color: '#A5A8B6',
          px: 4,
          py: 2
        }}
      >
        Account
      </Typography>

      <Box component={component} disabled>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4">
              {textCenterEllipsis(currentAccount, 10, 4)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider
        sx={{
          my: { xs: 7, md: 0 },
          borderColor: { xs: '#FFFFFF1F', md: 'divider' }
        }}
      />

      <Box component={component} disabled>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1
            }}
          >
            <Typography
              variant="caption"
              color={{ xs: '#FFFFFFB2', md: 'text.secondary' }}
            >
              Network
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                bgcolor: networkColor,
                width: 6,
                height: 6,
                mr: 2,
                boxShadow:
                  '0px 2px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25)',
                borderRadius: '50%'
              }}
            />
            <Typography
              color={{ xs: '#F1F1F3', md: 'text.primary' }}
              variant="h5"
            >
              {networkConfig.name}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider
        sx={{
          my: { xs: 7, md: 0 },
          borderColor: { xs: '#FFFFFF1F', md: 'divider' }
        }}
      />

      <Box
        component={component}
        sx={{ color: { xs: '#F1F1F3', md: 'text.primary' } }}
        onClick={handleCopy}
      >
        <ListItemIcon
          sx={{
            color: {
              xs: '#F1F1F3',
              md: 'primary.light',
              minWidth: 'unset',
              marginRight: 12
            }
          }}
        >
          <SvgIcon fontSize="small">
            <DuplicateIcon />
          </SvgIcon>
        </ListItemIcon>
        <ListItemText>Copy address</ListItemText>
      </Box>
      <Box
        component={component}
        sx={{ color: { xs: '#F1F1F3', md: 'text.primary' } }}
        onClick={handleDisconnect}
      >
        <ListItemIcon
          sx={{
            color: {
              xs: '#F1F1F3',
              md: 'primary.light',
              minWidth: 'unset',
              marginRight: 12
            }
          }}
        >
          <SvgIcon fontSize="small">
            <LogoutIcon />
          </SvgIcon>
        </ListItemIcon>
        <ListItemText>Disconnect Wallet</ListItemText>
      </Box>
    </>
  )

  return (
    <>
      {loading ? (
        <Skeleton height={36} width={126} sx={{ background: '#383D51' }} />
      ) : (
        <Button
          variant={connected ? 'secondary' : 'primary'}
          aria-label="wallet"
          id="wallet-button"
          aria-haspopup="true"
          onClick={handleClick}
          sx={{ p: connected ? '5px 8px' : undefined }}
          endIcon={
            connected && (open ? <ChevronUpIcon /> : <ChevronDownIcon />)
          }
        >
          {buttonContent}
        </Button>
      )}
      <Menu
        id="wallet-menu"
        MenuListProps={{
          'aria-labelledby': 'wallet-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        keepMounted={true}
      >
        <MenuList
          disablePadding
          sx={{ '.MuiMenuItem-root.Mui-disabled': { opacity: 1 } }}
        >
          <Content component={MenuItem} />
        </MenuList>
      </Menu>
      <WalletModal />
    </>
  )
}

export default WalletWidget
