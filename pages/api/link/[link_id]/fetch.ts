import prisma from "lib/db";
import { badRequest, methodNotAllowed, ok } from "lib/response";
import { NextApiResponse } from "next";
import { NextApiRequestExtended } from "types";

const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { link_id } = req.query;
    console.log(link_id);
    try {
      const link = await prisma.link.findFirst({
        include: {
          user: true,
          clicks: true,
        },
        where: {
          link_id: +link_id,
        },
      });
      if (link) {
        console.log(link);
        return ok(res, link);
      } else {
        return badRequest(res, "Link not found");
      }
    } catch (e) {
      console.log(e);
      return badRequest(res, "Link not found");
    }
  } else {
    return methodNotAllowed(res);
  }
};

export default handler;
