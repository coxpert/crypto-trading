import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { Box, Button, ListItemIcon, ListItemText, SvgIcon } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link'
import { useState } from 'react'

import { moreMenus } from './menu-items'

export function MoreMenu() {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const open = Boolean(anchorEl)
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        aria-label="more"
        id="more-button"
        aria-controls={open ? 'more-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          color: '#F1F1F3',
          minWidth: 'unset',
          p: '6px 8px',
          '&:hover': {
            bgcolor: 'rgba(250, 251, 252, 0.08)'
          }
        }}
      >
        More
        <SvgIcon color="inherit" sx={{ ml: 1 }}>
          <DotsHorizontalIcon />
        </SvgIcon>
      </Button>

      <Menu
        id="more-menu"
        MenuListProps={{
          'aria-labelledby': 'more-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        keepMounted={true}
      >
        {moreMenus.map((item, index) => (
          <MenuItem key={index}>
            <Link href={item.link}>
              <a>
                <Box display="flex">
                  <ListItemIcon>
                    <SvgIcon sx={{ fontSize: '20px' }}>{item.icon}</SvgIcon>
                  </ListItemIcon>
                  <ListItemText>{item.title}</ListItemText>
                </Box>
              </a>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
