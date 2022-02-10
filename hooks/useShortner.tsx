import axios from "axios";
import { makeSlug } from "lib/helper";
import { toast } from "lib/toast";
import { useState } from "react";

const useShortner = () => {
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");

  async function shortner(url: string) {
    setCreateLoading(true);
    setCreateError("");
    const slug = makeSlug(8);
    try {
      const res = await axios.post("/api/links", {
        url,
        slug,
      });
      if (res.data) {
        navigator.clipboard.writeText(`${window.location.origin}/${slug}`);
        toast({ message: "Short URL Copied to your clipboard" });
      }
    } catch (e: any) {
      console.log(e.response);
      setCreateError(e.response.data);
      toast({ message: "Error shortening url" });
    }
    setCreateLoading(false);
  }

  return { shortner, createLoading, createError };
};

export default useShortner;
