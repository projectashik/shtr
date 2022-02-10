import { ErrorMessageProps, FormikConfig, FormikProps } from "formik";

interface IErrorMessageProps extends ErrorMessageProps {
  formikHandler: FormikProps<any>;
}

const ErrorMessage = ({
  formikHandler,
  name,
  ...props
}: IErrorMessageProps) => {
  return (
    <>
      {formikHandler.touched[name] && formikHandler.errors[name] && (
        <div className="text-red-500 dark:text-red-300">
          <div>{formikHandler.errors[name]}</div>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
