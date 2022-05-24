import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { deepmerge } from '@mui/utils'
import { ReactNode, useEffect, useMemo, useState, createContext, useContext } from 'react'

import { getDesignTokens, getThemedComponents } from '../utils/theme'


type Mode = 'light' | 'dark'

const initialMode = process.env.NEXT_PUBLIC_APP_MODE as Mode

interface ModeContext {
  mode: Mode,
  toggleColorMode: () => void
}

export const ColorModeContext = createContext<ModeContext>({
  mode: 'dark',
  toggleColorMode: () => { }
})


export const useColorMode = () => useContext(ColorModeContext)

export function AppGlobalStyles({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(initialMode)

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light'
      localStorage.setItem('colorMode', newMode)
      return newMode
    })
  }

  useEffect(() => {
    const initialMode = localStorage?.getItem('colorMode') as Mode
    if (initialMode) {
      setMode(initialMode)
    }
  }, [])

  const theme = useMemo(() => {
    const themeCreate = createTheme(getDesignTokens(mode))
    return deepmerge(themeCreate, getThemedComponents(themeCreate))
  }, [mode])

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
