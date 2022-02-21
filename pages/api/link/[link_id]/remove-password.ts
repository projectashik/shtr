import prisma from "lib/db";
import { use_auth } from "lib/middleware";
import { badRequest, methodNotAllowed, ok } from "lib/response";
import { NextApiResponse } from "next";
import { NextApiRequestExtended } from "types";

const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  await use_auth(req, res);
  if (req.method === "POST") {
    const { user_id } = req.auth;
    const { link_id } = req.query;
    try {
      const link = await prisma.link.findFirst({
        where: {
          link_id: +link_id,
          user_id: +user_id,
        },
      });
      if (!link) {
        return badRequest(res, "Link not found");
      }
      try {
        await prisma.link.update({
          where: { link_id: +link_id },
          data: { password: "" },
        });
        return ok(res, {
          msg: "Password removed",
        });
      } catch (e) {
        console.log(e);
        badRequest(res, "Something went wrong");
      }
    } catch (e) {
      console.log(e);
      badRequest(res, "Link not found");
    }
  } else {
    return methodNotAllowed(res);
  }
};

export default handler;
