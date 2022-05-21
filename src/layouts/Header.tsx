import {
  Slide,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  children: React.ReactElement;
}

const HideOnScroll = ({ children }: Props) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export const Header = () => {
  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.down("md"));

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletWidgetOpen, setWalletWidgetOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen && !md) {
      setMobileMenuOpen(false);
    }
    if (walletWidgetOpen) {
      setWalletWidgetOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [md]);

  const headerHeight = 48;

  return (
    <HideOnScroll>
      <Box
        component="header"
        sx={(theme) => ({
          height: headerHeight,
          position: "sticky",
          top: 0,
          transition: theme.transitions.create("top"),
          zIndex: theme.zIndex.appBar,
          backgroundColor: "background.header",
          padding: {
            xs:
              mobileMenuOpen || walletWidgetOpen
                ? "8px 20px"
                : "8px 8px 8px 20px",
            xsm: "8px 20px",
          },
          display: "flex",
          alignItems: "center",
          flexDirection: "space-between",
          boxShadow: "inset 0px -1px 0px rgba(242, 243, 247, 0.16)",
        })}
      >
        <Link href="/">
          <a>
            <Box
              sx={{
                lineHeight: 0,
                mr: 7,
                transition: "0.3s ease all",
                "&:hover": { opacity: 0.7 },
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <img src="/logo.svg" alt="App Logo" height={40} />
            </Box>
          </a>
        </Link>
      </Box>
    </HideOnScroll>
  );
};
