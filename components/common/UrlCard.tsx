import { link } from "@prisma/client";
import { TButton, Modal } from "components/ui";
import {
  HiClipboardCopy,
  HiOutlineClipboardCopy,
  HiOutlineKey,
  HiOutlineTrash,
} from "react-icons/hi";
import axios from "axios";
import { toast } from "lib/toast";
import { useSWRConfig } from "swr";
import { useState } from "react";
import { UrlPasswordForm } from "components/forms";

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
        toast({ message: "Deleted Link" });
        mutate("fetch-links");
      }
    } catch (e: any) {
      toast({ message: "Error deleting link" });
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${link.slug}`);
    toast({ message: "Copied to clipboard" });
  };

  const [showPasswordModal, setShowPasswordModal] = useState(false);
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
          <TButton tooltip="Remove short url" onClick={onDelete} look="danger">
            <HiOutlineTrash />
          </TButton>
          <TButton tooltip="Copy short url" onClick={onCopy} look="alternate">
            <HiOutlineClipboardCopy />
          </TButton>
          <TButton
            tooltip="Set password"
            onClick={() => setShowPasswordModal(true)}
            look="alternate"
          >
            <HiOutlineKey />
          </TButton>
        </div>
        <Modal
          isOpen={showPasswordModal}
          setIsOpen={setShowPasswordModal}
          title="Password Protect Your Short Link"
          description="User will need to enter password everytime they click the link"
        >
          <UrlPasswordForm setIsOpen={setShowPasswordModal} link={link} />
        </Modal>
      </div>
    </>
  );
};

export default UrlCard;
