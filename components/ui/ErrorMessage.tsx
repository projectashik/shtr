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
    "error.passwordRequired": (
      <FormattedMessage
        id="error.passwordRequired"
        defaultMessage="The password field is required"
      />
    ),
    "error.newPasswordRequired": (
      <FormattedMessage
        id="error.newPasswordRequired"
        defaultMessage="The new password field is required"
      />
    ),
    "error.passwordMinLength": (
      <FormattedMessage
        id="error.passwordMinLength"
        defaultMessage="The password must be at least 8 characters"
      />
    ),
    "error.passwordMustMatchConfirmation": (
      <FormattedMessage
        id="error.passwordMustMatchConfirmation"
        defaultMessage="The password and confirmation password must match"
      />
    ),
    "error.usernameRequired": (
      <FormattedMessage
        id="error.usernameRequired"
        defaultMessage="The username field is required"
      />
    ),
    "error.usernameUnique": (
      <FormattedMessage
        id="error.usernameUnique"
        defaultMessage="The username is already taken"
      />
    ),
    "error.slugRequired": (
      <FormattedMessage
        id="error.slugRequired"
        defaultMessage="The slug field is required"
      />
    ),
    "error.invalidCredentials": (
      <FormattedMessage
        id="error.invalidCredentials"
        defaultMessage="The username or password is incorrect"
      />
    ),
    "error.somethingWrong": (
      <FormattedMessage
        id="error.somethingWrong"
        defaultMessage="Something went wrong"
      />
    ),
    "error.currentPasswordIncorrect": (
      <FormattedMessage
        id="error.currentPasswordIncorrect"
        defaultMessage="Current password is incorrect"
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
