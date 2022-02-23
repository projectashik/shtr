import axios from "axios";
import enUS from "public/country/en-US.json";
import { useCallback, useEffect, useState } from "react";

const countryNames: { [key: string]: any } = {
  "en-US": enUS,
};

export default function useCountryNames(locale: string) {
  const [list, setList] = useState(countryNames[locale] || enUS);

  const loadData = useCallback(async (locale) => {
    const res = await axios.get(`/country/${locale}.json`);

    if (res.data) {
      countryNames[locale] = res.data;
      setList(countryNames[locale]);
    } else {
      setList(enUS);
    }
  }, []);

  useEffect(() => {
    if (!countryNames[locale]) {
      loadData(locale);
    } else {
      setList(countryNames[locale]);
    }
  }, [locale, loadData]);

  return list;
}
