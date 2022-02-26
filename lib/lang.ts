import { enGB, enUS, hi, ta } from "date-fns/locale";

export const languages: {
  [key: string]: { label: string; dateLocale?: any; dir?: "rtl" | "ltr" };
} = {
  "en-US": { label: "English (US)", dateLocale: enUS },
  "en-GB": { label: "English (UK)", dateLocale: enGB },
  "hi-IN": { label: "हिन्दी", dateLocale: hi },
  "ne-NP": { label: "नेपाली", dateLocale: hi },
  "ta-IN": { label: "தமிழ்", dateLocale: ta },
};

export function getDateLocale(locale: string) {
  return languages[locale]?.dateLocale || enUS;
}

export function getTextDirection(locale: string) {
  return languages[locale]?.dir || "ltr";
}
