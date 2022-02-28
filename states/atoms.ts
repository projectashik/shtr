import { account } from "@prisma/client";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { DEFAULT_DATE_RANGE } from "lib/constants";

export const userAtom = atom<null | account>(null);
export const localeAtom = atomWithStorage("locale", "en-US");
export const dateRangeAtom = atomWithStorage("dateRange", DEFAULT_DATE_RANGE);
