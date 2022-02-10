import { link } from "@prisma/client";
import { Button } from "components/ui";
import {
  HiClipboardCopy,
  HiOutlineClipboardCopy,
  HiOutlineTrash,
} from "react-icons/hi";
import axios from "axios";
import { toast } from "lib/toast";
import { useSWRConfig } from "swr";

const UrlCard = ({ link }: { link: link }) => {
  const { mutate } = useSWRConfig();
  const onDelete = async () => {
    try {
      const res = await axios.delete("/api/links", {
        data: {
          slug: link.slug,
        },
      });
      if (res.data) {
        console.log(res.data);
        toast({ message: "Deleted Link" });
        mutate("fetch-links");
      }
    } catch (e: any) {
      console.log(e.response);
      toast({ message: "Error deleting link" });
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${link.slug}`);
    toast({ message: "Copied to clipboard" });
  };
  return (
    <>
      <div
        key={link.link_id}
        className="my-3 shadow border dark:border-dark102 dark:shadow-gray-800 flex-col p-2 md:p-6 rounded flex"
      >
        <p>
          <a
            href={`${window.location.origin}/${link.slug}`}
            target="_blank"
            className="text-gray-900 font-semibold dark:text-white"
            rel="noopener noreferrer"
          >
            {`${window.location.origin}/${link.slug}`}
          </a>
        </p>
        <a
          href={`${window.location.origin}/${link.slug}`}
          target="_blank"
          className="text-gray-500 dark:text-gray-500"
          rel="noopener noreferrer"
        >
          {link.url}
        </a>
        <div className="mt-2 flex space-x-2">
          <Button onClick={onDelete} look="danger">
            <HiOutlineTrash />
          </Button>
          <Button onClick={onCopy} look="alternate">
            <HiOutlineClipboardCopy />
          </Button>
        </div>
      </div>
    </>
  );
};

export default UrlCard;
