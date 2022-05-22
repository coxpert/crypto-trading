import { ReactNode } from "react";
import { BookOpenIcon, QuestionMarkCircleIcon } from "@heroicons/react/outline";
import GithubIcon from '/public/icons/github.svg';
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
    title: "Home",
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
    icon: <QuestionMarkCircleIcon />,
  },
  {
    link: "https://docs.aave.com/portal/",
    title: "Developers",
    icon: <BookOpenIcon />,
  },
  {
    link: "https://discord.gg/7kHKnkDEUf",
    title: "Discord",
    icon: <GithubIcon />,
  },
  {
    link: "https://github.com/aave/interface",
    title: "Github",
    icon: <DiscordIcon />,
  },
];

export const moreMenuExtraItems: MoreMenuItem[] = [];

export const moreMenus: MoreMenuItem[] = [
  ...moreMenuItems,
  ...moreMenuExtraItems,
];
