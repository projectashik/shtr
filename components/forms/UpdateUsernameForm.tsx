import axios from "axios";
import { Button, Field, Form } from "components/ui";
import { useFormik } from "formik";
import { useUser } from "hooks";
import { toast } from "lib/toast";
import { FormattedMessage } from "react-intl";
import { UsernameUpdateSchema } from "schemas";

const UpdateUsernameForm = () => {
  const { user, logout } = useUser();
  const formik = useFormik({
    initialValues: {
      username: user?.username,
    },
    validationSchema: UsernameUpdateSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(`/api/user/${user?.user_id}/update`, {
          type: "username",
          username: values.username,
        });
        toast({
          message: (
            <FormattedMessage
              id="label.usernameUpdated"
              defaultMessage="Username updated."
            />
          ),
        });
        logout();
      } catch (e: any) {
        formik.setFieldError("username", e.response.data);
      }
    },
  });
  return (
    <Form
      formik={formik}
      className="dark:border-dark101 mt-4 max-w-lg rounded border p-4"
    >
      <h2 className="dark:border-dark101 mb-3 border-b  pb-3 text-lg font-medium">
        <FormattedMessage
          id="label.updateUsername"
          defaultMessage="Update username"
        />
      </h2>
      <Field formikHandler={formik} id="username" label="Username" />
      <Button type="submit" className="mt-2">
        <FormattedMessage
          id="label.updateUsername"
          defaultMessage="Update username"
        />
      </Button>
    </Form>
  );
};

export default UpdateUsernameForm;
