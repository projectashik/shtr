import classNames from "classnames";
import clsx from "./clsx";

export const changeTheme = (theme: "dark" | "light" | string) => {
  if (!document) return;
  if (!window) return;
  const el = document.documentElement;

  el?.setAttribute("class", clsx(`${theme}`));
  window?.localStorage.setItem("theme", theme);
  el?.setAttribute("style", clsx(`color-scheme: ${theme};`));
};
