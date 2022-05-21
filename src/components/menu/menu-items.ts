import { ReactNode } from "react";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import DiscordIcon from "/public/icons/discord.svg";

interface Menu {
  link: string;
  title: string;
  isVisible?: boolean;
  dataCy?: string;
}

export const navigation: Menu[] = [
  {
    link: "/",
    title: "HOME",
  },
  {
    link: "/trade",
    title: "Trade",
  },
  {
    link: "/deposit",
    title: "Deposit",
  },
];

interface MoreMenuItem extends Menu {
  icon: ReactNode;
}

const moreMenuItems: MoreMenuItem[] = [
  {
    link: "https://docs.aave.com/faq/",
    title: "FAQ",
    icon: HelpOutlineOutlinedIcon,
  },
  {
    link: "https://docs.aave.com/portal/",
    title: "Developers",
    icon: MenuBookOutlinedIcon,
  },
  {
    link: "https://discord.gg/7kHKnkDEUf",
    title: "Discord",
    icon: GitHubIcon,
  },
  {
    link: "https://github.com/aave/interface",
    title: "Github",
    icon: DiscordIcon,
  },
];
