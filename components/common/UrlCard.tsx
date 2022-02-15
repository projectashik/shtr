import { link } from "@prisma/client";
import axios from "axios";
import { EditUrlForm, UrlPasswordForm } from "components/forms";
import { Button, Modal, TButton } from "components/ui";
import { toast } from "lib/toast";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import {
  HiOutlineClipboardCopy,
  HiOutlineKey,
  HiOutlineTrash,
  HiQrcode,
} from "react-icons/hi";
import { useSWRConfig } from "swr";
import QrCode from "./QrCode";

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

  const openDelete = () => {
    setIsDeleteConfirmOpen(true);
  };

  const onCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${link.slug}`);
    toast({ message: "Copied to clipboard" });
  };

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [showQrModalOpen, setShowQrModalOpen] = useState(false);
  const [editLinkOpen, setEditLinkOpen] = useState(false);
  return (
    <>
      <div
        key={link.link_id}
        className="dark:border-dark102 my-3 flex flex-col rounded border p-2 shadow dark:shadow-gray-800 md:p-6"
      >
        <p>
          <a
            href={`${window.location.origin}/${link.slug}`}
            target="_blank"
            className="font-semibold text-gray-900 dark:text-white"
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
          <TButton look="primary" tooltip="Copy short url" onClick={onCopy}>
            <HiOutlineClipboardCopy />
          </TButton>
          <TButton
            tooltip="Set password"
            onClick={() => setShowPasswordModal(true)}
            look="alternate"
          >
            <HiOutlineKey />
          </TButton>
          <TButton
            onClick={() => setShowQrModalOpen(true)}
            look="alternate"
            tooltip="Generate QR Code for the short url"
          >
            <HiQrcode />
          </TButton>
          <TButton
            onClick={() => setEditLinkOpen(true)}
            look="alternate"
            tooltip="Edit url"
          >
            <FiEdit />
          </TButton>
          <TButton
            tooltip="Remove short url"
            onClick={openDelete}
            look="danger"
          >
            <HiOutlineTrash />
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

        <Modal
          title="Delete Short URL"
          isOpen={isDeleteConfirmOpen}
          setIsOpen={setIsDeleteConfirmOpen}
          description="Are you sure you want to delete this link?"
        >
          <div className="mt-4 flex space-x-2">
            <Button
              onClick={() => setIsDeleteConfirmOpen(false)}
              look="alternate"
            >
              Cancel
            </Button>
            <Button onClick={onDelete} look="danger">
              Confirm
            </Button>
          </div>
        </Modal>

        <Modal
          title="Share your qr code for the link"
          isOpen={showQrModalOpen}
          setIsOpen={setShowQrModalOpen}
        >
          <>{showQrModalOpen && <QrCode url={link.slug} />}</>
        </Modal>

        <EditUrlForm
          editLinkOpen={editLinkOpen}
          setEditLinkOpen={setEditLinkOpen}
          link={link}
        />
      </div>
    </>
  );
};

export default UrlCard;
