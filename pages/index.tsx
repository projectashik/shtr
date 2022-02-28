import axios from "axios";
import { StatsCard, UrlCard } from "components/common";
import UrlCardSkeleton from "components/common/UrlCardSkeleton";
import ShortenUrlForm from "components/forms/ShortenUrlForm";
import AppLayout from "components/layouts/AppLayout";
import { Button, Input, Modal } from "components/ui";
import Fuse from "fuse.js";
import useCountryNames from "hooks/useCountryNames";
import useLocale from "hooks/useLocale";
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
import InfiniteScroll from "react-swr-infinite-scroll";
import useSWR, { mutate } from "swr";
import useSWRInfinite from "swr/infinite";
import { withPageAuthRequired } from "utils";

const Home = () => {
  const getKey = (pageIndex: any, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `/api/links?page=${pageIndex}`; // SWR key
  };
  const swr = useSWRInfinite(getKey, fetcher);
  const { data: links } = useSWR("/api/links", fetcher);
  console.log({ links });

  const [search, setSearch] = useState("");

  const searchFuse = new Fuse(links, {
    keys: ["url", "slug"],
  });

  const [searchedLinks, setSearchedLinks] = useState<any>();

  const onSearch = (e: BaseSyntheticEvent) => {
    setSearch(e.target.value);
    setSearchedLinks(searchFuse.search(e.target.value));
    console.log(searchFuse.search(e.target.value));
  };

  const [selectedLinks, setSelectedLinks] = useState<number[]>([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isDeleteManyConfirmOpen, setIsDeleteManyConfirmOpen] = useState(false);
  const { locale } = useLocale();
  const countryNames = useCountryNames(locale);
  const addToSelected = (e: BaseSyntheticEvent, link_id: any) => {
    if (e.target.checked) {
      setSelectedLinks([...selectedLinks, link_id]);
    } else {
      setSelectedLinks(selectedLinks.filter((id) => id !== link_id));
    }
  };

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
        swr.mutate();
        mutate("/api/links");
        toast({
          message: (
            <FormattedMessage
              id="label.linksDeleted"
              defaultMessage="Links Deleted"
            />
          ),
        });
      } catch (e: any) {
        console.log(e.response.data);
        toast({
          message: (
            <FormattedMessage
              id="error.deletingLink"
              defaultMessage="Error deleting links"
            />
          ),
        });
      }
    } else {
      toast({
        message: (
          <FormattedMessage
            id="error.selectAtLeastOneLink"
            defaultMessage="Please select at least one link"
          />
        ),
      });
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
            getTopCountry(links) ? countryNames[getTopCountry(links)] : "N/A"
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
          <FormattedMessage
            id="label.deleteSelected"
            defaultMessage="Delete Selected"
          />
        </Button>
      )}
      <Modal
        isOpen={isDeleteManyConfirmOpen}
        setIsOpen={setIsDeleteManyConfirmOpen}
        title={
          <FormattedMessage
            id="label.areYouSure"
            defaultMessage="Are you sure?"
          />
        }
        description={
          <FormattedMessage
            id="model.description.deleteSelected"
            defaultMessage="This will delete all selected links"
          />
        }
        confirmText={
          <FormattedMessage
            id="label.deleteSelected"
            defaultMessage="Delete Selected"
          />
        }
        confirmLook="danger"
        loading={deleteLoading}
        onConfirm={onDeleteSelected}
      />

      <form action="">
        <Input
          type="text"
          value={search}
          onChange={onSearch}
          placeholder="Search"
        />
      </form>
      {search &&
        searchedLinks &&
        searchedLinks.length > 0 &&
        searchedLinks.map((link: any) => (
          <UrlCard
            onChange={addToSelected}
            key={link.item.link_id}
            link={link.item}
          />
        ))}
      {!search && (
        <InfiniteScroll
          swr={swr}
          loadingIndicator={<UrlCardSkeleton />}
          endingIndicator="No more links! 🎉"
          isReachingEnd={(swr) =>
            swr.data?.[0]?.length === 0 ||
            swr.data?.[swr.data?.length - 1]?.length < 10
          }
        >
          {(response: any) =>
            response?.map((link: any) => (
              <UrlCard
                onChange={addToSelected}
                key={link.link_id}
                link={link}
              />
            ))
          }
        </InfiniteScroll>
      )}
    </AppLayout>
  );
};

export default withPageAuthRequired(Home);
