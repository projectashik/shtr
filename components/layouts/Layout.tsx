import { changeTheme } from "lib/theme";
import { useTheme } from "next-themes";

const Layout = ({ children }: any) => {
  const { theme, setTheme, systemTheme } = useTheme();
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
      <button onClick={toggleTheme} className="fixed bottom-10 left-10 block">
        Change Theme
      </button>
    </div>
  );
};

export default Layout;
