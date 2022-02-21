import { user } from "@prisma/client";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const userAtom = atom<null | user>(null);
export const localeAtom = atomWithStorage("locale", "en-US");
