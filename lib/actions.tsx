import { useTheme } from "next-themes";
import router from "next/router";
import { HiOutlineHome, HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { RiPaletteLine } from "react-icons/ri";
import { FiLayers, FiLogOut } from "react-icons/fi";
import { changeTheme } from "./theme";
import { useUser } from "hooks";
import logout from "pages/api/auth/logout";

const handleThemeChange = (theme: string | "light" | "dark") => {
  changeTheme(theme);
};

export const actions = [
  {
    id: "homeAction",
    name: "Home",
    shortcut: ["h"],
    keywords: "back",
    section: "Navigation",
    perform: () => router.push("/"),
    icon: <HiOutlineHome />,
  },
  {
    id: "changeTheme",
    name: "Change Theme",
    section: "Actions",
    shortcut: [],
    keywords: "background, change color,color,change theme,theme,dark,light",
    icon: <RiPaletteLine />,
  },
  {
    id: "darkTheme",
    name: "Dark",
    parent: "changeTheme",
    keywords: "dark",
    shortcut: ["d"],
    icon: <HiOutlineMoon />,
    perform: () => handleThemeChange("dark"),
  },
  {
    id: "systemTheme",
    name: "System",
    parent: "changeTheme",
    keywords: "system",
    shortcut: ["s"],
    icon: <FiLayers />,
    perform: () => handleThemeChange("system"),
  },
  {
    id: "lightTheme",
    name: "Light",
    parent: "changeTheme",
    keywords: "light",
    shortcut: ["l"],
    icon: <HiOutlineSun />,
    perform: () => handleThemeChange("light"),
  },
  {
    // TODO:: Add a logout action
    id: "logoutAction",
    name: "Logout",
    keywords: "logout, sign out",
    shortcut: [""],
    icon: <FiLogOut />,
    perform: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { logout } = useUser();
      logout();
    },
  },
];
