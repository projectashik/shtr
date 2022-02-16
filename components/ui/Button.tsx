import classNames from "classnames";
import { HiOutlineRefresh } from "react-icons/hi";
import { Tooltip } from "react-tiny-tooltip";

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
        "flex items-center rounded-lg px-3 py-2 text-center text-sm font-medium  focus:ring-4 disabled:opacity-70 sm:px-5 sm:py-2.5 sm:text-base ",
        look === "alternate" &&
          "hover:text-primary-700 focus:text-primary-700  focus:ring-primary-700 border border-gray-200 text-gray-500 hover:bg-gray-100 focus:z-10 focus:ring-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
        look === "primary" &&
          "bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 text-white",
        look === "danger" &&
          "bg-red-700 text-white hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800",
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
interface TooltipProps extends ButtonProps {
  tooltip: JSX.Element | string;
  showArrow?: boolean;
  sideOffset?: number;
  position?: "top" | "bottom" | "left" | "right";
}
export const TooltipButton = ({ ...props }: TooltipProps) => {
  return (
    <Tooltip
      content={props.tooltip}
      sideOffset={props.sideOffset}
      showArrow={props.showArrow}
      side={props.position}
    >
      <Button {...props} />
    </Tooltip>
  );
};

export default Button;
