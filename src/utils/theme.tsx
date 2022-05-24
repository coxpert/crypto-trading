import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  ChevronDownIcon
} from '@heroicons/react/outline'
import { SvgIcon, Theme, ThemeOptions } from '@mui/material'
import { CSSProperties } from 'react'
import { createTheme } from '@mui/material/styles'

const theme = createTheme()
const {
  typography: { pxToRem }
} = theme

const FONT = 'Inter, Arial'

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    default: string
    paper: string
    surface: string
    header: string
  }

  interface TypeText {
    default: string
  }

  interface Palette {
    gradients: {
      default: string
    }
  }

  interface PaletteOptions {
    gradients: {
      default: string
    }
  }
}

interface TypographyCustomVariants {
  description: CSSProperties
  helperText: CSSProperties
  tooltip: CSSProperties
}

declare module '@mui/material/styles' {
  type TypographyVariants = TypographyCustomVariants

  // allow configuration using `createTheme`
  type TypographyVariantsOptions = TypographyCustomVariants

  interface BreakpointOverrides {
    xsm: true
    xxl: true
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    description: true
    label: true
    helperText: true
    tooltip: true
    button: false
    overline: false
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    surface: true
    gradient: true
    primary: true
    secondary: true
  }
}

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    transparent: true
  }
}

export const getDesignTokens = (mode: 'light' | 'dark') => {
  const getColor = (lightColor: string, darkColor: string) =>
    mode === 'dark' ? darkColor : lightColor

  return {
    breakpoints: {
      keys: ['xs', 'xsm', 'sm', 'md', 'lg', 'xl', 'xxl'],
      values: {
        xs: 0,
        xsm: 640,
        sm: 760,
        md: 960,
        lg: 1280,
        xl: 1440,
        xxl: 1800
      }
    },
    palette: {
      mode,
      primary: {
        main: getColor('#0C3EE3', '#0C3EE3'),
        light: getColor('#0C3EE3', '#0C3EE3'),
        dark: getColor('#0a33bb', '#0a33bb')
      },
      secondary: {
        main: getColor('#F0F3FB', '#FFFFFF'),
        light: getColor('#0C3EE3', '#000000'),
        dark: getColor('#F0F3FB', '#000000')
      },
      error: {
        main: getColor('#d32f2f', '#d32f2f'),
        light: getColor('#ef5350', '#ef5350'),
        dark: getColor('#c62828', '#c62828')
      },
      warning: {
        main: getColor('#F89F1A', '#000000'),
        light: getColor('#FFCE00', '#000000'),
        dark: getColor('#C67F15', '#000000')
      },
      info: {
        main: getColor('#0062D2', '#000000'),
        light: getColor('#0062D2', '#000000'),
        dark: getColor('#002754', '#000000')
      },
      success: {
        main: getColor('#4CAF50', '#000000'),
        light: getColor('#90FF95', '#000000'),
        dark: getColor('#318435', '#000000')
      },
      text: {
        default: getColor('#5E6D7C', '#FFFFFF'),
        active: getColor('rgba(0,250,255,0.71)', 'rgba(0,250,255,0.71)'),
        link: getColor('rgba(0,250,255,0.71)', 'rgba(0,250,255,0.71)'),
        primary: getColor('#303549', 'rgba(0,250,255,0.71)'),
        secondary: getColor('#9BA4AE', '#9BA4AE'),
        disabled: getColor('#D2D4DC', '#FFFFFF')
      },
      background: {
        header: getColor('#FFFFFF00', '#00000000'),
        default: getColor('#F1F1F3', '#0e0f1b'),
        paper: getColor('#FFFFFF', 'rgb(13, 31, 50)'),
        surface: getColor('#F7F7F9', 'rgb(13, 31, 50)'),
        tab: getColor('#F1F1F3', '#0e0f1b'),
        tabActive: getColor('#F1F1F3', '#232543')
      },
      divider: getColor('#EAEBEF', '#000000'),
      gradients: {
        default: 'linear-gradient(90deg,rgba(0,250,255,0.71) 0%,#7200ff 100%)'
      }
    },
    spacing: 4,
    typography: {
      fontFamily: FONT,
      overline: undefined,
      display1: {
        fontFamily: FONT,
        fontWeight: 700,
        letterSpacing: pxToRem(0.25),
        lineHeight: '123.5%',
        fontSize: pxToRem(32)
      },
      h1: {
        fontFamily: FONT,
        fontWeight: 700,
        letterSpacing: pxToRem(0.25),
        lineHeight: '123.5%',
        fontSize: pxToRem(32)
      },
      h2: {
        fontFamily: FONT,
        fontWeight: 700,
        letterSpacing: pxToRem(0.25),
        lineHeight: '123.5%',
        fontSize: pxToRem(28)
      },
      h3: {
        fontFamily: FONT,
        fontWeight: 700,
        letterSpacing: 'unset',
        lineHeight: '133.4%',
        fontSize: 24
      },
      h4: {
        fontFamily: FONT,
        fontWeight: 600,
        letterSpacing: pxToRem(0.15),
        lineHeight: '160%',
        fontSize: pxToRem(20)
      },
      h5: {
        fontFamily: FONT,
        fontWeight: 600,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(24),
        fontSize: pxToRem(16)
      },
      h6: {
        fontFamily: FONT,
        fontWeight: 600,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(24),
        fontSize: pxToRem(14)
      },
      label: {
        display: 'block',
        fontFamily: FONT,
        fontWeight: 500,
        color: theme.palette.text.secondary,
        fontSize: 16
      },
      description: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: '143%',
        fontSize: pxToRem(14)
      },
      caption: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(16),
        fontSize: pxToRem(12)
      },
      helperText: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.4),
        lineHeight: pxToRem(12),
        fontSize: pxToRem(10)
      },
      tooltip: {
        fontFamily: FONT,
        fontWeight: 400,
        letterSpacing: pxToRem(0.15),
        lineHeight: pxToRem(16),
        fontSize: pxToRem(12)
      }
    }
  } as ThemeOptions
}

