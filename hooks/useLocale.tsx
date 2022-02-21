import axios from "axios";
import { useAtom } from "jotai";
import { getDateLocale, getTextDirection } from "lib/lang";
import { useRouter } from "next/router";
import enUS from "public/messages/en-US.json";
import { useCallback, useEffect } from "react";
import { localeAtom } from "states/atoms";

const messages: { [key: string]: any } = {
  "en-US": enUS,
};

export default function useLocale() {
  const [locale, setLocale] = useAtom(localeAtom);
  const { basePath } = useRouter();
  const dir = getTextDirection(locale);
  const dateLocale = getDateLocale(locale);

  async function loadMessages(locale: string) {
    try {
      const res = await axios.get(`/messages/${locale}.json`);
      messages[locale] = res.data;
    } catch (e) {
      return false;
    }
  }
  // value is the parameter for locale,
  const saveLocale = useCallback(
    async (value: string) => {
      if (!messages[value]) {
        await loadMessages(value);
      }
      setLocale(value);
      if (locale !== value) {
        setLocale(value);
      }
    },
    [locale, setLocale]
  );

  useEffect(() => {
    if (!messages[locale]) {
      saveLocale(locale);
    }
  }, [locale, saveLocale]);

  return { locale, saveLocale, messages, dir, dateLocale };
}
