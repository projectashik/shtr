import prisma from "lib/db";
import { use_auth } from "lib/middleware";
import { badRequest, methodNotAllowed, ok } from "lib/response";
import { NextApiResponse } from "next";
import { NextApiRequestExtended } from "types";
const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  await use_auth(req, res);
  if (req.method === "DELETE") {
    const { user_id } = req.query;
    const { link_ids } = req.body;
    try {
      const removedLinks = await prisma.link.deleteMany({
        where: {
          link_id: {
            in: link_ids,
          },
        },
      });
      if (removedLinks.count === 0) {
        return badRequest(res, "No links found");
      } else {
        return ok(res, {
          msg: "Links removed",
        });
      }
    } catch (e: any) {
      console.log(e);
      return badRequest(res, "Something went wrong");
    }
  } else {
    return methodNotAllowed(res);
  }
};

export default handler;
