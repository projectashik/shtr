import { useAtom } from "jotai";
import { DEFAULT_DATE_RANGE } from "lib/constants";
import { getDateRange } from "lib/date";
import { dateRangeAtom } from "states/atoms";
import useLocale from "./useLocale";

export default function useDateRange(defaultDateRange = DEFAULT_DATE_RANGE) {
  const { locale } = useLocale();
  const [dateRangeFromState, setDateRangeToState] = useAtom(dateRangeAtom);
  const dateRange = getDateRange(dateRangeFromState);
  let globalDateRange;
  //   const dateRange = defaultDateRange;
  if (dateRangeFromState) {
    if (typeof dateRangeFromState === "string") {
      globalDateRange = getDateRange(dateRangeFromState);
    } else if (typeof dateRangeFromState === "object") {
      globalDateRange = {
        ...dateRange,
        startDate: dateRange?.startDate,
        endDate: dateRange?.endDate,
      };
    }
  }

  function saveDateRange(values: any) {
    const { value } = values;

    setDateRangeToState(value === "custom" ? values : value);
  }

  const exportDateRange =
    globalDateRange || getDateRange(dateRangeFromState, locale);
  return {
    dateRange: exportDateRange,
    saveDateRange,
  };
}
