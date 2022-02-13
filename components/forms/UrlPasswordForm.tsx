import { link } from "@prisma/client";
import axios from "axios";
import { Button, Field } from "components/ui";
import { useFormik } from "formik";
import { useState } from "react";
import { SetPasswordSchema } from "schemas";
import useSWR from "swr";

const UrlPasswordForm = ({
  setIsOpen,
  link,
}: {
  link: link;
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
        const res = axios.post(
          `/api/link/${link.link_id as unknown as string}/password`,
          {
            password: values.password,
            confirmPassword: values.confirmPassword,
          }
        );
      } catch (e: any) {
        console.log(e.response);
      }
      setLoading(false);
    },
  });
  const {} = useSWR("/");
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-3 mt-4">
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
      <div className="flex gap-4">
        <Button look="danger" type="submit">
          {link.password ? "Update" : "Set"} Password
        </Button>
        <Button
          look="alternate"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default UrlPasswordForm;
