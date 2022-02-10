import { Input, Button } from "components/ui";
import { useShortner } from "hooks";
import { KeyedMutator } from "swr";
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
    mutate("fetch-links");
  };
  return (
    <form
      onSubmit={onSubmit}
      className="sm:my-10 my-6 shadow border p-4 md:p-6 rounded  dark:border-dark102 dark:shadow-gray-800 "
    >
      <h2 className="text-lg sm:text-xl font-semibold mb-2">
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
