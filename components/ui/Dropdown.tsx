import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment } from "react";
import { HiChevronDown } from "react-icons/hi";
import Button, { ButtonProps } from "./Button";

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}
const Dropdown = ({ children, className, as = "div" }: DropdownProps) => {
  return (
    <Menu
      as={as}
      className={classNames("relative inline-block text-left", className)}
    >
      {children}
    </Menu>
  );
};

interface DropdownButtonProps extends ButtonProps {
  label?: string;
}
const DropdownButton = ({ children, label, ...props }: DropdownButtonProps) => {
  return (
    <Menu.Button
      as={Button}
      className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      {...props}
    >
      <span className="sr-only">{label}</span>
      {children}
      <HiChevronDown
        className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
        aria-hidden="true"
      />
    </Menu.Button>
  );
};

interface DropdownBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

const DropdownBody = ({
  children,
  as = "ul",
  className,
}: DropdownBodyProps) => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items
        as={as}
        className={classNames(
          "absolute right-0 z-10 w-56 text-base origin-top-right list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700",
          className
        )}
      >
        {children}
      </Menu.Items>
    </Transition>
  );
};

Dropdown.Button = DropdownButton;
Dropdown.Body = DropdownBody;

export default Dropdown;
