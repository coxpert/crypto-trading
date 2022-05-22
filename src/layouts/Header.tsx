import {
  Slide,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import { Container } from "@mui/system";
import Image from 'next/image'
import { NavItems } from "@/components/menu/NavItems";

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
  return (
    <HideOnScroll>
      <Container>
        <Box
          component="header"
          sx={(theme) => ({
            transition: theme.transitions.create("top"),
            zIndex: theme.zIndex.appBar,
            backgroundColor: "background.header",
            display: "flex",
            alignItems: "center",
            flexDirection: "space-between",
            py: 4
          })}
        >
          <Link href="/">
            <a>
              <Box display="flex">
                <Image src="/logo.svg" alt="App Logo" height={40} width={40} layout="fixed" />
                <Typography variant="h1" sx={{ ml: 2 }}>Dexpools</Typography>
              </Box>
            </a>
          </Link>
          <NavItems />
        </Box>
      </Container>
    </HideOnScroll>
  );
};
