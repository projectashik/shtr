import { link, Prisma, user } from "@prisma/client";
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
  user: user;
}

export const linkWithClicks = Prisma.validator<Prisma.linkArgs>()({
  include: { clicks: true },
});

export type linkWithClicks = Prisma.linkGetPayload<typeof linkWithClicks>;
