import { useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import { ReactNode, useEffect, useMemo, useState, createContext } from "react";

import { getDesignTokens, getThemedComponents } from "../utils/theme";

export const ColorModeContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleColorMode: () => { },
});

type Mode = "light" | "dark";

const initialMode = process.env.NEXT_PUBLIC_APP_MODE as Mode

export function AppGlobalStyles({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("colorMode", newMode);
          return newMode;
        });
      },
    }),
    []
  );

  useEffect(() => {
    const initialMode = localStorage?.getItem("colorMode") as Mode;
    if (initialMode) {
      setMode(initialMode);
    }
  }, []);

  const theme = useMemo(() => {
    const themeCreate = createTheme(getDesignTokens(mode));
    return deepmerge(themeCreate, getThemedComponents(themeCreate));
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
