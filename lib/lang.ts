import { enUS, hi, ta } from "date-fns/locale";

export const languages: {
  [key: string]: { label: string; dateLocale?: any; dir?: "rtl" | "ltr" };
} = {
  "en-US": { label: "English", dateLocale: enUS },
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
