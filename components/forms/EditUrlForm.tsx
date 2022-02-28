import { link } from "@prisma/client";
import axios from "axios";
import { Field, Form, Modal } from "components/ui";
import { useFormik } from "formik";
import { toast } from "lib/toast";
import { useState } from "react";
import { UpdateLinkSchema } from "schemas";
import { mutate } from "swr";

const EditUrlForm = ({
  link,
  editLinkOpen,
  setEditLinkOpen,
  mutator,
}: {
  link: link;
  editLinkOpen: boolean;
  setEditLinkOpen: (value: boolean) => void;
  mutator: any;
}) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      url: link.url,
      slug: link.slug,
    },
    validationSchema: UpdateLinkSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.put(`/api/link/${link.link_id}`, {
          url: values.url,
          slug: values.slug,
        });
        if (res.data) {
          mutate("/api/links");
          mutate(`/api/link/${link.link_id}/fetch`);
          mutator();
          toast({ message: "Link updated" });
          setEditLinkOpen(false);
        }
      } catch (e: any) {
        const error = e.response.data;
        if (error === "Slug already exist") {
          formik.setFieldError("slug", "Slug already exist");
        }
      }
      setLoading(false);
    },
  });
  return (
    <Modal
      title="Edit your link"
      description="Update the url and alias aka slug"
      isOpen={editLinkOpen}
      setIsOpen={setEditLinkOpen}
      confirmText="Update Link"
      onConfirm={formik.handleSubmit}
      loading={loading}
    >
      <Form formik={formik} className="space-y-4">
        <Field label="URL" formikHandler={formik} id="url" />
        <div>
          <Field label="Slug/Alias" formikHandler={formik} id="slug" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Short url is: {`${window.origin}/${formik.values.slug}`}
          </span>
        </div>
      </Form>
    </Modal>
  );
};

export default EditUrlForm;
