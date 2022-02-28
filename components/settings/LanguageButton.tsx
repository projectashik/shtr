import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Button } from "components/ui";
import useLocale from "hooks/useLocale";
import { languages } from "lib/lang";
import { FiCheck, FiGlobe } from "react-icons/fi";

const LanguageButton = () => {
  const { locale, saveLocale } = useLocale();
  const menuOptions = Object.keys(languages).map((key) => ({
    ...languages[key],
    value: key,
  }));
  return (
    <Menu as="div" className="relative ml-4 inline-block text-left">
      <Button leftIcon={<FiGlobe />} look="alternate">
        <Menu.Button as="span">{locale}</Menu.Button>
      </Button>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-[500px] origin-top-right list-none divide-y divide-gray-100 rounded bg-white p-4 shadow dark:bg-gray-700">
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
            {menuOptions.map((option) => (
              <Menu.Item as="span" key={option.label}>
                <button
                  onClick={() => saveLocale(option.value)}
                  className={classNames(
                    "hover:bg-gray101 dark:hover:bg-dark102 flex w-full items-center  gap-2 whitespace-nowrap rounded p-1 text-left text-sm",
                    locale === option.value && "font-bold"
                  )}
                  key={option.label}
                >
                  {locale === option.value ? <FiCheck /> : ""}
                  {option.label}
                </button>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LanguageButton;
