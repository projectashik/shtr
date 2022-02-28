import axios from "axios";
import { EditUrlForm, UrlPasswordForm } from "components/forms";
import { Modal, TButton } from "components/ui";
import { useUser } from "hooks";
import { toast } from "lib/toast";
import Link from "next/link";
import { useRouter } from "next/router";
import { BaseSyntheticEvent, useState } from "react";
import { FiEdit, FiExternalLink } from "react-icons/fi";
import {
  HiChartBar,
  HiOutlineClipboardCopy,
  HiOutlineKey,
  HiOutlineTrash,
  HiQrcode,
} from "react-icons/hi";
import { FormattedMessage } from "react-intl";
import { useSWRConfig } from "swr";
import { LinkWithUser } from "types";
import QrCode from "./QrCode";

const UrlCard = ({
  link,
  onChange,
  mutator,
}: {
  link: LinkWithUser;
  onChange: (e: BaseSyntheticEvent, link_id: number) => void;
  mutator: any;
}) => {
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
        mutate("/api/links");
        mutator();
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
    toast({
      message: (
        <FormattedMessage
          id="label.copiedUrlToClipboard"
          defaultMessage="Copied Url to clipboard"
        />
      ),
    });
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
        <div className="flex w-full justify-between space-x-5">
          <div>
            <p>
              <Link href={`/link/${link.link_id}`}>
                <a className="font-semibold text-gray-900 dark:text-white">
                  {`${window.location.origin}/${link.slug}`}
                </a>
              </Link>
            </p>
            <Link href={`/link/${link.link_id}`}>
              <a className="block overflow-hidden text-gray-500 dark:text-gray-500">
                {link.url}
              </a>
            </Link>
          </div>
          <input
            type="checkbox"
            className="h-5 w-5"
            onChange={(e) => onChange(e, link.link_id)}
          />
        </div>
        {user && user.is_admin && (
          <span className="text-gray-600">
            <FormattedMessage
              id="label.createdBy"
              defaultMessage="Created By"
            />{" "}
            {link.user.username}
          </span>
        )}
        <div className="mt-2 flex space-x-2">
          <TButton
            look="primary"
            tooltip={
              <FormattedMessage
                id="label.copyShortUrl"
                defaultMessage="Copy short URL"
              />
            }
            onClick={onCopy}
          >
            <HiOutlineClipboardCopy />
          </TButton>
          <TButton
            tooltip={
              <FormattedMessage
                id="label.setPassword"
                defaultMessage="Set Password"
              />
            }
            onClick={() => setShowPasswordModal(true)}
            look="alternate"
          >
            <HiOutlineKey />
          </TButton>
          <TButton
            onClick={() => setShowQrModalOpen(true)}
            look="alternate"
            tooltip={
              <FormattedMessage
                id="label.generateQR"
                defaultMessage="Generate QR Code for the short url"
              />
            }
          >
            <HiQrcode />
          </TButton>
          <TButton
            onClick={() => setEditLinkOpen(true)}
            look="alternate"
            tooltip={
              <FormattedMessage id="label.editUrl" defaultMessage="Edit url" />
            }
          >
            <FiEdit />
          </TButton>
          <TButton
            onClick={() => router.push(`/link/${link.link_id}`)}
            tooltip={
              <FormattedMessage
                id="label.analytics"
                defaultMessage="Analytics"
              />
            }
          >
            <HiChartBar />
          </TButton>
          <a
            href={`${window.origin}/${link.slug}`}
            rel="noreferrer"
            target="_blank"
          >
            <TButton
              tooltip={
                <FormattedMessage
                  id="label.openLink"
                  defaultMessage="Open Link"
                />
              }
            >
              <FiExternalLink />
            </TButton>
          </a>
          <TButton
            tooltip={
              <FormattedMessage
                id="label.removeShortUrl"
                defaultMessage="Remove short url"
              />
            }
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
          mutator={mutator}
        />

        <Modal
          title="Delete Short URL"
          confirmText="Confirm"
          onConfirm={onDelete}
          loading={deleteLoading}
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
          mutator={mutator}
        />
      </div>
    </>
  );
};

export default UrlCard;
