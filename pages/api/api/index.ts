import prisma from "lib/db";
import { use_auth } from "lib/middleware";
import { badRequest, ok } from "lib/response";
import { NextApiResponse } from "next";
import { NextApiRequestExtended } from "types";

const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  await use_auth(req, res);
  try {
    let apis;
    if (req.auth.is_admin) {
      apis = await prisma.api.findMany({
        orderBy: {
          created_at: "desc",
        },
        select: {
          key: true,
          name: true,
          user: true,
          api_id: true,
        },
      });
    } else {
      apis = await prisma.api.findMany({
        where: {
          user_id: req.auth.user_id,
        },
        orderBy: {
          created_at: "desc",
        },
        select: {
          key: true,
          name: true,
          user: true,
          api_id: true,
        },
      });
    }
    return ok(res, apis);
  } catch (e: any) {
    badRequest(res, "Something went wrong");
  }
};

export default handler;
