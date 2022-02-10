import { Menu, Transition } from "@headlessui/react";
import { Button } from "components/ui";
import { useAuth } from "hooks";
import { useRouter } from "next/router";
import logout from "pages/api/auth/logout";
import { Fragment } from "react";
import {
  HiChevronDown,
  HiOutlineLogout,
  HiOutlineUserCircle,
} from "react-icons/hi";

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const dropItems = [
    {
      label: "Profile",
      onClick: () => router.push("/profile"),
      icon: <HiOutlineUserCircle />,
    },
    { label: "Logout", onClick: () => logout(), icon: <HiOutlineLogout /> },
  ];
  return (
    <Menu as="div" className="ml-4 relative inline-block text-left">
      <div>
        <Menu.Button as={Button} rightIcon={<HiChevronDown />} look="alternate">
          {user && user.username}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right z-10 list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
          <div className="py-1 px-1 flex flex-col">
            {dropItems.map((item, index) => (
              <Menu.Item key={index}>
                <button
                  onClick={() => item.onClick()}
                  className={`flex items-center rounded-md py-1 sm:py-2 px-4  text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white`}
                >
                  <span className="text-xl mr-2">{item.icon}</span>
                  {item.label}
                </button>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserDropdown;
