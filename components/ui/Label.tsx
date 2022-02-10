import classNames from "classnames";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}
const Label = ({ ...props }: LabelProps) => {
  return (
    <label
      className={classNames(
        "block mb-2  font-medium text-gray-900 dark:text-gray-300",
        props.className
      )}
      {...props}
    >
      {props.children}
    </label>
  );
};

export default Label;
