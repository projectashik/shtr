import { user } from "@prisma/client";
import { atom } from "jotai";

export const userAtom = atom<null | user>(null);
