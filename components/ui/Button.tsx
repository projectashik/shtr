import classNames from "classnames";
import { HiOutlineRefresh } from "react-icons/hi";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  look?: "primary" | "alternate" | "danger";
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  loading?: boolean;
}
const Button = ({
  look = "primary",
  children,
  className,
  rightIcon,
  leftIcon,
  loading,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={loading}
      className={classNames(
        "text-white disabled:opacity-70 flex items-center focus:ring-4 font-medium rounded-lg px-3 py-2 text-sm sm:text-base sm:px-5 sm:py-2.5 text-center ",
        look === "alternate" &&
          "text-gray-500 border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
        look === "primary" &&
          "bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",
        look === "danger" &&
          "bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800",
        className
      )}
      {...props}
    >
      {loading && (
        <span className="mr-1 animate-spin">
          <HiOutlineRefresh />
        </span>
      )}
      {leftIcon && <span className="mr-1">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-1">{rightIcon}</span>}
    </button>
  );
};

export default Button;
