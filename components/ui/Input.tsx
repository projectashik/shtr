import cn from "classnames";
import { FormikProps } from "formik";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  formikHandler?: FormikProps<any>;
}
const Input = ({ formikHandler, ...props }: InputProps) => {
  return (
    <input
      {...props}
      onChange={formikHandler ? formikHandler?.handleChange : props.onChange}
      onBlur={formikHandler ? formikHandler?.handleBlur : props.onBlur}
      value={
        formikHandler ? formikHandler?.values[props.id as string] : props.value
      }
      id={props.id}
      name={props.id}
      className={cn(
        "block w-full rounded-lg border border-gray-300  bg-gray-50 p-2 text-sm text-gray-900 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:p-2.5 md:text-base",
        props.className
      )}
    />
  );
};

export default Input;
