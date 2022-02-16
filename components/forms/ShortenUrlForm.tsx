import { Button, Input } from "components/ui";
import { useShortner } from "hooks";
import { BaseSyntheticEvent, useState } from "react";
import { useSWRConfig } from "swr";
const ShortenUrlForm = () => {
  const [url, setUrl] = useState("");
  const { mutate } = useSWRConfig();
  const { shortner, createLoading, createError } = useShortner();
  const [error, setError] = useState("");
  const onSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setError("");
    if (!url) {
      setError("Please enter a valid URL");
      return;
    }
    await shortner(url);
    setUrl("");
    mutate("/api/links");
  };
  return (
    <form
      onSubmit={onSubmit}
      className="dark:bg-dark102 dark:border-dark102 my-6 rounded border bg-white p-4 shadow dark:shadow-gray-800  sm:my-10 md:p-6 "
    >
      <h2 className="mb-2 text-lg font-semibold sm:text-xl">
        Shorten long url
      </h2>
      <div className="flex items-center ">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste Long URL"
        />
        <Button loading={createLoading} type="submit" className="ml-2">
          Shorten
        </Button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {createError && <p className="text-sm text-red-500">{createError}</p>}
    </form>
  );
};

export default ShortenUrlForm;
