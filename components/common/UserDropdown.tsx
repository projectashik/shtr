import { Menu, Transition } from "@headlessui/react";
import { Button } from "components/ui";
import { useUser } from "hooks";
import { useRouter } from "next/router";
import { FiChevronDown, FiSettings } from "react-icons/fi";
import { HiOutlineLogout, HiOutlineUserCircle } from "react-icons/hi";
import { FormattedMessage } from "react-intl";

const UserDropdown = () => {
  const { user, logout } = useUser();
  const router = useRouter();

  const dropItems = [
    {
      label: <FormattedMessage id="label.profile" defaultMessage="Profile" />,
      onClick: () => router.push("/profile"),
      icon: <HiOutlineUserCircle />,
    },
    {
      label: <FormattedMessage id="label.settings" defaultMessage="Settings" />,
      onClick: () => router.push("/settings/accounts"),
      icon: <FiSettings />,
    },
    {
      label: <FormattedMessage id="label.logout" defaultMessage="Logout" />,
      onClick: () => logout(),
      icon: <HiOutlineLogout />,
    },
  ];
  return (
    <Menu as="div" className="relative ml-4 inline-block text-left">
      <Button rightIcon={<FiChevronDown />} look="alternate">
        <Menu.Button as="span">{user && user.username}</Menu.Button>
      </Button>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right list-none divide-y divide-gray-100 rounded bg-white shadow dark:bg-gray-700">
          <div className="flex flex-col py-1 px-1">
            {dropItems.map((item, index) => (
              <Menu.Item key={index}>
                <button
                  onClick={() => item.onClick()}
                  className={`flex items-center rounded-md py-1 px-4 text-gray-700  hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white sm:py-2`}
                >
                  <span className="mr-2 text-xl">{item.icon}</span>
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
