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
        "bg-gray-50 border outline-none border-gray-300 text-gray-900  rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-primary-500 block w-full sm:p-2.5 p-2 text-sm md:text-base dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",
        props.className
      )}
    />
  );
};

export default Input;
