import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiOutlineExclamation } from "react-icons/hi";
import { Button } from ".";

interface ModalProps {
  title: string;
  description?: string;
  children: JSX.Element;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Modal = ({
  title,
  description,
  children,
  isOpen,
  setIsOpen,
}: ModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        className="fixed z-10 inset-0 overflow-y-auto "
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-dark101 backdrop-blur-sm bg-opacity-50 transition-opacity" />
          </Transition.Child>
          {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block align-bottom border border-gray-600 text-dark101 bg-white dark:text-white dark:bg-dark101 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <Dialog.Title className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  {title}
                </Dialog.Title>
                {description && (
                  <Dialog.Description className="text-base text-gray-600 dark:text-gray-400">
                    {description}
                  </Dialog.Description>
                )}

                <div className="mt-2">{children}</div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
