import { link } from "@prisma/client";
import axios from "axios";
import { Button, Field, Form, Modal } from "components/ui";
import { useFormik } from "formik";
import { toast } from "lib/toast";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { SetPasswordSchema } from "schemas";
import { mutate } from "swr";

const UrlPasswordForm = ({
  setIsOpen,
  isOpen,
  link,
  mutator,
}: {
  link: link;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  mutator?: any;
}) => {
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: SetPasswordSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.post(
          `/api/link/${link.link_id as unknown as string}/password`,
          {
            password: values.password,
            confirmPassword: values.confirmPassword,
          }
        );
        mutate("/api/links");
        mutate(`/api/link/${link.link_id}/fetch`);
        mutator && mutator();
        toast({ message: res.data.msg });
        setIsOpen(false);
      } catch (e: any) {}
      setLoading(false);
    },
  });

  const onRemovePassword = async () => {
    setRemoveLoading(true);
    try {
      const res = await axios.post(
        `/api/link/${link.link_id}/remove-password`,
        {
          link_id: link.link_id,
        }
      );
      mutate("/api/links");
      mutate(`/api/link/${link.link_id}/fetch`);

      toast({ message: res.data.msg });
    } catch (e: any) {}
    setIsOpen(false);
    setRemoveLoading(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={
        <FormattedMessage
          id="modal.title.setPassword"
          defaultMessage="Password protect your short link"
        />
      }
      description={
        <FormattedMessage
          id="modal.description.setPassword"
          defaultMessage="User will need to enter password everytime they click the link"
        />
      }
      confirmText={
        link.password ? (
          <FormattedMessage
            id="label.updatePassword"
            defaultMessage="Update password"
          />
        ) : (
          <FormattedMessage
            id="label.setPassword"
            defaultMessage="Set Password"
          />
        )
      }
      onConfirm={formik.handleSubmit}
      loading={loading}
    >
      <div className="mt-4">
        {link.password && (
          <Button
            className="mb-4"
            onClick={onRemovePassword}
            loading={removeLoading}
            look="danger"
          >
            <FormattedMessage
              id="label.removePassword"
              defaultMessage="Remove Password"
            />
          </Button>
        )}
        <Form formik={formik} className="space-y-3">
          <Field
            formikHandler={formik}
            label={
              <FormattedMessage id="label.password" defaultMessage="Password" />
            }
            id="password"
            type="password"
          />
          <Field
            formikHandler={formik}
            label={
              <FormattedMessage
                id="label.confirmPassword"
                defaultMessage="Confirm Password"
              />
            }
            id="confirmPassword"
            type="password"
          />
        </Form>
      </div>
    </Modal>
  );
};

export default UrlPasswordForm;
