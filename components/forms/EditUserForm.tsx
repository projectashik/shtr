import axios from "axios";
import { Field, Form, Modal } from "components/ui";
import { useFormik } from "formik";
import { toast } from "lib/toast";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { CreateUserSchema } from "schemas";
import { mutate } from "swr";

const EditUserForm = ({
  isOpen,
  setIsOpen,
  user,
}: {
  isOpen: boolean;
  user: any;
  setIsOpen: (value: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: user.username,
      password: "",
    },
    validationSchema: CreateUserSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axios.post(`/api/user/${user.user_id}/edit`, {
          username: values.username,
          password: values.password,
        });
        mutate("/api/users");
        setIsOpen(false);
        formik.setValues({
          username: "",
          password: "",
        });
        toast({ message: "User updated" });
      } catch (e: any) {
        toast({ message: e.response.data, type: "warning" });
      }
      setLoading(false);
    },
  });
  return (
    <div>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={formik.handleSubmit}
        confirmText={
          <FormattedMessage id="label.editUser" defaultMessage="Edit User" />
        }
        title={
          <FormattedMessage id="label.editUser" defaultMessage="Edit User" />
        }
        loading={loading}
      >
        <Form formik={formik}>
          <Field label="Username" id="username" formikHandler={formik} />
          <Field
            label="Password"
            type="password"
            id="password"
            formikHandler={formik}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default EditUserForm;
