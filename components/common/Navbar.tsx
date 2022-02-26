import LinkSVG from "components/logos/link";
import LanguageButton from "components/settings/LanguageButton";
import Link from "next/link";
import { UserDropdown } from ".";

const Navbar = () => {
  return (
    <header>
      <nav className="dark:border-dark102 dark:bg-dark101 rounded border-b border-gray-200 bg-white px-2 py-2.5 sm:px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <Link href="/">
            <a className="flex">
              <LinkSVG />
              <span className="ml-1 self-center whitespace-nowrap text-xl  font-semibold dark:text-white md:ml-3">
                Shtr
              </span>
            </a>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageButton />
            <UserDropdown />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
