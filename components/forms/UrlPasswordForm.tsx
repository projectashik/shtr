import { link } from "@prisma/client";
import axios from "axios";
import { Field, Form, Modal } from "components/ui";
import { useFormik } from "formik";
import { toast } from "lib/toast";
import { useState } from "react";
import { SetPasswordSchema } from "schemas";
import { mutate } from "swr";

const UrlPasswordForm = ({
  setIsOpen,
  isOpen,
  link,
}: {
  link: link;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: SetPasswordSchema,
    onSubmit: async (values) => {
      setLoading(true);
      console.log(values);
      try {
        const res = await axios.post(
          `/api/link/${link.link_id as unknown as string}/password`,
          {
            password: values.password,
            confirmPassword: values.confirmPassword,
          }
        );
        mutate("/api/links");
        toast({ message: res.data.msg });
        setIsOpen(false);
      } catch (e: any) {
        console.log(e.response);
      }
      setLoading(false);
    },
  });
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Password Protect Your Short Link"
      description="User will need to enter password everytime they click the link"
      confirmText={link.password ? "Update Password" : "Set Password"}
      onConfirm={formik.handleSubmit}
      loading={loading}
    >
      <Form formik={formik} className="mt-4 space-y-3">
        <Field
          formikHandler={formik}
          label="Password"
          id="password"
          type="password"
        />
        <Field
          formikHandler={formik}
          label="Confirm Password"
          id="confirmPassword"
          type="password"
        />
      </Form>
    </Modal>
  );
};

export default UrlPasswordForm;
