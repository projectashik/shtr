import { Dialog, Menu, Transition } from "@headlessui/react";
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
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog.Overlay className="bg-dark101 fixed inset-0 bg-opacity-50 backdrop-blur-sm transition-opacity" />
      </Transition.Child>
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
      className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      {...props}
    >
      <span className="sr-only">{label}</span>
      {children}
      <HiChevronDown
        className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
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
          "absolute right-0 z-10 w-56 origin-top-right list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:bg-gray-700",
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
