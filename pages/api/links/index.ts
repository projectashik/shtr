import prisma from "lib/db";
import { use_auth } from "lib/middleware";
import { badRequest, ok } from "lib/response";
import { NextApiResponse } from "next";
import { NextApiRequestExtended } from "types";

const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  await use_auth(req, res);
  try {
    let links;
    if (req.auth.is_admin) {
      links = await prisma.link.findMany({
        orderBy: {
          created_at: "desc",
        },
        include: {
          user: {
            select: {
              user_id: true,
              username: true,
            },
          },
          clicks: {
            select: {
              click_id: true,
              browser: true,
              country: true,
              device: true,
              ip: true,
              referral: true,
              os: true,
            },
          },
        },
      });
    } else {
      links = await prisma.link.findMany({
        include: {
          user: {
            select: {
              user_id: true,
              username: true,
            },
          },
          clicks: {
            select: {
              click_id: true,
              browser: true,
              country: true,
              device: true,
              ip: true,
              referral: true,
              os: true,
            },
          },
        },
        where: {
          user_id: req.auth.user_id,
        },
        orderBy: {
          created_at: "desc",
        },
      });
    }
    return ok(res, links);
  } catch (e: any) {
    badRequest(res, "Something went wrong");
  }
};

export default handler;
