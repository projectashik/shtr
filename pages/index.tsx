import axios from "axios";
import { StatsCard, UrlCard } from "components/common";
import ShortenUrlForm from "components/forms/ShortenUrlForm";
import AppLayout from "components/layouts/AppLayout";
import { Button, Modal } from "components/ui";
import { FULL_COUNTRIES } from "lib/constants";
import { fetcher } from "lib/fetchers";
import { countTotalClicks, getTopCountry, getTopReferral } from "lib/helper";
import { toast } from "lib/toast";
import { BaseSyntheticEvent, useState } from "react";
import {
  HiOutlineCursorClick,
  HiOutlineExternalLink,
  HiOutlineLink,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { FormattedMessage } from "react-intl";
import useSWR, { mutate } from "swr";
import { withPageAuthRequired } from "utils";

const Home = () => {
  const { data: links, isValidating } = useSWR<any[]>("/api/links", fetcher);
  const [selectedLinks, setSelectedLinks] = useState<number[]>([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isDeleteManyConfirmOpen, setIsDeleteManyConfirmOpen] = useState(false);
  const addToSelected = (e: BaseSyntheticEvent, link_id: any) => {
    if (e.target.checked) {
      setSelectedLinks([...selectedLinks, link_id]);
    } else {
      setSelectedLinks(selectedLinks.filter((id) => id !== link_id));
    }
  };

  console.log(isValidating);

  const onDeleteSelected = async () => {
    setDeleteLoading(true);
    if (selectedLinks.length > 0) {
      try {
        await axios.delete("/api/links/delete-many", {
          data: {
            link_ids: selectedLinks,
          },
        });
        setSelectedLinks([]);
        setIsDeleteManyConfirmOpen(false);
        mutate("/api/links");
        toast({ message: "Deleted Links" });
      } catch (e: any) {
        console.log(e.response.data);
        toast({ message: "Error deleting links" });
      }
    } else {
      toast({ message: "Please select at least one link" });
    }
    setDeleteLoading(false);
  };

  return (
    <AppLayout>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatsCard
          title={
            <FormattedMessage
              id="label.totalClick"
              defaultMessage="Total Click"
            />
          }
          value={(countTotalClicks(links) || 0).toString()}
          icon={<HiOutlineCursorClick />}
        />
        <StatsCard
          title={
            <FormattedMessage
              id="label.topCountry"
              defaultMessage="Top Country"
            />
          }
          value={
            getTopCountry(links) ? FULL_COUNTRIES[getTopCountry(links)] : "N/A"
          }
          icon={<HiOutlineLocationMarker />}
        />
        <StatsCard
          title={
            <FormattedMessage
              id="label.topReferral"
              defaultMessage="Top Referral"
            />
          }
          value={getTopReferral(links) || "N/A"}
          icon={<HiOutlineExternalLink />}
        />
        <StatsCard
          title={
            <FormattedMessage
              id="label.yourLinks"
              defaultMessage="Your Links"
            />
          }
          value={(links?.length || 0).toString()}
          icon={<HiOutlineLink />}
        />
      </div>

      <ShortenUrlForm />
      {selectedLinks && selectedLinks.length > 0 && (
        <Button
          loading={deleteLoading}
          look="danger"
          onClick={() => setIsDeleteManyConfirmOpen(true)}
        >
          Delete Selected
        </Button>
      )}
      <Modal
        isOpen={isDeleteManyConfirmOpen}
        setIsOpen={setIsDeleteManyConfirmOpen}
        title="Are you sure?"
        description="This will delete all the selected links"
        confirmText="Delete Selected"
        confirmLook="danger"
        loading={deleteLoading}
        onConfirm={onDeleteSelected}
      />
      {links &&
        links.length > 0 &&
        links
          .reverse()
          .map((link) => (
            <UrlCard onChange={addToSelected} key={link.link_id} link={link} />
          ))}
    </AppLayout>
  );
};

export default withPageAuthRequired(Home);
