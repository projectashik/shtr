import axios from "axios";
import { EditUrlForm, UrlPasswordForm } from "components/forms";
import { Modal, TButton } from "components/ui";
import { useUser } from "hooks";
import { toast } from "lib/toast";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiEdit, FiRotateCw } from "react-icons/fi";
import {
  HiOutlineClipboardCopy,
  HiOutlineKey,
  HiOutlineTrash,
  HiQrcode,
} from "react-icons/hi";
import { FormattedMessage } from "react-intl";
import { useSWRConfig } from "swr";
import { LinkWithUser } from "types";
import QrCode from "./QrCode";

const UrlCardSingle = ({ link }: { link: LinkWithUser }) => {
  const { mutate } = useSWRConfig();
  const { user } = useUser();
  const router = useRouter();
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
        mutate(`/api/link/${link.link_id}/fetch`);
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

  const onRefresh = async () => {
    setDeleteLoading(true);
    try {
      const res = await axios.post(`/api/link/${link.link_id}/refresh`);
      if (res.data) {
        toast({
          message: (
            <FormattedMessage
              id="label.linkRefreshed"
              defaultMessage="Link Refreshed"
            />
          ),
        });
        setRefreshLinkModalOpen(false);
        mutate(`/api/link/${link.link_id}/fetch`);
      }
    } catch (e: any) {
      toast({
        message: (
          <FormattedMessage
            id="label.errorRefreshingLink"
            defaultMessage="Error refreshing link."
          />
        ),
      });
    }
    setDeleteLoading(false);
  };

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [showQrModalOpen, setShowQrModalOpen] = useState(false);
  const [editLinkOpen, setEditLinkOpen] = useState(false);
  const [refreshLinkModalOpen, setRefreshLinkModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  return (
    <>
      <div
        key={link.link_id}
        className="dark:border-dark102 dark:bg-dark102 my-3 flex flex-col rounded border bg-white p-2 shadow dark:shadow-gray-800 md:p-6"
      >
        <div className="flex w-full justify-between space-x-5">
          <div>
            <p>
              <a
                href={`/${link.slug}`}
                target="_blank"
                className="font-semibold text-gray-900 dark:text-white"
                rel="noopener noreferrer"
              >
                {`${origin}/${link.slug}`}
              </a>
            </p>
            <a
              href={`/${link.slug}`}
              target="_blank"
              className="text-gray-500 dark:text-gray-500"
              rel="noopener noreferrer"
            >
              {link.url}
            </a>
          </div>
        </div>
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
          <TButton
            tooltip="Refresh Link"
            onClick={() => setRefreshLinkModalOpen(true)}
            look="danger"
          >
            <FiRotateCw />
          </TButton>
        </div>
        <UrlPasswordForm
          isOpen={showPasswordModal}
          setIsOpen={setShowPasswordModal}
          link={link}
        />

        <Modal
          title="Delete Short URL"
          onConfirm={onDelete}
          isOpen={isDeleteConfirmOpen}
          confirmLook="danger"
          loading={deleteLoading}
          setIsOpen={setIsDeleteConfirmOpen}
          description="Are you sure you want to delete this link?"
        ></Modal>

        <Modal
          title={
            <FormattedMessage
              id="label.refreshLink"
              defaultMessage="Refresh Link"
            />
          }
          loading={deleteLoading}
          onConfirm={onRefresh}
          isOpen={refreshLinkModalOpen}
          confirmLook="danger"
          setIsOpen={setRefreshLinkModalOpen}
          description={
            <FormattedMessage
              id="model.title.refreshLink"
              defaultMessage="Are you sure you want to refresh this link"
            />
          }
        >
          <div>
            <FormattedMessage
              id="label.thisWillRemoveAllTheClicksOfTheLink"
              defaultMessage="This will remove all the clicks of the link"
            />
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

export default UrlCardSingle;
