import { Button, ErrorMessage, Input } from "components/ui";
import { useFormik } from "formik";
import { useShortner } from "hooks";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { ShortenUrlSchema } from "schemas";
import { useSWRConfig } from "swr";
const ShortenUrlForm = () => {
  const [url, setUrl] = useState("");
  const { formatMessage } = useIntl();
  const { mutate } = useSWRConfig();
  const { shortner, createLoading, createError } = useShortner();

  const formik = useFormik({
    initialValues: {
      url: "",
    },
    validationSchema: ShortenUrlSchema,
    onSubmit: async (values) => {
      await shortner(values.url);
      mutate("/api/links");
    },
  });

  const pasteLongUrlPlaceholder = formatMessage({
    id: "label.pasteLongUrl",
    defaultMessage: "Paste long URL here",
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="dark:bg-dark102 dark:border-dark102 my-6 rounded border bg-white p-4 shadow dark:shadow-gray-800  sm:my-10 md:p-6 "
    >
      <div className="mb-2 flex items-center justify-between">
        <h2 className=" text-lg font-semibold sm:text-xl">
          <FormattedMessage
            id="label.shortenLongUrl"
            defaultMessage="Shorten long URL"
          />
        </h2>
        <Button style={{ padding: "5px 10px" }} look="alternate">
          Bulk Create
        </Button>
      </div>
      <div className="flex items-center ">
        <Input
          value={url}
          placeholder={pasteLongUrlPlaceholder}
          formikHandler={formik}
          id="url"
        />
        <Button loading={createLoading} type="submit" className="ml-2">
          <FormattedMessage
            id="label.shortenUrl"
            defaultMessage="Shorten URL"
          />
        </Button>
      </div>
      <ErrorMessage formikHandler={formik} name="url"></ErrorMessage>
    </form>
  );
};

export default ShortenUrlForm;
