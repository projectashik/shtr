import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FiX } from "react-icons/fi";
import { FormattedMessage } from "react-intl";
import { Button } from ".";

interface ModalProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: JSX.Element;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm?: () => void;
  confirmText?: React.ReactNode;
  confirmType?: "button" | "submit" | "reset" | undefined;
  confirmLook?: "primary" | "alternate" | "danger";
  loading?: boolean;
  cancelText?: React.ReactNode;
}

const Modal = ({
  title,
  description,
  children,
  isOpen,
  onConfirm,
  setIsOpen,
  confirmType = "submit",
  loading,
  confirmText = (
    <FormattedMessage id="label.confirm" defaultMessage={`Confirm`} />
  ),
  cancelText = <FormattedMessage id="label.cancel" defaultMessage={`Cancel`} />,
  confirmLook = "primary",
}: ModalProps) => {
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        className="fixed inset-0 z-10 overflow-y-auto "
        open={isOpen}
        onClose={onClose}
      >
        <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
          {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
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
            <div className="text-dark101 dark:bg-dark101 my:4 inline-block transform overflow-hidden rounded-lg border border-gray-600 bg-white text-left align-bottom shadow-xl transition-all dark:text-white sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <Button
                look="alternate"
                className="fixed right-0.5 rounded-full ring-0"
                style={{
                  padding: "10px",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                }}
                onClick={() => setIsOpen(false)}
              >
                <FiX />
              </Button>
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                  {title}
                </Dialog.Title>
                {description && (
                  <Dialog.Description className="text-base text-gray-600 dark:text-gray-400">
                    {description}
                  </Dialog.Description>
                )}

                <div className="mt-2">{children}</div>
                {onConfirm && (
                  <div className="mt-4 flex space-x-2">
                    <Button
                      type={confirmType}
                      loading={loading}
                      look={confirmLook}
                      onClick={onConfirm}
                    >
                      {confirmText || "Confirm"}
                    </Button>
                    <Button look="alternate" onClick={onClose}>
                      {cancelText}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