type ThemeType = Theme & {
  typography: {
    buttonS: CSSProperties
    buttonL: CSSProperties
    buttonM: CSSProperties
    subheader1: CSSProperties
  }
}

export function getThemedComponents(t: Theme) {
  const theme = t as ThemeType
  return {
    components: {
      MuiSkeleton: {
        styleOverrides: {
          root: {
            transform: 'unset'
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: '6px',
            borderColor: theme.palette.divider,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#CBCDD8'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#CBCDD8'
            }
          }
        }
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true
        },
        styleOverrides: {
          root: {
            borderRadius: 4,
            textTransform: 'capitalize'
          },
          sizeLarge: {
            ...theme.typography.buttonL,
            padding: '10px 24px'
          },
          sizeMedium: {
            ...theme.typography.buttonM,
            padding: '6px 12px'
          },
          sizeSmall: {
            ...theme.typography.buttonS,
            padding: '0 6px'
          }
        },
        variants: [
          {
            props: { variant: 'primary' },
            style: {
              color: theme.palette.common.white,
              border: '1px solid',
              borderColor: theme.palette.primary.main,
              backgroundColor: theme.palette.primary.main,
              backgroundImage: theme.palette.gradients.default,
              '&:hover, &.Mui-focusVisible': {
                backgroundColor: theme.palette.primary.dark,
                backgroundImage: 'none',
                boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.23)'
              },
              padding: '8px 20px'
            }
          },
          {
            props: { variant: 'secondary' },
            style: {
              color: theme.palette.text.secondary,
              border: '1px solid',
              borderColor: theme.palette.secondary.main,
              backgroundColor: 'transparent',
              fontWeight: 700,
              '&:hover, &.Mui-focusVisible': {
                backgroundColor: theme.palette.secondary.dark,
                boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.23)'
              },
              padding: '8px 20px'
            }
          },
          {
            props: { variant: 'surface' },
            style: {
              color: theme.palette.text.default,
              border: 'solid 1px',
              backgroundColor: 'transparent',
              '&:hover, &.Mui-focusVisible': {
                backgroundColor: theme.palette.background.header
              },
              padding: '8px 20px!important'
            }
          },
          {
            props: { variant: 'gradient' },
            style: {
              color: theme.palette.common.white,
              background: theme.palette.gradients.default,
              transition: 'all 0.2s ease',
              '&:hover, &.Mui-focusVisible': {
                background: theme.palette.gradients.default,
                opacity: '0.9'
              }
            }
          },
          {
            props: { color: 'primary', variant: 'outlined' },
            style: {
              background: theme.palette.background.surface,
              borderColor: theme.palette.divider
            }
          }
        ]
      },
      MuiTypography: {
        defaultProps: {
          variant: 'description',
          variantMapping: {
            display1: 'h1',
            h1: 'h1',
            h2: 'h2',
            h3: 'h3',
            h4: 'h4',
            h5: 'h5',
            h6: 'h6',
            subheader1: 'p',
            subheader2: 'p',
            caption: 'p',
            description: 'p',
            helperText: 'span',
            tooltip: 'span'
          }
        },
        styleOverrides: {
          root: {
            color: theme.palette.text.default
          }
        }
      },
      MuiLink: {
        defaultProps: {
          variant: 'description'
        }
      },
      MuiMenu: {
        defaultProps: {
          PaperProps: {
            elevation: 0,
            variant: 'outlined',
            style: {
              minWidth: 240,
              marginTop: '4px'
            }
          }
        },
        styleOverrides: {
          root: {
            '.MuiPaper-root': {
              backgroundColor: theme.palette.background.default
            }
          }
        }
      },
      MuiList: {
        styleOverrides: {
          root: {
            '.MuiMenuItem-root+.MuiDivider-root, .MuiDivider-root': {
              marginTop: '4px',
              marginBottom: '4px'
            }
          },
          padding: {
            paddingTop: '4px',
            paddingBottom: '4px'
          }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            padding: '12px 16px',
            '.Mui-selected': {
              backgroundColor: theme.palette.background.paper
            }
          }
        }
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            ...theme.typography.subheader1
          }
        }
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: theme.palette.primary.light,
            minWidth: 'unset !important',
            marginRight: '12px'
          }
        }
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            marginTop: 0,
            marginBottom: 0
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: 4,
            color: theme.palette.text.default
          }
        },
        variants: [
          {
            props: { variant: 'outlined' },
            style: {
              border: '2px solid',
              borderColor: theme.palette.common.white,
              background: 'transparent'
            }
          },
          {
            props: { variant: 'transparent' },
            style: {
              border: 'none',
              background: 'transparent'
            }
          },
          {
            props: { variant: 'elevation' },
            style: {
              boxShadow:
                '0px 2px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25)',
              ...(theme.palette.mode === 'dark'
                ? { backgroundImage: 'none' }
                : {})
            }
          }
        ]
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            flexGrow: 'unset',
            [theme.breakpoints.up('xs')]: {
              paddingLeft: '8px',
              paddingRight: '8px'
            },
            [theme.breakpoints.up('xsm')]: {
              paddingLeft: '20px',
              paddingRight: '20px'
            },
            [theme.breakpoints.up('sm')]: {
              paddingLeft: '48px',
              paddingRight: '48px'
            },
            [theme.breakpoints.up('md')]: {
              paddingLeft: '96px',
              paddingRight: '96px'
            },
            [theme.breakpoints.up('lg')]: {
              paddingLeft: '20px',
              paddingRight: '20px'
            },
            [theme.breakpoints.up('xl')]: {
              maxWidth: 'unset',
              paddingLeft: '96px',
              paddingRight: '96px'
            },
            [theme.breakpoints.up('xxl')]: {
              paddingLeft: 0,
              paddingRight: 0,
              maxWidth: '1440px'
            }
          }
        }
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            height: 24 + 6 * 2,
            width: 48 + 6 * 2,
            padding: 6
          },
          switchBase: {
            padding: 8,
            '&.Mui-checked': {
              transform: 'translateX(23px)',
              '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.primary.main,
                opacity: 1
              }
            },
            '&.Mui-disabled': {
              opacity: theme.palette.mode === 'dark' ? 0.3 : 0.7
            }
          },
          thumb: {
            color: theme.palette.common.white,
            borderRadius: 100,
            width: 20,
            height: 20,
            boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.12)'
          },
          track: {
            opacity: 1,
            backgroundColor: 'gray',
            borderRadius: 100
          }
        }
      },
      MuiIcon: {
        variants: [
          {
            props: { fontSize: 'large' },
            style: {
              fontSize: pxToRem(32)
            }
          }
        ]
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: theme.palette.divider
          }
        }
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            borderRadius: '4px',
            padding: '8px 0px',
            ...theme.typography.caption,
            alignItems: 'flex-start',
            '.MuiAlert-message': {
              padding: 0,
              paddingTop: '2px',
              paddingBottom: '2px'
            },
            '.MuiAlert-icon': {
              padding: 0,
              opacity: 1,
              '.MuiSvgIcon-root': {
                fontSize: pxToRem(20)
              }
            },
            a: {
              ...theme.typography.caption,
              fontWeight: 500,
              textDecoration: 'underline',
              '&:hover': {
                textDecoration: 'none'
              }
            },
            '.MuiButton-text': {
              ...theme.typography.caption,
              fontWeight: 500,
              textDecoration: 'underline',
              padding: 0,
              margin: 0,
              minWidth: 'unset',
              '&:hover': {
                textDecoration: 'none',
                background: 'transparent'
              }
            }
          }
        },
        defaultProps: {
          iconMapping: {
            error: (
              <SvgIcon color="error">
                <ExclamationIcon />
              </SvgIcon>
            ),
            info: (
              <SvgIcon color="info">
                <InformationCircleIcon />
              </SvgIcon>
            ),
            success: (
              <SvgIcon color="success">
                <CheckCircleIcon />
              </SvgIcon>
            ),
            warning: (
              <SvgIcon color="warning">
                <ExclamationCircleIcon />
              </SvgIcon>
            )
          }
        },
        variants: [
          {
            props: { severity: 'error' },
            style: {
              color: theme.palette.error.main,
              background: theme.palette.error.light,
              a: {
                color: theme.palette.error.main
              },
              '.MuiButton-text': {
                color: theme.palette.error.main
              }
            }
          },
          {
            props: { severity: 'info' },
            style: {
              color: theme.palette.info.main,
              background: theme.palette.info.light,
              a: {
                color: theme.palette.info.main
              },
              '.MuiButton-text': {
                color: theme.palette.info.main
              }
            }
          },
          {
            props: { severity: 'success' },
            style: {
              color: theme.palette.success.main,
              background: theme.palette.success.light,
              a: {
                color: theme.palette.success.main
              },
              '.MuiButton-text': {
                color: theme.palette.success.main
              }
            }
          },
          {
            props: { severity: 'warning' },
            style: {
              color: theme.palette.warning.main,
              background: theme.palette.warning.light,
              a: {
                color: theme.palette.warning.main
              },
              '.MuiButton-text': {
                color: theme.palette.warning.main
              }
            }
          }
        ]
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            '.MuiInputLabel-root': {
              color: theme.palette.text.default,
              backgroundColor: theme.palette.background.default,
              padding: '0 8px'
            },
            '.MuiInputLabel-root.Mui-focused': {
              color: theme.palette.text.default,
              backgroundColor: theme.palette.background.default,
              padding: '0 8px'
            },
            '.MuiOutlinedInput-root': {
              color: theme.palette.text.default
            }
          }
        }
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: FONT,
            fontWeight: 400,
            fontSize: pxToRem(14),
            minWidth: '375px',
            '> div:first-of-type': {
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column'
            }
          }
        }
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: theme.palette.text.default
          }
        },
        variants: [
          {
            props: { color: 'error' },
            style: {
              color: theme.palette.error.main
            }
          },
          {
            props: { color: 'info' },
            style: {
              color: theme.palette.info.main
            }
          },
          {
            props: { color: 'success' },
            style: {
              color: theme.palette.success.main
            }
          },
          {
            props: { color: 'warning' },
            style: {
              color: theme.palette.warning.main
            }
          }
        ]
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            backgroundColor: '#383D51',
            border: '1px solid rgba(235, 235, 237, 0.12)',
            padding: '4px'
          }
        }
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            border: '0px',
            flex: 1,
            backgroundColor: '#383D51',
            borderRadius: '4px',

            '&.Mui-selected, &.Mui-selected:hover': {
              backgroundColor: '#FFFFFF',
              borderRadius: '4px !important'
            },

            '&.Mui-selected, &.Mui-disabled': {
              zIndex: 100,
              height: '100%',
              display: 'flex',
              justifyContent: 'center'
            }
          }
        }
      },
      MuiSelect: {
        defaultProps: {
          IconComponent: (props) => (
            <SvgIcon sx={{ fontSize: '16px' }} {...props}>
              <ChevronDownIcon />
            </SvgIcon>
          )
        },
        styleOverrides: {
          outlined: {}
        }
      },
      MuiLinearProgress: {
        styleOverrides: {
          bar1Indeterminate: {
            background: theme.palette.gradients.default
          },
          bar2Indeterminate: {
            background: theme.palette.gradients.default
          }
        }
      }
    }
  } as ThemeOptions
}
