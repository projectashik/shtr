import { link } from "@prisma/client";
import axios from "axios";
import { Button, Field, Modal } from "components/ui";
import { useFormik } from "formik";
import { toast } from "lib/toast";
import { UpdateLinkSchema } from "schemas";
import { mutate } from "swr";

const EditUrlForm = ({
  link,
  editLinkOpen,
  setEditLinkOpen,
}: {
  link: link;
  editLinkOpen: boolean;
  setEditLinkOpen: (value: boolean) => void;
}) => {
  const formik = useFormik({
    initialValues: {
      url: link.url,
      slug: link.slug,
    },
    validationSchema: UpdateLinkSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.put(`/api/link/${link.link_id}`, {
          url: values.url,
          slug: values.slug,
        });
        if (res.data) {
          toast({ message: "Link updated" });
          setEditLinkOpen(false);
          mutate("fetch-links");
        }
      } catch (e: any) {
        const error = e.response.data;
        if (error === "Slug already exist") {
          formik.setFieldError("slug", "Slug already exist");
        }
      }
    },
  });
  return (
    <Modal
      title="Edit your link"
      description="Update the url and alias aka slug"
      isOpen={editLinkOpen}
      setIsOpen={setEditLinkOpen}
    >
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Field label="URL" formikHandler={formik} id="url" />
        <div>
          <Field label="Slug/Alias" formikHandler={formik} id="slug" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Short url is: {`${window.origin}/${formik.values.slug}`}
          </span>
        </div>
        <div className="mt-4 flex space-x-2">
          <Button type="submit">Update</Button>
          <Button look="alternate" onClick={() => setEditLinkOpen(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditUrlForm;
