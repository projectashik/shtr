import axios from "axios";
import { Button, Field, Form } from "components/ui";
import { useFormik } from "formik";
import { useUser } from "hooks";
import { toast } from "lib/toast";
import { FormattedMessage } from "react-intl";
import { PasswordUpdateSchema } from "schemas";

const UpdatePasswordForm = () => {
  const { user, logout } = useUser();
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: PasswordUpdateSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(`/api/user/${user?.user_id}/update`, {
          current_password: values.currentPassword,
          new_password: values.newPassword,
          confirmation: values.confirmNewPassword,
        });
        toast({
          message: (
            <FormattedMessage
              id="label.passwordUpdated"
              defaultMessage="Password updated."
            />
          ),
        });
        logout();
      } catch (e: any) {
        passwordFormik.setFieldError("currentPassword", e.response.data);
      }
    },
  });
  return (
    <Form
      formik={passwordFormik}
      className="dark:border-dark101 mt-4 max-w-lg rounded border p-4"
    >
      <h2 className="dark:border-dark101 mb-3 border-b  pb-3 text-lg font-medium">
        <FormattedMessage
          id="label.updatePassword"
          defaultMessage="Update password"
        />
      </h2>
      <div className="flex flex-col gap-4">
        <Field
          formikHandler={passwordFormik}
          id="currentPassword"
          type="password"
          label={
            <FormattedMessage
              id="label.currentPassword"
              defaultMessage="Current password"
            />
          }
        />
        <Field
          formikHandler={passwordFormik}
          id="newPassword"
          type="password"
          label={
            <FormattedMessage
              id="label.newPassword"
              defaultMessage="New password"
            />
          }
        />
        <Field
          formikHandler={passwordFormik}
          id="confirmNewPassword"
          type="password"
          label={
            <FormattedMessage
              id="label.confirmNewPassword"
              defaultMessage="Confirm new password"
            />
          }
        />
      </div>
      <Button type="submit" className="mt-2">
        <FormattedMessage
          id="label.updatePassword"
          defaultMessage="Update password"
        />
      </Button>
    </Form>
  );
};

export default UpdatePasswordForm;
