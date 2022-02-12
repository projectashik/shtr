import { CommandBar, UserDropdown } from "components/common";
import LinkSVG from "components/logos/link";
import { Button } from "components/ui";
import Layout from "./Layout";

interface AppLayoutProps {
  children: React.ReactNode;
}
const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Layout>
      <header>
        <nav className="bg-white border-b border-gray-200 dark:border-dark102 px-2 sm:px-4 py-2.5 rounded dark:bg-dark101">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <a href="#" className="flex">
              <LinkSVG />
              <span className="md:ml-3 ml-1 self-center text-xl  font-semibold whitespace-nowrap dark:text-white">
                Shtr.tk
              </span>
            </a>
            <div className="flex items-center">
              <Button>Create URL</Button>
              <UserDropdown />
            </div>
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-2 md:px-0 mt-8">
        <CommandBar />
        {children}
      </main>
    </Layout>
  );
};

export default AppLayout;
