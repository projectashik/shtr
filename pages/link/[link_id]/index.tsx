import { StatsCard } from "components/common";
import DateRangeDropdown from "components/common/DateRangeDropdown";
import UrlCardSingle from "components/common/UrlCardSingle";
import AppLayout from "components/layouts/AppLayout";
import useCountryNames from "hooks/useCountryNames";
import useDateRange from "hooks/useDateRange";
import useLocale from "hooks/useLocale";
import { FULL_COUNTRIES } from "lib/constants";
import { fetcher } from "lib/fetchers";
import {
  getCountriesWithClicksByDateRange,
  getTopBrowserForLink,
  getTopCountryForLink,
  getTopReferralForLink
} from "lib/helper";
import { useRouter } from "next/router";
import { HiCursorClick, HiOutlineExternalLink } from "react-icons/hi";
import { useIntl } from "react-intl";
import useSWR from "swr";
import WithPageAuthRequired from "utils/WithPageAuthRequired";

const SingleLinkPage = () => {
  const router = useRouter();
  const intl = useIntl();
  const { locale } = useLocale();
  const countryNames = useCountryNames(locale);
  const { exportDateRange } = useDateRange();
  const { link_id } = router.query;
  const { data: link, error } = useSWR(`/api/link/${link_id}/fetch`, fetcher);
  if (!link) return <div>Loading...</div>;
  if (!link || error) return <div>Error</div>;

  const datas = getCountriesWithClicksByDateRange(
    link,
    exportDateRange && exportDateRange.startDate
  );
  console.log(datas);
  return (
    <AppLayout>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatsCard
          title={"Clicks"}
          value={link.clicks?.length}
          icon={<HiCursorClick />}
        />
        <StatsCard
          title={"Top Location"}
          value={
            getTopCountryForLink(link)
              ? FULL_COUNTRIES[getTopCountryForLink(link)]
              : "N/A"
          }
          icon={<HiCursorClick />}
        />
        <StatsCard
          title="Top Referral"
          value={getTopReferralForLink(link) || "N/A"}
          icon={<HiOutlineExternalLink />}
        />
        <StatsCard
          title="Top Browser"
          value={getTopBrowserForLink(link) || "N/A"}
          icon={<HiCursorClick />}
        />
      </div>
      <UrlCardSingle link={link} />
      <DateRangeDropdown />
      {datas.map((data, index) => (
        <div key={index}>
          {countryNames[data.country]} - {data.clicks}
        </div>
      ))}
    </AppLayout>
  );
};

export default WithPageAuthRequired(SingleLinkPage);
