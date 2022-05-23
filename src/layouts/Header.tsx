import { Slide, Typography, useScrollTrigger, Button } from '@mui/material'
import Box from '@mui/material/Box'
import { Container } from '@mui/system'
import { NavItems } from '@/components/menu/NavItems'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { useModal } from '@/components/modal'
import WalletWidget from '@/components/wallet/WalletWidget'
import Logo from '@/components/logo/Logo';

interface Props {
  children: React.ReactElement
}

const HideOnScroll = ({ children }: Props) => {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

export const Header = () => {
  const modal = useModal()

  const handleClick = () => {
    modal.openSetting()
  }

  return (
    <HideOnScroll>
      <Container>
        <Box
          component="header"
          sx={(theme) => ({
            transition: theme.transitions.create('top'),
            zIndex: theme.zIndex.appBar,
            backgroundColor: 'background.header',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'space-between',
            py: 4
          })}
        >
          <Logo />
          <Box sx={{ ml: 2 }}>
            <NavItems />
          </Box>

          <Box sx={{ ml: 'auto' }}>
            <WalletWidget />
            <Button variant="primary" sx={{ ml: 2 }} onClick={handleClick}>
              <SettingsOutlinedIcon sx={{ mr: 2, fontSize: 18 }} />
              Settings
            </Button>
          </Box>
        </Box>
      </Container>
    </HideOnScroll>
  )
}
