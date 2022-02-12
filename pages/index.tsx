import { link } from "@prisma/client";
import { StatsCard, UrlCard } from "components/common";
import ShortenUrlForm from "components/forms/ShortenUrlForm";
import AppLayout from "components/layouts/AppLayout";
import { FULL_COUNTRIES } from "lib/constants";
import { linksFetcher } from "lib/fetchers";
import { countTotalClicks, getTopCountry, getTopReferral } from "lib/helper";
import type { NextPage } from "next";
import {
  HiOutlineCursorClick,
  HiOutlineExternalLink,
  HiOutlineLink,
  HiOutlineLocationMarker,
  HiOutlineTrash,
} from "react-icons/hi";
import useSWR from "swr";
import { withPageAuthRequired } from "utils";

const Home: NextPage = () => {
  const { data: links } = useSWR<any[]>("fetch-links", linksFetcher);

  return (
    <AppLayout>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard
          title="Total Click"
          value={(countTotalClicks(links) || 0).toString()}
          icon={<HiOutlineCursorClick />}
        />
        <StatsCard
          title="Top Country"
          value={
            getTopCountry(links) ? FULL_COUNTRIES[getTopCountry(links)] : "N/A"
          }
          icon={<HiOutlineLocationMarker />}
        />
        <StatsCard
          title="Top Referral"
          value={getTopReferral(links) || "N/A"}
          icon={<HiOutlineExternalLink />}
        />
        <StatsCard
          title="Your Links"
          value={(links?.length || 0).toString()}
          icon={<HiOutlineLink />}
        />
      </div>

      <ShortenUrlForm />

      {links &&
        links.length > 0 &&
        links
          .reverse()
          .map((link) => <UrlCard key={link.link_id} link={link} />)}
    </AppLayout>
  );
};

export default withPageAuthRequired(Home);
