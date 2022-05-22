import {
  Button,
  List,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { navigation } from './menu-items'
import { MoreMenu } from './MoreMenu'
import Link from 'next/link'

interface NavItemsProps {
  setOpen?: (value: boolean) => void
}

export const NavItems = ({ setOpen }: NavItemsProps) => {
  const { breakpoints } = useTheme()
  const md = useMediaQuery(breakpoints.down('md'))

  return (
    <List
      sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', md: 'center' },
        flexDirection: { xs: 'column', md: 'row' }
      }}
      disablePadding
    >
      {navigation.map((item, index) => (
        <ListItem
          sx={{
            display:
              !!item.isVisible && !item.isVisible ? 'none' : 'inline-flex',
            width: { xs: '100%', md: 'unset' },
            mr: { xs: 0, md: 2 }
          }}
          data-cy={item.dataCy}
          disablePadding
          key={index}
        >
          {md ? (
            <Typography
              component={Link}
              href={item.link}
              variant="h2"
              sx={{ width: '100%', p: 4 }}
              onClick={() => (setOpen ? setOpen(false) : undefined)}
            >
              {item.title}
            </Typography>
          ) : (
            <Link href={item.link}>
              <a>
                <Button
                  sx={() => ({
                    color: '#F1F1F3',
                    p: '6px 8px',
                    position: 'relative',
                    '.active&:after, &:hover&:after': {
                      transform: 'scaleX(1)',
                      transformOrigin: 'bottom left'
                    },
                    '&:after': {
                      content: "''",
                      position: 'absolute',
                      width: '100%',
                      transform: 'scaleX(0)',
                      height: '2px',
                      bottom: '-6px',
                      left: '0',
                      transformOrigin: 'bottom right',
                      transition: 'transform 0.25s ease-out'
                    }
                  })}
                >
                  {item.title}
                </Button>
              </a>
            </Link>
          )}
        </ListItem>
      ))}

      <ListItem
        sx={{ display: { xs: 'none', md: 'flex' }, width: 'unset' }}
        disablePadding
      >
        <MoreMenu />
      </ListItem>
    </List>
  )
}
