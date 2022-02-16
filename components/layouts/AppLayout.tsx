import { CommandBar, UserDropdown } from "components/common";
import LinkSVG from "components/logos/link";
import { Button } from "components/ui";
import Link from "next/link";
import Layout from "./Layout";

interface AppLayoutProps {
  children: React.ReactNode;
}
const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Layout>
      <header>
        <nav className="rounded border-b border-gray-200 bg-white px-2 py-2.5 dark:border-dark102 dark:bg-dark101 sm:px-4">
          <div className="container mx-auto flex flex-wrap items-center justify-between">
            <Link href="/">
              <a className="flex">
                <LinkSVG />
                <span className="ml-1 self-center whitespace-nowrap text-xl  font-semibold dark:text-white md:ml-3">
                  Shtr.tk
                </span>
              </a>
            </Link>
            <div className="flex items-center">
              <Button>Create URL</Button>
              <UserDropdown />
            </div>
          </div>
        </nav>
      </header>
      <main className="container mx-auto mt-8 px-2 md:px-0">
        <CommandBar />
        {children}
      </main>
    </Layout>
  );
};

export default AppLayout;
