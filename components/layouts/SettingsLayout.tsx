import classNames from "classnames";
import AppLayout from "components/layouts/AppLayout";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
}

const SettingsLayout = ({ children }: Props) => {
  const router = useRouter();
  const isActive = (path: string) => {
    return router.pathname === path;
  };
  const links = [
    {
      link: "/settings/profile",
      label: "Profile",
    },
    {
      link: "/settings/accounts",
      label: "Accounts",
    },
    {
      link: "/settings/apis",
      label: "Apis",
    },
  ];
  return (
    <AppLayout>
      <h1 className="text-xl font-semibold tracking-wider">Settings</h1>
      <div className="mt-5 grid grid-cols-1  md:grid-cols-7 md:gap-4">
        <div className="mb-4 flex w-full rounded-md md:col-span-2 md:mb-0">
          <div className="dark:bg-dark102 w-full rounded-md bg-white p-4">
            <div className="flex w-full flex-row justify-between md:flex-col">
              {links.map((data, index) => (
                <Link key={index} href={data.link}>
                  <a
                    className={classNames(
                      "dark:hover:bg-dark101 flex items-center rounded p-3 hover:bg-gray-100",
                      isActive(data.link) && "dark:bg-dark101 bg-gray-200"
                    )}
                  >
                    {data.label}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-5 ">
          <div className="dark:bg-dark102 rounded-md bg-white p-4">
            {children}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsLayout;
