import { ErrorMessageProps, FormikProps } from "formik";
import { FormattedMessage } from "react-intl";

interface IErrorMessageProps extends ErrorMessageProps {
  formikHandler: FormikProps<any>;
}

const ErrorMessage = ({
  formikHandler,
  name,
  ...props
}: IErrorMessageProps) => {
  const messages: { [key: string]: React.ReactNode } = {
    "error.urlRequired": (
      <FormattedMessage
        id="error.urlRequired"
        defaultMessage="The URL field is required"
      />
    ),
    "error.urlInvalid": (
      <FormattedMessage
        id="error.urlInvalid"
        defaultMessage="Enter valid URL"
      />
    ),
  };
  return (
    <>
      {formikHandler.touched[name] && formikHandler.errors[name] && (
        <div className="text-red-500 dark:text-red-300">
          <div>{messages[formikHandler.errors[name] as string]}</div>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
