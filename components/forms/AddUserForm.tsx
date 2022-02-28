import axios from "axios";
import { Field, Form, Modal } from "components/ui";
import { useFormik } from "formik";
import { toast } from "lib/toast";
import { useState } from "react";
import { CreateUserSchema } from "schemas";
import { mutate } from "swr";

const AddUserForm = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: CreateUserSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axios.post("/api/users/create", {
          username: values.username,
          password: values.password,
        });
        mutate("/api/users");
        setIsOpen(false);
        formik.setValues({
          username: "",
          password: "",
        });
        toast({ message: "User created" });
      } catch (e: any) {
        formik.setFieldError("username", e.response.data);
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
        confirmText="Add User"
        title="Add User"
        loading={loading}
      >
        <Form formik={formik}>
          <Field label="Username" id="username" formikHandler={formik} />
          <Field
            type="password"
            label="Password"
            id="password"
            formikHandler={formik}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default AddUserForm;
