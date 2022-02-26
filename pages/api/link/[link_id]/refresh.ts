import prisma from "lib/db";
import { use_auth } from "lib/middleware";
import { badRequest, methodNotAllowed, ok } from "lib/response";
import { NextApiResponse } from "next";
import { NextApiRequestExtended } from "types";

const handler = async (req: NextApiRequestExtended, res: NextApiResponse) => {
  if (req.method === "POST") {
    await use_auth(req, res);
    const { link_id } = req.query;
    try {
      const link = await prisma.link.findUnique({
        where: {
          link_id: +link_id,
        },
      });
      await prisma.click.deleteMany({
        where: {
          link_id: +link_id,
        },
      });
      return ok(res, link);
    } catch (e: any) {
      return badRequest(res, "Something went wrong");
    }
  } else {
    return methodNotAllowed(res);
  }
};

export default handler;
