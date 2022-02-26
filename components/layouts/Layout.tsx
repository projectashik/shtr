import { Button } from "components/ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const Layout = ({ children }: any) => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("");

  useEffect(() => {
    if (theme === "dark") {
      setCurrentTheme("light");
    } else if (theme === "light") {
      setCurrentTheme("dark");
    } else if (theme === "system") {
      if (systemTheme === "dark") {
        setCurrentTheme("light");
      } else if (systemTheme === "light") {
        setCurrentTheme("dark");
      }
    }
  }, [theme, setCurrentTheme, systemTheme]);
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else if (theme === "system") {
      if (systemTheme === "dark") {
        setTheme("light");
      } else if (systemTheme === "light") {
        setTheme("dark");
      }
    }
  };
  return (
    <div>
      {children}
      <Button
        title="Change Theme"
        className="fixed bottom-10 left-10"
        onClick={toggleTheme}
      >
        {theme === "light" ? <FiMoon /> : <FiSun />}
      </Button>
    </div>
  );
};

export default Layout;
