import axios from "axios";
import { EditUrlForm, UrlPasswordForm } from "components/forms";
import { Modal, TButton } from "components/ui";
import { useUser } from "hooks";
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
import { LinkWithUser } from "types";
import QrCode from "./QrCode";

const UrlCard = ({ link }: { link: LinkWithUser }) => {
  const { mutate } = useSWRConfig();
  const { user } = useUser();
  const onDelete = async () => {
    setDeleteLoading(true);
    try {
      const res = await axios.delete("/api/link/delete", {
        data: {
          slug: link.slug,
        },
      });
      if (res.data) {
        toast({ message: "Deleted Link" });
        setIsDeleteConfirmOpen(false);
        mutate("/api/links");
      }
    } catch (e: any) {
      toast({ message: "Error deleting link" });
    }
    setDeleteLoading(false);
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
  const [deleteLoading, setDeleteLoading] = useState(false);
  return (
    <>
      <div
        key={link.link_id}
        className="dark:border-dark102 dark:bg-dark102 my-3 flex flex-col rounded border bg-white p-2 shadow dark:shadow-gray-800 md:p-6"
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
        {user && user.is_admin && (
          <span className="text-gray-600">Created by {link.user.username}</span>
        )}
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
        <UrlPasswordForm
          isOpen={showPasswordModal}
          setIsOpen={setShowPasswordModal}
          link={link}
        />

        <Modal
          title="Delete Short URL"
          confirmText="Confirm"
          onConfirm={onDelete}
          isOpen={isDeleteConfirmOpen}
          confirmLook="danger"
          setIsOpen={setIsDeleteConfirmOpen}
          description="Are you sure you want to delete this link?"
        ></Modal>

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
