import axios from "axios";
import { Field, Form, Modal } from "components/ui";
import { useFormik } from "formik";
import { toast } from "lib/toast";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { InvokeApiSchema } from "schemas";
import { mutate } from "swr";

const AddUserForm = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [showApiOpen, setShowApiOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: InvokeApiSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.post("/api/api/invoke", {
          name: values.name,
        });
        mutate("/api/api");
        setIsOpen(false);
        setShowApiOpen(true);
        setApiKey(res.data.key);
        formik.setValues({
          name: "",
        });
        toast({ message: "Api created successfully" });
      } catch (e: any) {
        toast({ message: e.response.data, type: "warning" });
      }
      setLoading(false);
    },
  });
  const copyApi = () => {
    navigator.clipboard.writeText(apiKey);
    toast({ message: "Api key copied successfully" });
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={formik.handleSubmit}
        confirmText="Invoke API"
        title="Invoke API"
        loading={loading}
      >
        <Form formik={formik}>
          <Field label="Name" id="name" formikHandler={formik} />
        </Form>
      </Modal>
      <Modal
        title={
          <FormattedMessage
            id="label.copyApiKey"
            defaultMessage="Copy API key"
          />
        }
        isOpen={showApiOpen}
        setIsOpen={setShowApiOpen}
        description={
          <FormattedMessage
            id="message.apiKeyAreShownOnce"
            defaultMessage="API keys are shown only once"
          />
        }
        confirmText={
          <FormattedMessage
            id="label.copyApiKey"
            defaultMessage="Copy API key"
          />
        }
        cancelText={<FormattedMessage id="label.done" defaultMessage="Done" />}
        onConfirm={copyApi}
      >
        <div>
          <p>
            <strong>
              <FormattedMessage id="label.apiKey" defaultMessage="API Key" />:{" "}
            </strong>{" "}
            {apiKey}
          </p>
          <p className="text-yellow-500">
            <FormattedMessage
              id="message.storeApiKey"
              defaultMessage="Store the api key in a safe place, you can't view the api key
            later"
            />
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default AddUserForm;
