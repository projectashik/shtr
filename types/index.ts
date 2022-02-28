import { account, api, link, Prisma } from "@prisma/client";
import { NextApiRequest } from "next";

export interface NextApiRequestExtended extends NextApiRequest {
  auth:
    | any
    | {
        user_id: number;
        username: string;
        is_admin: boolean;
        iat: number;
      }
    | null;
}

export interface LinkWithUser extends link {
  user: account;
}
export interface ApiWithUser extends api {
  user: account;
}

export const linkWithClicks = Prisma.validator<Prisma.linkArgs>()({
  include: { clicks: true },
});

export type linkWithClicks = Prisma.linkGetPayload<typeof linkWithClicks>;
